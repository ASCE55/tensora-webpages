import http from 'http';
import app from './src/app.js';

const PORT = 5055;
const BASE_URL = `http://localhost:${PORT}/api`;

const request = (method, path, body = null, headers = {}) => {
  return new Promise((resolve, reject) => {
    const url = new URL(path.startsWith('http') ? path : `${BASE_URL}${path}`);
    const reqOptions = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    const req = http.request(reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const parsed = data ? JSON.parse(data) : {};
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
};

async function runTests() {
  const server = app.listen(PORT, async () => {
    console.log(`\n========================================`);
    console.log(`  🧪 RUNNING TDS BACKEND API TEST SUITE `);
    console.log(`========================================\n`);

    let passed = 0;
    let failed = 0;

    const assert = (condition, testName, extraInfo = '') => {
      if (condition) {
        console.log(`  ✅ PASS: ${testName}`);
        passed++;
      } else {
        console.error(`  ❌ FAIL: ${testName} ${extraInfo}`);
        failed++;
      }
    };

    try {
      // 1. Healthcheck
      const health = await request('GET', '/system/health');
      assert(health.status === 200 && health.data?.data?.status === 'UP', 'System Health Check Endpoint');

      // 2. Admin Login
      const adminLogin = await request('POST', '/auth/login', {
        username: 'TENSORA',
        password: 'admin123'
      });
      assert(adminLogin.status === 200 && adminLogin.data?.data?.token, 'Admin Authentication & JWT Generation');
      const adminToken = adminLogin.data?.data?.token;

      // 3. Employee Login
      const empLogin = await request('POST', '/auth/login', {
        username: 'TDS001',
        password: 'user123'
      });
      assert(empLogin.status === 200 && empLogin.data?.data?.user?.id === 'TDS001', 'Employee Authentication & Session Creation');

      // 4. Me endpoint
      const meRes = await request('GET', '/auth/me', null, { Authorization: `Bearer ${adminToken}` });
      assert(meRes.status === 200 && meRes.data?.data?.role === 'admin', 'Protected /auth/me with Bearer Token');

      // 5. Inquiries (Website Contact Form submission)
      const inquiryRes = await request('POST', '/inquiries', {
        name: 'Veronica Blackwood',
        email: 'v.blackwood@cybercorp.io',
        phone: '+1 555 8899',
        company: 'CyberCorp Technologies',
        service: 'Web Development',
        budget: '$15,000 - $30,000',
        message: 'Looking for high-concurrency real-time WebSocket dashboard.'
      });
      assert(
        inquiryRes.status === 201 && inquiryRes.data?.data?.inquiry?.id?.startsWith('INQ-'),
        'Website Contact Form -> Inquiry Creation'
      );
      assert(
        inquiryRes.data?.data?.client?.name === 'Veronica Blackwood',
        'Automatic CRM Client Lead Generation on Inquiry'
      );

      // Verify inquiries list
      const inqList = await request('GET', '/inquiries');
      assert(inqList.status === 200 && inqList.data?.data?.length >= 3, 'Fetch Inquiries List');

      // 6. Career Application
      const appRes = await request('POST', '/applications', {
        name: 'Marcus Vance',
        email: 'marcus.vance@gaming.dev',
        jobTitle: 'Game Developer (FiveM / Lua)',
        department: 'Game Developer',
        resumeLink: 'https://drive.google.com/file/d/marcus-cv/view',
        portfolio: 'https://github.com/marcusvance'
      });
      assert(appRes.status === 201 && appRes.data?.data?.jobTitle?.includes('Game Developer'), 'Careers Application Submission');

      // 7. Client CRM
      const clientList = await request('GET', '/clients');
      assert(clientList.status === 200 && clientList.data?.data?.length >= 3, 'CRM Fetch Clients List');

      // 8. Projects ERP
      const newProj = await request('POST', '/projects', {
        title: 'CyberCorp High-Throughput Analytics Engine',
        client: 'CyberCorp Technologies',
        service: 'Web Development',
        budget: '$25,000',
        progress: 15,
        status: 'In Progress'
      });
      assert(newProj.status === 201 && newProj.data?.data?.id?.startsWith('PRJ-'), 'Project ERP Creation');

      // 9. Agile Kanban Tasks
      const newTask = await request('POST', '/tasks', {
        title: 'Design API Gateway Middleware Architecture',
        projectId: newProj.data?.data?.id,
        project: newProj.data?.data?.title,
        assignedTo: 'Alexander Tensora',
        assignedToId: 'TDS001',
        status: 'To Do',
        progress: 0
      });
      assert(newTask.status === 201 && newTask.data?.data?.id?.startsWith('TSK-'), 'Kanban Task Creation');

      // Move task status
      const moveTask = await request('PATCH', `/tasks/${newTask.data?.data?.id}/status`, { status: 'In Progress' });
      assert(moveTask.status === 200 && moveTask.data?.data?.status === 'In Progress', 'Kanban Task Status Transition');

      // Add comment to task
      const addComment = await request('POST', `/tasks/${newTask.data?.data?.id}/comments`, {
        text: 'Initial scaffolding verified.',
        sender: 'Alexander Tensora'
      });
      assert(addComment.status === 200 && addComment.data?.data?.comments?.length >= 1, 'Kanban Threaded Comment');

      // 10. Invoices with 18% GST calculation
      const newInv = await request('POST', '/invoices', {
        client: 'CyberCorp Technologies',
        subtotal: 10000,
        taxRate: 18,
        status: 'Pending'
      });
      assert(
        newInv.status === 201 && newInv.data?.data?.taxAmount === 1800 && newInv.data?.data?.total === 11800,
        'Tax Invoice Engine with 18% GST Automated Calculation'
      );

      // 11. Inbound Treasury Payments
      const newPayment = await request('POST', '/payments', {
        invoiceId: newInv.data?.data?.id,
        client: 'CyberCorp Technologies',
        amount: 11800,
        method: 'Bank Wire / NEFT'
      });
      assert(newPayment.status === 201 && newPayment.data?.data?.amount === 11800, 'Treasury Payment Recording');

      // Verify invoice status automatically transitioned to Paid
      const invCheck = await request('GET', `/invoices/${newInv.data?.data?.id}`);
      assert(invCheck.data?.data?.status === 'Paid', 'Automatic Invoice Payment Reconciliation');

      // 12. OPEX Expenses
      const newExp = await request('POST', '/expenses', {
        title: 'Kubernetes Cluster & High-Memory Database Nodes',
        category: 'Hosting',
        amount: 12500,
        vendor: 'AWS Cloud'
      });
      assert(newExp.status === 201 && newExp.data?.data?.amount === 12500, 'OPEX Expense Tracking');

      // 13. Shift Attendance Punch Clock
      const punchIn = await request('POST', '/attendance/punch-in', { employeeId: 'TDS001' });
      assert(punchIn.status === 200 && punchIn.data?.data?.status === 'Present', 'Shift Attendance Punch In');

      const punchOut = await request('POST', '/attendance/punch-out', { employeeId: 'TDS001' });
      assert(punchOut.status === 200 && punchOut.data?.data?.checkOut !== '—', 'Shift Attendance Punch Out');

      // 14. Executive KPIs & Analytics
      const kpiRes = await request('GET', '/analytics/kpis');
      assert(
        kpiRes.status === 200 && kpiRes.data?.data?.totalClients >= 3 && kpiRes.data?.data?.activeProjects >= 2,
        'Executive Real-Time KPIs Computation'
      );

      // 15. Revenue chart data
      const chartRes = await request('GET', '/analytics/revenue-chart?timeframe=6M');
      assert(chartRes.status === 200 && chartRes.data?.data?.revenue?.length === 6, 'Revenue Chart Series Data');

      // 16. Audit Reports
      const reportRes = await request('GET', '/analytics/reports?type=financial');
      assert(reportRes.status === 200 && reportRes.data?.data?.summary?.totalClients >= 3, 'Multi-Domain Audit Report Generation');

      // 17. Notifications Feed
      const notifs = await request('GET', '/notifications');
      assert(notifs.status === 200 && notifs.data?.data?.length >= 2, 'Notifications Feed');

    } catch (err) {
      console.error('Test execution error:', err);
      failed++;
    } finally {
      console.log(`\n========================================`);
      console.log(`  TEST RESULTS: ${passed} PASSED | ${failed} FAILED`);
      console.log(`========================================\n`);

      server.close(() => {
        process.exit(failed > 0 ? 1 : 0);
      });
    }
  });
}

runTests();
