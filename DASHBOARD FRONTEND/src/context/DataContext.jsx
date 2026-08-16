import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { initialClients } from '../data/clients';
import { initialProjects } from '../data/projects';
import { initialEmployees } from '../data/employees';
import { initialServices } from '../data/services';
import { initialTasks } from '../data/tasks';
import { initialInvoices } from '../data/invoices';
import { initialPayments } from '../data/payments';
import { initialExpenses } from '../data/expenses';
import { initialMessages, initialNotifications, initialAttendance } from '../data/messages';
import { initialLoginSessions } from '../data/loginSessions';
import { calculateKPIs } from '../utils/calculations';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [clients, setClients] = useState(() => storageService.get(storageService.KEYS.CLIENTS, initialClients));
  const [projects, setProjects] = useState(() => storageService.get(storageService.KEYS.PROJECTS, initialProjects));
  const [employees, setEmployees] = useState(() => storageService.get(storageService.KEYS.EMPLOYEES, initialEmployees));
  const [services, setServices] = useState(() => storageService.get(storageService.KEYS.SERVICES, initialServices));
  const [tasks, setTasks] = useState(() => storageService.get(storageService.KEYS.TASKS, initialTasks));
  const [invoices, setInvoices] = useState(() => storageService.get(storageService.KEYS.INVOICES, initialInvoices));
  const [payments, setPayments] = useState(() => storageService.get(storageService.KEYS.PAYMENTS, initialPayments));
  const [expenses, setExpenses] = useState(() => storageService.get(storageService.KEYS.EXPENSES, initialExpenses));
  const [messages, setMessages] = useState(() => storageService.get(storageService.KEYS.MESSAGES, initialMessages));
  const [notifications, setNotifications] = useState(() => storageService.get(storageService.KEYS.NOTIFICATIONS, initialNotifications));
  const [attendance, setAttendance] = useState(() => storageService.get(storageService.KEYS.ATTENDANCE, initialAttendance));
  const [loginSessions, setLoginSessions] = useState(() => storageService.get(storageService.KEYS.SESSIONS, initialLoginSessions));

  // Sync to localStorage
  useEffect(() => { storageService.set(storageService.KEYS.CLIENTS, clients); }, [clients]);
  useEffect(() => { storageService.set(storageService.KEYS.PROJECTS, projects); }, [projects]);
  useEffect(() => { storageService.set(storageService.KEYS.EMPLOYEES, employees); }, [employees]);
  useEffect(() => { storageService.set(storageService.KEYS.SERVICES, services); }, [services]);
  useEffect(() => { storageService.set(storageService.KEYS.TASKS, tasks); }, [tasks]);
  useEffect(() => { storageService.set(storageService.KEYS.INVOICES, invoices); }, [invoices]);
  useEffect(() => { storageService.set(storageService.KEYS.PAYMENTS, payments); }, [payments]);
  useEffect(() => { storageService.set(storageService.KEYS.EXPENSES, expenses); }, [expenses]);
  useEffect(() => { storageService.set(storageService.KEYS.MESSAGES, messages); }, [messages]);
  useEffect(() => { storageService.set(storageService.KEYS.NOTIFICATIONS, notifications); }, [notifications]);
  useEffect(() => { storageService.set(storageService.KEYS.ATTENDANCE, attendance); }, [attendance]);
  useEffect(() => { storageService.set(storageService.KEYS.SESSIONS, loginSessions); }, [loginSessions]);

  // Real-time synchronization with TDS WEBSITE (Contact Form Submissions)
  useEffect(() => {
    let channel;
    try {
      channel = new BroadcastChannel('tensora_sync_channel');
      channel.onmessage = (event) => {
        if (event.data?.type === 'NEW_CLIENT_INQUIRY') {
          const freshClients = storageService.get(storageService.KEYS.CLIENTS, []);
          const freshNotifs = storageService.get(storageService.KEYS.NOTIFICATIONS, []);
          setClients(freshClients);
          setNotifications(freshNotifs);
        }
      };
    } catch (e) {
      console.warn('BroadcastChannel not supported');
    }

    const handleStorageChange = (e) => {
      if (e.key === storageService.KEYS.CLIENTS && e.newValue) {
        try {
          setClients(JSON.parse(e.newValue));
        } catch (err) {}
      }
      if (e.key === storageService.KEYS.NOTIFICATIONS && e.newValue) {
        try {
          setNotifications(JSON.parse(e.newValue));
        } catch (err) {}
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      if (channel) channel.close();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Clients CRUD
  const addClient = (client) => {
    const newClient = {
      ...client,
      id: `CLT-${Date.now().toString().slice(-4)}`,
      joinedDate: new Date().toISOString().split('T')[0],
      projectsCount: 0,
      revenue: 0,
      status: client.status || 'Active'
    };
    setClients(prev => [newClient, ...prev]);
    return newClient;
  };

  const updateClient = (id, updatedData) => {
    setClients(prev => prev.map(c => c.id === id ? { ...c, ...updatedData } : c));
  };

  const deleteClient = (id) => {
    setClients(prev => prev.filter(c => c.id !== id));
  };

  // Projects CRUD
  const addProject = (project) => {
    const newProject = {
      ...project,
      id: `PRJ-${Date.now().toString().slice(-3)}`,
      progress: Number(project.progress) || 0,
      status: project.status || 'Planning',
      team: project.team || []
    };
    setProjects(prev => [newProject, ...prev]);
    return newProject;
  };

  const updateProject = (id, updatedData) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
  };

  const deleteProject = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  // Services CRUD
  const addService = (service) => {
    const newService = {
      ...service,
      id: service.id?.trim() ? service.id.trim().toUpperCase() : `SRV-${(services.length + 1).toString().padStart(2, '0')}`,
      icon: service.icon || 'bi-gear-wide-connected',
      technologies: Array.isArray(service.technologies)
        ? service.technologies
        : (typeof service.technologies === 'string' && service.technologies.trim()
            ? service.technologies.split(',').map(t => t.trim()).filter(Boolean)
            : ['Custom Suite']),
      startingPrice: Number(service.startingPrice) || 0,
      activeProjects: Number(service.activeProjects) || 0,
      completedProjects: Number(service.completedProjects) || 0,
      lead: service.lead || 'Engineering Team'
    };
    setServices(prev => [newService, ...prev]);
    return newService;
  };

  const updateService = (id, updatedData) => {
    setServices(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          ...updatedData,
          technologies: Array.isArray(updatedData.technologies)
            ? updatedData.technologies
            : (typeof updatedData.technologies === 'string'
                ? updatedData.technologies.split(',').map(t => t.trim()).filter(Boolean)
                : s.technologies),
          startingPrice: updatedData.startingPrice !== undefined ? Number(updatedData.startingPrice) : s.startingPrice,
          activeProjects: updatedData.activeProjects !== undefined ? Number(updatedData.activeProjects) : s.activeProjects
        };
      }
      return s;
    }));
  };

  const deleteService = (id) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  // Employees CRUD
  const addEmployee = (employee) => {
    const defaultId = `TDS${(employees.length + 1).toString().padStart(3, '0')}`;
    const newEmployee = {
      ...employee,
      id: employee.id?.trim() ? employee.id.trim().toUpperCase() : defaultId,
      username: employee.username?.trim() || (employee.id?.trim() ? employee.id.trim() : defaultId),
      password: employee.password || 'user123',
      role: employee.role || 'user',
      joiningDate: employee.joiningDate || new Date().toISOString().split('T')[0],
      status: employee.status || 'Active',
      rating: employee.rating || 5.0,
      assignedProjectsCount: 0,
      completedTasksCount: 0,
      skills: employee.skills || ['React', 'JavaScript']
    };
    setEmployees(prev => [newEmployee, ...prev]);
    return newEmployee;
  };

  const updateEmployee = (id, updatedData) => {
    setEmployees(prev => prev.map(e => e.id === id ? { ...e, ...updatedData } : e));
  };

  const deleteEmployee = (id) => {
    setEmployees(prev => prev.filter(e => e.id !== id));
  };

  // Tasks CRUD
  const addTask = (task) => {
    const newTask = {
      ...task,
      id: `TSK-${Date.now().toString().slice(-3)}`,
      status: task.status || 'To Do',
      progress: Number(task.progress) || 0,
      comments: []
    };
    setTasks(prev => [newTask, ...prev]);
    return newTask;
  };

  const updateTask = (id, updatedData) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updatedData } : t));
  };

  const moveTaskStatus = (id, newStatus) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const progress = newStatus === 'Completed' ? 100 : t.progress;
        return { ...t, status: newStatus, progress };
      }
      return t;
    }));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const addTaskComment = (taskId, senderName, commentText) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const newComments = [
          ...(t.comments || []),
          { sender: senderName, text: commentText, time: new Date().toLocaleString() }
        ];
        return { ...t, comments: newComments };
      }
      return t;
    }));
  };

  // Invoices CRUD
  const addInvoice = (invoice) => {
    const newInvoice = {
      ...invoice,
      id: `INV-${new Date().getFullYear()}-${Date.now().toString().slice(-3)}`,
      invoiceNumber: `TDS/${new Date().getFullYear()}/${Date.now().toString().slice(-4)}`,
      issueDate: invoice.issueDate || new Date().toISOString().split('T')[0],
      paidAmount: invoice.status === 'Paid' ? invoice.total : (Number(invoice.paidAmount) || 0)
    };
    setInvoices(prev => [newInvoice, ...prev]);
    return newInvoice;
  };

  const updateInvoice = (id, updatedData) => {
    setInvoices(prev => prev.map(i => i.id === id ? { ...i, ...updatedData } : i));
  };

  const deleteInvoice = (id) => {
    setInvoices(prev => prev.filter(i => i.id !== id));
  };

  // Payments CRUD
  const addPayment = (payment) => {
    const newPayment = {
      ...payment,
      id: `PAY-${Date.now().toString().slice(-3)}`,
      transactionId: `TXN-TDS-${Date.now().toString().slice(-5)}`,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'Completed'
    };
    setPayments(prev => [newPayment, ...prev]);
    return newPayment;
  };

  const deletePayment = (id) => {
    setPayments(prev => prev.filter(p => p.id !== id));
  };

  // Expenses CRUD
  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: `EXP-${Date.now().toString().slice(-3)}`,
      amount: Number(expense.amount) || 0,
      date: expense.date || new Date().toISOString().split('T')[0],
      status: 'Paid',
      receipt: `REC-TDS-${Date.now().toString().slice(-4)}`
    };
    setExpenses(prev => [newExpense, ...prev]);
    return newExpense;
  };

  const updateExpense = (id, updatedData) => {
    setExpenses(prev => prev.map(e => e.id === id ? { ...e, ...updatedData, amount: Number(updatedData.amount !== undefined ? updatedData.amount : e.amount) } : e));
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  // Messaging
  const sendMessage = (conversationId, senderId, text) => {
    setMessages(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        const newChat = [
          ...conv.chatHistory,
          {
            id: Date.now().toString(),
            senderId,
            text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ];
        return {
          ...conv,
          chatHistory: newChat,
          lastMessage: text,
          lastTime: 'Just now'
        };
      }
      return conv;
    }));
  };

  // Notifications
  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Attendance Punch
  const punchIn = () => {
    const today = new Date().toISOString().split('T')[0];
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const existingIndex = attendance.findIndex(a => a.date === today);

    if (existingIndex >= 0) {
      setAttendance(prev => prev.map((a, i) => i === existingIndex ? { ...a, checkIn: timeStr, status: 'Present' } : a));
    } else {
      const newAtt = {
        id: `ATT-${Date.now().toString().slice(-2)}`,
        date: today,
        checkIn: timeStr,
        checkOut: '—',
        hours: 'In Progress',
        status: 'Present'
      };
      setAttendance(prev => [newAtt, ...prev]);
    }
  };

  const punchOut = () => {
    const today = new Date().toISOString().split('T')[0];
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setAttendance(prev => prev.map(a => {
      if (a.date === today) {
        return { ...a, checkOut: timeStr, hours: '8h 30m' };
      }
      return a;
    }));
  };

  // Session Logging (Login / Logout Time Tracking)
  const recordLoginSession = (user) => {
    const now = new Date();
    const formattedTime = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
    const sessionId = `SES-${Date.now().toString().slice(-4)}`;

    const newSession = {
      id: sessionId,
      employeeId: user.id || 'ADM-001',
      employeeName: user.name || 'Tensora User',
      department: user.department || 'Management',
      designation: user.designation || user.role || 'Specialist',
      loginTime: formattedTime,
      loginTimestamp: now.getTime(),
      logoutTime: '—',
      duration: 'Active Now',
      ipAddress: '192.168.1.' + Math.floor(Math.random() * 80 + 20),
      device: navigator.userAgent.includes('Mac') ? 'macOS / Chrome' : 'Windows 11 / Chrome',
      status: 'Active'
    };

    setLoginSessions(prev => [newSession, ...prev]);
    return sessionId;
  };

  const recordLogoutSession = (sessionId) => {
    const now = new Date();
    const formattedTime = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;

    setLoginSessions(prev => prev.map(ses => {
      if (ses.id === sessionId || (ses.status === 'Active' && ses.employeeId === sessionId)) {
        let durationStr = 'Session Closed';
        if (ses.loginTimestamp) {
          const diffMs = now.getTime() - ses.loginTimestamp;
          const mins = Math.floor(diffMs / 60000);
          const secs = Math.floor((diffMs % 60000) / 1000);
          durationStr = mins > 60 ? `${Math.floor(mins / 60)}h ${mins % 60}m` : `${mins}m ${secs}s`;
        }
        return {
          ...ses,
          logoutTime: formattedTime,
          duration: durationStr,
          status: 'Logged Out'
        };
      }
      return ses;
    }));
  };

  const clearLoginSessions = () => {
    setLoginSessions([]);
  };

  // Reset Factory Data
  const resetData = () => {
    storageService.resetAllData();
    setClients(initialClients);
    setProjects(initialProjects);
    setEmployees(initialEmployees);
    setServices(initialServices);
    setTasks(initialTasks);
    setInvoices(initialInvoices);
    setPayments(initialPayments);
    setExpenses(initialExpenses);
    setMessages(initialMessages);
    setNotifications(initialNotifications);
    setAttendance(initialAttendance);
    setLoginSessions(initialLoginSessions);
  };

  // Compute live KPIs
  const kpis = calculateKPIs({ clients, projects, invoices, expenses, tasks, employees });

  return (
    <DataContext.Provider
      value={{
        clients,
        projects,
        employees,
        services,
        tasks,
        invoices,
        payments,
        expenses,
        messages,
        notifications,
        attendance,
        loginSessions,
        kpis,
        addClient,
        updateClient,
        deleteClient,
        addProject,
        updateProject,
        deleteProject,
        addService,
        updateService,
        deleteService,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        addTask,
        updateTask,
        moveTaskStatus,
        deleteTask,
        addTaskComment,
        addInvoice,
        updateInvoice,
        deleteInvoice,
        addPayment,
        deletePayment,
        addExpense,
        updateExpense,
        deleteExpense,
        sendMessage,
        markNotificationRead,
        clearAllNotifications,
        punchIn,
        punchOut,
        recordLoginSession,
        recordLogoutSession,
        clearLoginSessions,
        resetData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
