# TENSORA DIGITAL SOLUTIONS (TDS) - BACKEND REST API ENGINE

Production-grade, modular Node.js & Express.js REST API backend powering both **WEBSITE FRONTEND** and **DASHBOARD FRONTEND**.

---

## ⚡ Quick Start

```bash
# Navigate to backend directory
cd BACKED

# Install dependencies
npm install

# Start development server
npm run dev

# Or start in standard production mode
npm start
```

Default Server URL: `http://localhost:5000`  
API Base URL: `http://localhost:5000/api`  
Health Check: `http://localhost:5000/api/health`

---

## 🔐 Authentication & Roles

| Role | Default Identifier | Default Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@tensora.com` or `TENSORA` | `admin123` or `TDSadmin` | Full enterprise control, financials, CRM, ERP, HR, settings & reset |
| **Employee / User** | `TDS001` or `alexander@tensora.com` | `user123` | Personal workspace, assigned projects, Kanban tasks, shift attendance |
| **Client** | `r.thorne@apexholdings.io` | `client123` | Client portal, project milestones, invoices & statements |

---

## 📡 REST API Endpoints Overview

### 1. Authentication (`/api/auth`)
* `POST /api/auth/login` - Dual-role login (Admin, Employee, Client). Returns JWT token & session.
* `POST /api/auth/google` - Google OAuth Single Sign-On.
* `GET /api/auth/me` - Get profile of authenticated user.
* `POST /api/auth/logout` - Logout & record session duration.

### 2. Website Inquiries & Contact Intake (`/api/inquiries`)
* `POST /api/inquiries` - Public contact form submission (**Automatically creates client lead in CRM and notification in Dashboard!**).
* `GET /api/inquiries` - List inquiries (supports `status` and `search` query params).
* `GET /api/inquiries/:id` - Single inquiry detail.
* `PATCH /api/inquiries/:id/status` - Update inquiry status (`New`, `In Review`, `Contacted`, `Closed`).
* `DELETE /api/inquiries/:id` - Delete inquiry.

### 3. Career Applications (`/api/applications`)
* `POST /api/applications` - Submit job application with portfolio & CV link.
* `GET /api/applications` - List job applicants.
* `PATCH /api/applications/:id/status` - Update candidate review status.
* `DELETE /api/applications/:id` - Remove applicant.

### 4. Client CRM (`/api/clients`)
* `GET /api/clients` - List all clients with live search and filter.
* `POST /api/clients` - Create new client lead/account.
* `GET /api/clients/:id` - Client dossier with associated projects and invoices.
* `PUT /api/clients/:id` - Update client information.
* `DELETE /api/clients/:id` - Delete client.

### 5. Project ERP (`/api/projects`)
* `GET /api/projects` - List all projects.
* `POST /api/projects` - Create project with milestones and team.
* `GET /api/projects/:id` - Project details with tasks.
* `PUT /api/projects/:id` - Update project and progress slider.
* `DELETE /api/projects/:id` - Delete project.

### 6. Services (`/api/services`)
* `GET /api/services` - List 6 Tensora service pillars.
* `POST /api/services` - Add custom service.
* `PUT /api/services/:id` - Update service details.
* `DELETE /api/services/:id` - Delete service.

### 7. Human Resources / Employees (`/api/employees`)
* `GET /api/employees` - List employees with ratings and departments.
* `POST /api/employees` - Onboard new employee.
* `GET /api/employees/:id` - Employee profile and assigned tasks.
* `PUT /api/employees/:id` - Update employee details.
* `DELETE /api/employees/:id` - Remove employee.

### 8. Agile Kanban Tasks (`/api/tasks`)
* `GET /api/tasks` - List tasks (filter by `status`, `projectId`, `assignedToId`).
* `POST /api/tasks` - Create task card.
* `PUT /api/tasks/:id` - Update task details.
* `PATCH /api/tasks/:id/status` - Move task status (`To Do`, `In Progress`, `Review`, `Completed`).
* `POST /api/tasks/:id/comments` - Add threaded team comment.
* `DELETE /api/tasks/:id` - Delete task.

### 9. Billing & Tax Invoices (`/api/invoices`)
* `GET /api/invoices` - List invoices with 18% GST calculations.
* `POST /api/invoices` - Create invoice.
* `PUT /api/invoices/:id` - Update invoice and payments.
* `DELETE /api/invoices/:id` - Delete invoice.

### 10. Treasury & Payments (`/api/payments`)
* `GET /api/payments` - Inbound payment logs (UPI, Wire, Card, Cash).
* `POST /api/payments` - Record payment (auto-updates associated invoice).
* `DELETE /api/payments/:id` - Remove payment record.

### 11. OPEX & Expenses (`/api/expenses`)
* `GET /api/expenses` - Categorized expenses (Hosting, Software, Marketing, etc.).
* `POST /api/expenses` - Record expense.
* `PUT /api/expenses/:id` - Update expense.
* `DELETE /api/expenses/:id` - Delete expense.

### 12. Team Messages & Notifications (`/api/messages` & `/api/notifications`)
* `GET /api/messages` - Team channels.
* `POST /api/messages/:conversationId` - Send chat message.
* `GET /api/notifications` - Alert notification stream.
* `PATCH /api/notifications/:id/read` - Mark read.
* `POST /api/notifications/read-all` - Mark all read.

### 13. Shift Attendance (`/api/attendance`)
* `GET /api/attendance` - Shift punch clock ledger.
* `POST /api/attendance/punch-in` - Record check-in timestamp.
* `POST /api/attendance/punch-out` - Record check-out timestamp.

### 14. Login Sessions Audit (`/api/sessions`)
* `GET /api/sessions` - Employee login/logout audit trail with duration & IP tracking.

### 15. Executive Analytics & Reports (`/api/analytics`)
* `GET /api/analytics/kpis` - Live executive KPIs (Revenue, Profit, OPEX, Projects, Clients, Tasks).
* `GET /api/analytics/revenue-chart` - Multi-period revenue overview (7D / 30D / 6M / 1Y).
* `GET /api/analytics/pipeline-distribution` - Project pipeline breakdown.
* `GET /api/analytics/expense-breakdown` - OPEX breakdown by category.
* `GET /api/analytics/reports` - Multi-domain audit report generator.

### 16. System Operations (`/api/system`)
* `GET /api/system/health` - API gateway health and telemetry.
* `GET /api/system/settings` - Company settings and GST rate.
* `POST /api/system/reset` - One-click factory seed restore.

---

## 💾 Storage Architecture
The backend uses a high-performance, file-backed atomic JSON database (`data/tds_database.json`) that seeds automatically on initial run. No external database server installation (Postgres/MySQL) is required, ensuring zero setup friction while providing full persistence and instant backup/reset capabilities.
