/**
 * TENSORA DIGITAL SOLUTIONS API SERVICE
 * Connects the public website with the company backend REST API & dashboard
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Storage keys shared with TDS DASHBOARD for offline local fallback
const STORAGE_KEYS = {
  INQUIRIES: 'tensora_inquiries',
  APPLICATIONS: 'tensora_applications',
  PROJECTS: 'tensora_client_projects',
  DASHBOARD_CLIENTS: 'tensora_clients_v2_zero',
  DASHBOARD_NOTIFICATIONS: 'tensora_notifications_v2_zero'
};

const getStorageItem = (key, defaultVal = []) => {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : defaultVal;
  } catch {
    return defaultVal;
  }
};

const setStorageItem = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error('Storage error:', err);
  }
};

// Initial Seed Data for inquiries
const initialInquiries = [
  {
    id: 'INQ-1001',
    name: 'Robert Thorne',
    email: 'r.thorne@apexholdings.io',
    phone: '+1 (555) 349-8821',
    company: 'Apex Holdings',
    service: 'Web Development',
    budget: '$10,000 - $25,000',
    message: 'We require a full re-engineering of our corporate investor portal with real-time portfolio dashboards and dark mode theme.',
    status: 'New',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: 'INQ-1002',
    name: 'Soren Lindqvist',
    email: 'soren@nordicgames.net',
    phone: '+46 8 123 4567',
    company: 'Nordic Roleplay Syndicate',
    service: 'Game Script Development',
    budget: '$5,000 - $10,000',
    message: 'Looking for a custom QBox framework server with custom vehicle dealership NUI, banking system, and anti-dupe database transaction layer.',
    status: 'In Review',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
  }
];

if (!localStorage.getItem(STORAGE_KEYS.INQUIRIES)) {
  setStorageItem(STORAGE_KEYS.INQUIRIES, initialInquiries);
}

// Broadcast Channel for live cross-tab communication
let broadcastChannel = null;
try {
  broadcastChannel = new BroadcastChannel('tensora_sync_channel');
} catch (e) {
  // BroadcastChannel not available in older environments
}

export const api = {
  // Inquiries & Contact Submissions (Synchronized with Company Backend & Dashboard)
  submitInquiry: async (inquiryData) => {
    try {
      const response = await fetch(`${API_BASE}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiryData)
      });
      if (response.ok) {
        const json = await response.json();
        // Also update local storage for offline state
        const inquiries = getStorageItem(STORAGE_KEYS.INQUIRIES);
        inquiries.unshift(json.data.inquiry);
        setStorageItem(STORAGE_KEYS.INQUIRIES, inquiries);

        if (broadcastChannel) {
          try {
            broadcastChannel.postMessage({
              type: 'NEW_CLIENT_INQUIRY',
              client: json.data.client,
              inquiry: json.data.inquiry
            });
          } catch (err) {}
        }
        return json;
      }
    } catch (err) {
      console.warn('Backend API offline, using local fallback:', err);
    }

    // Local fallback
    await new Promise((res) => setTimeout(res, 400));
    const inquiries = getStorageItem(STORAGE_KEYS.INQUIRIES);
    const newInquiry = {
      id: `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
      ...inquiryData,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    inquiries.unshift(newInquiry);
    setStorageItem(STORAGE_KEYS.INQUIRIES, inquiries);

    const dashboardClients = getStorageItem(STORAGE_KEYS.DASHBOARD_CLIENTS, []);
    const newDashboardClient = {
      id: `CLT-${Date.now().toString().slice(-4)}`,
      name: inquiryData.name,
      company: inquiryData.company || `${inquiryData.name}'s Organization`,
      email: inquiryData.email,
      phone: inquiryData.phone || 'Pending Info',
      address: `Budget: ${inquiryData.budget || 'Custom'}`,
      service: inquiryData.service || 'Web Development',
      status: 'Active',
      joinedDate: new Date().toISOString().split('T')[0],
      projectsCount: 1,
      revenue: 0,
      avatar: `https://images.unsplash.com/photo-${1534528741775 + (dashboardClients.length % 5)}?w=120&auto=format&fit=crop&q=80`
    };

    const existingIndex = dashboardClients.findIndex((c) => c.email?.toLowerCase() === inquiryData.email?.toLowerCase());
    if (existingIndex >= 0) {
      dashboardClients[existingIndex] = { ...dashboardClients[existingIndex], ...newDashboardClient };
    } else {
      dashboardClients.unshift(newDashboardClient);
    }
    setStorageItem(STORAGE_KEYS.DASHBOARD_CLIENTS, dashboardClients);

    const dashboardNotifications = getStorageItem(STORAGE_KEYS.DASHBOARD_NOTIFICATIONS, []);
    const newNotification = {
      id: `NOTIF-${Date.now().toString().slice(-4)}`,
      title: `New Client Lead: ${inquiryData.name}`,
      message: `Submitted an inquiry for ${inquiryData.service} (${inquiryData.budget}).`,
      time: 'Just now',
      read: false,
      type: 'inquiry'
    };
    dashboardNotifications.unshift(newNotification);
    setStorageItem(STORAGE_KEYS.DASHBOARD_NOTIFICATIONS, dashboardNotifications);

    if (broadcastChannel) {
      try {
        broadcastChannel.postMessage({
          type: 'NEW_CLIENT_INQUIRY',
          client: newDashboardClient,
          inquiry: newInquiry
        });
      } catch (err) {}
    }

    return {
      success: true,
      data: {
        inquiry: newInquiry,
        client: newDashboardClient
      }
    };
  },

  getInquiries: async () => {
    try {
      const response = await fetch(`${API_BASE}/inquiries`);
      if (response.ok) {
        const json = await response.json();
        return json.data || [];
      }
    } catch (err) {
      console.warn('Backend API offline, using local fallback:', err);
    }
    return getStorageItem(STORAGE_KEYS.INQUIRIES);
  },

  updateInquiryStatus: async (id, status) => {
    try {
      const response = await fetch(`${API_BASE}/inquiries/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (response.ok) {
        return { success: true };
      }
    } catch (err) {
      console.warn('Backend API offline, using local fallback:', err);
    }

    const inquiries = getStorageItem(STORAGE_KEYS.INQUIRIES);
    const updated = inquiries.map((item) => (item.id === id ? { ...item, status } : item));
    setStorageItem(STORAGE_KEYS.INQUIRIES, updated);
    return { success: true };
  },

  // Job Applications
  submitJobApplication: async (applicationData) => {
    try {
      const response = await fetch(`${API_BASE}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData)
      });
      if (response.ok) {
        const json = await response.json();
        const apps = getStorageItem(STORAGE_KEYS.APPLICATIONS);
        apps.unshift(json.data);
        setStorageItem(STORAGE_KEYS.APPLICATIONS, apps);
        return json;
      }
    } catch (err) {
      console.warn('Backend API offline, using local fallback:', err);
    }

    const apps = getStorageItem(STORAGE_KEYS.APPLICATIONS);
    const newApp = {
      id: `APP-${Math.floor(1000 + Math.random() * 9000)}`,
      ...applicationData,
      status: 'Applied',
      appliedAt: new Date().toISOString()
    };
    apps.unshift(newApp);
    setStorageItem(STORAGE_KEYS.APPLICATIONS, apps);
    return { success: true, data: newApp };
  },

  getJobApplications: async () => {
    try {
      const response = await fetch(`${API_BASE}/applications`);
      if (response.ok) {
        const json = await response.json();
        return json.data || [];
      }
    } catch (err) {
      console.warn('Backend API offline, using local fallback:', err);
    }
    return getStorageItem(STORAGE_KEYS.APPLICATIONS);
  },

  // Admin Telemetry & Analytics
  getAdminStats: async () => {
    try {
      const response = await fetch(`${API_BASE}/analytics/kpis`);
      if (response.ok) {
        const json = await response.json();
        return {
          totalClients: json.data?.totalClients || 28,
          activeProjects: json.data?.activeProjects || 9,
          completedProjects: 54,
          monthlyRevenue: json.data?.monthlyRevenueFormatted || '$84,500',
          revenueGrowth: json.data?.revenueGrowth || '+18.4%',
          pendingInvoices: json.data?.pendingPaymentsFormatted || '$12,400',
          openInquiries: json.data?.pendingTasks || 2,
          systemUptime: json.data?.systemUptime || '99.98%'
        };
      }
    } catch (err) {
      console.warn('Backend API offline, using local fallback:', err);
    }

    const clients = getStorageItem(STORAGE_KEYS.DASHBOARD_CLIENTS, []);
    return {
      totalClients: clients.length > 0 ? clients.length : 28,
      activeProjects: 9,
      completedProjects: 54,
      monthlyRevenue: '$84,500',
      revenueGrowth: '+18.4%',
      pendingInvoices: '$12,400',
      openInquiries: getStorageItem(STORAGE_KEYS.INQUIRIES).filter((i) => i.status === 'New').length,
      systemUptime: '99.98%'
    };
  }
};
