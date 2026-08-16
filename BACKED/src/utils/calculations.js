export const calculateKPIs = (data) => {
  const {
    clients = [],
    projects = [],
    invoices = [],
    expenses = [],
    tasks = [],
    employees = []
  } = data;

  const totalClients = clients.length;
  const activeProjects = projects.filter(
    (p) => p.status === 'In Progress' || p.status === 'Planning' || p.status === 'Review'
  ).length;

  // Total Revenue from Paid Invoices
  const totalRevenue = invoices
    .filter((inv) => inv.status === 'Paid')
    .reduce((sum, inv) => sum + (Number(inv.total) || 0), 0);

  // Pending Payments from Invoices
  const pendingPayments = invoices
    .filter((inv) => inv.status === 'Pending' || inv.status === 'Partially Paid' || inv.status === 'Overdue')
    .reduce((sum, inv) => sum + ((Number(inv.total) || 0) - (Number(inv.paidAmount) || 0)), 0);

  // Monthly Expenses
  const monthlyExpenses = expenses.reduce((sum, exp) => sum + (Number(exp.amount) || 0), 0);

  // Net Profit
  const netProfit = totalRevenue - monthlyExpenses;

  // Pending Tasks
  const pendingTasks = tasks.filter((t) => t.status !== 'Completed').length;

  // Total Employees
  const totalEmployees = employees.length;

  return {
    totalClients,
    activeProjects,
    monthlyRevenue: totalRevenue,
    pendingPayments,
    employees: totalEmployees,
    monthlyExpenses,
    netProfit,
    pendingTasks
  };
};
