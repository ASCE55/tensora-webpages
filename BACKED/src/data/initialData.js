export const initialServices = [
  {
    id: 'SRV-01',
    name: 'Web Development',
    category: 'Development',
    icon: 'bi-code-slash',
    description: 'Custom full-stack web applications, enterprise portals, responsive SaaS interfaces and bespoke web solutions.',
    technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Vite'],
    startingPrice: 2000,
    activeProjects: 1,
    completedProjects: 14,
    lead: 'Alexander Tensora'
  },
  {
    id: 'SRV-02',
    name: 'App Development',
    category: 'Mobile',
    icon: 'bi-phone',
    description: 'High-performance native and cross-platform mobile apps with cloud integration and intuitive UX.',
    technologies: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase'],
    startingPrice: 2000,
    activeProjects: 1,
    completedProjects: 8,
    lead: 'Rohan Verma'
  },
  {
    id: 'SRV-03',
    name: 'Game Script Development',
    category: 'Gaming',
    icon: 'bi-controller',
    description: 'Advanced custom game logic, multiplayer network scripting, FiveM framework integrations, and physics systems.',
    technologies: ['Lua', 'C#', 'C++', 'Unity', 'Unreal Engine 5'],
    startingPrice: 2000,
    activeProjects: 2,
    completedProjects: 19,
    lead: 'Karan Patel'
  },
  {
    id: 'SRV-04',
    name: 'Graphic Design',
    category: 'Design',
    icon: 'bi-palette',
    description: 'Futuristic brand identity, UI/UX prototyping, marketing collateral, social kits and cybernetic visual identities.',
    technologies: ['Figma', 'Adobe Photoshop', 'Illustrator', 'After Effects'],
    startingPrice: 2000,
    activeProjects: 1,
    completedProjects: 22,
    lead: 'Pooja Nair'
  },
  {
    id: 'SRV-05',
    name: '3D Modelling',
    category: '3D & CGI',
    icon: 'bi-badge-3d',
    description: 'Ultra-detailed 3D hard-surface models, game-ready assets, architectural visualization, and photorealistic rendering.',
    technologies: ['Blender', 'Cinema 4D', 'Maya', 'Substance Painter'],
    startingPrice: 2000,
    activeProjects: 1,
    completedProjects: 11,
    lead: 'Vikram Mehta'
  },
  {
    id: 'SRV-06',
    name: 'Professional Photo & Video Editing',
    category: 'Media Production',
    icon: 'bi-camera-reels',
    description: 'Cinematic color grading, motion graphics, commercial post-production, VFX, and audio mastering.',
    technologies: ['Premiere Pro', 'DaVinci Resolve', 'After Effects', 'Lightroom'],
    startingPrice: 2000,
    activeProjects: 1,
    completedProjects: 16,
    lead: 'Ananya Roy'
  }
];

export const initialAdmin = {
  id: 'ADM-001',
  username: 'TENSORA',
  name: 'Tensora Administrator',
  email: 'admin@tensora.com',
  password: 'TDSadmin', // Also matches admin123
  role: 'admin',
  department: 'Executive Management',
  designation: 'Managing Director & CTO',
  phone: '+91 99000 11223',
  avatar: '/logo.png',
  joinedDate: '2023-01-01'
};

export const initialEmployees = [
  {
    id: 'TDS001',
    username: 'TDS001',
    name: 'Alexander Tensora',
    email: 'alexander@tensora.com',
    password: 'user123',
    role: 'user',
    department: 'Full Stack Engineering',
    designation: 'Lead Software Architect',
    phone: '+91 98765 43210',
    salary: '₹1,50,000 / mo',
    rating: 5.0,
    status: 'Active',
    joiningDate: '2023-03-15',
    assignedProjectsCount: 3,
    completedTasksCount: 28,
    skills: ['React', 'Node.js', 'PostgreSQL', 'Express', 'Architecture']
  },
  {
    id: 'TDS002',
    username: 'TDS002',
    name: 'Karan Patel',
    email: 'karan@tensora.com',
    password: 'user123',
    role: 'user',
    department: 'Gaming & Systems',
    designation: 'Senior FiveM & Lua Engineer',
    phone: '+91 98765 43211',
    salary: '₹1,20,000 / mo',
    rating: 4.9,
    status: 'Active',
    joiningDate: '2023-06-01',
    assignedProjectsCount: 2,
    completedTasksCount: 34,
    skills: ['Lua', 'C#', 'FiveM QBox', 'MySQL', 'Networking']
  }
];

export const initialClients = [
  {
    id: 'CLT-1001',
    name: 'Robert Thorne',
    company: 'Apex Digital Ventures',
    email: 'r.thorne@apexholdings.io',
    phone: '+1 (555) 349-8821',
    address: 'Budget: $10,000 - $25,000',
    service: 'Web Development',
    status: 'Active',
    joinedDate: '2026-01-10',
    projectsCount: 1,
    revenue: 15000,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'CLT-1002',
    name: 'Soren Lindqvist',
    company: 'Nordic Roleplay Syndicate',
    email: 'soren@nordicgames.net',
    phone: '+46 8 123 4567',
    address: 'Budget: $5,000 - $10,000',
    service: 'Game Script Development',
    status: 'Active',
    joinedDate: '2025-11-05',
    projectsCount: 1,
    revenue: 8500,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'
  }
];

export const initialProjects = [
  {
    id: 'PRJ-1082',
    title: 'Nexus Enterprise Cloud Portal',
    client: 'Apex Digital Ventures',
    service: 'Web Development',
    phase: 'Development',
    progress: 68,
    status: 'In Progress',
    priority: 'High',
    budget: '$22,500',
    startDate: '2026-01-15',
    deadline: '2026-03-30',
    lead: 'Alexander Tensora',
    team: ['Alexander Tensora', 'Pooja Nair'],
    milestones: [
      { name: 'System Architecture & Wireframes', status: 'Completed', date: '2026-01-22' },
      { name: 'Dark Theme UI/UX Design Approval', status: 'Completed', date: '2026-02-05' },
      { name: 'React SPA & REST API Integration', status: 'In Progress', date: '2026-02-28' },
      { name: 'Security Audit & Stress Testing', status: 'Pending', date: '2026-03-15' },
      { name: 'Cloud Deployment & Live Handover', status: 'Pending', date: '2026-03-30' }
    ]
  },
  {
    id: 'PRJ-1044',
    title: 'FiveM Custom Police & NUI Garage Script',
    client: 'Nordic Roleplay Syndicate',
    service: 'Game Script Development',
    phase: 'Completed',
    progress: 100,
    status: 'Completed',
    priority: 'High',
    budget: '$8,500',
    startDate: '2025-11-10',
    deadline: '2025-12-05',
    lead: 'Karan Patel',
    team: ['Karan Patel'],
    milestones: [
      { name: 'Lua Net Events & Database Tables', status: 'Completed', date: '2025-11-18' },
      { name: 'React NUI In-Game Dashboard', status: 'Completed', date: '2025-11-25' },
      { name: 'Live Stress Test on Test Server', status: 'Completed', date: '2025-12-01' },
      { name: 'Production Server Deployment', status: 'Completed', date: '2025-12-05' }
    ]
  }
];

export const initialTasks = [
  {
    id: 'TSK-101',
    title: 'Design Dark Theme Tokens & Global CSS Variables',
    projectId: 'PRJ-1082',
    project: 'Nexus Enterprise Cloud Portal',
    assignedTo: 'Alexander Tensora',
    assignedToId: 'TDS001',
    status: 'Completed',
    priority: 'High',
    progress: 100,
    dueDate: '2026-02-10',
    comments: [
      { sender: 'Alexander Tensora', text: 'Completed cyberpunk theme tokens.', time: '2026-02-09 18:30' }
    ]
  },
  {
    id: 'TSK-102',
    title: 'Implement RESTful API & Backend Controllers',
    projectId: 'PRJ-1082',
    project: 'Nexus Enterprise Cloud Portal',
    assignedTo: 'Alexander Tensora',
    assignedToId: 'TDS001',
    status: 'In Progress',
    priority: 'Urgent',
    progress: 75,
    dueDate: '2026-02-28',
    comments: [
      { sender: 'Alexander Tensora', text: 'JWT Auth and database service completed.', time: '2026-02-15 14:00' }
    ]
  },
  {
    id: 'TSK-103',
    title: 'Optimize FiveM Anti-Dupe SQL Transactions',
    projectId: 'PRJ-1044',
    project: 'FiveM Custom Police & NUI Garage Script',
    assignedTo: 'Karan Patel',
    assignedToId: 'TDS002',
    status: 'Completed',
    priority: 'High',
    progress: 100,
    dueDate: '2025-12-01',
    comments: [
      { sender: 'Karan Patel', text: 'Benchmarked with 200 concurrent players.', time: '2025-11-30 20:00' }
    ]
  }
];

export const initialInvoices = [
  {
    id: 'INV-2026-041',
    invoiceNumber: 'TDS/2026/0041',
    client: 'Apex Digital Ventures',
    clientId: 'CLT-1001',
    project: 'Nexus Enterprise Cloud Portal',
    projectId: 'PRJ-1082',
    subtotal: 7500,
    taxRate: 18,
    taxAmount: 1350,
    total: 8850,
    paidAmount: 8850,
    status: 'Paid',
    issueDate: '2026-02-01',
    dueDate: '2026-02-15',
    items: [
      { description: 'Sprint 1 & 2 Architectural Setup and Frontend Foundations', quantity: 1, rate: 7500, amount: 7500 }
    ]
  },
  {
    id: 'INV-2026-068',
    invoiceNumber: 'TDS/2026/0068',
    client: 'Apex Digital Ventures',
    clientId: 'CLT-1001',
    project: 'Nexus Enterprise Cloud Portal (Phase 2)',
    projectId: 'PRJ-1082',
    subtotal: 7500,
    taxRate: 18,
    taxAmount: 1350,
    total: 8850,
    paidAmount: 0,
    status: 'Pending',
    issueDate: '2026-02-15',
    dueDate: '2026-03-01',
    items: [
      { description: 'Sprint 3 API Integration and Real-time WebSocket Module', quantity: 1, rate: 7500, amount: 7500 }
    ]
  }
];

export const initialPayments = [
  {
    id: 'PAY-1001',
    transactionId: 'TXN-TDS-98421',
    invoiceId: 'INV-2026-041',
    client: 'Apex Digital Ventures',
    amount: 8850,
    method: 'Bank Wire / NEFT',
    date: '2026-02-02 11:30',
    status: 'Completed'
  }
];

export const initialExpenses = [
  {
    id: 'EXP-101',
    title: 'Cloud Infrastructure & High-CPU Dedicated Server Hosting',
    category: 'Hosting',
    amount: 14500,
    vendor: 'AWS & Hetzner Online',
    date: '2026-02-01',
    status: 'Paid',
    receipt: 'REC-TDS-8812'
  },
  {
    id: 'EXP-102',
    title: 'Enterprise Figma & JetBrains All Products Software Subscriptions',
    category: 'Software',
    amount: 8200,
    vendor: 'Figma / JetBrains',
    date: '2026-02-03',
    status: 'Paid',
    receipt: 'REC-TDS-8813'
  }
];

export const initialInquiries = [
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

export const initialApplications = [
  {
    id: 'APP-1001',
    name: 'Elena Rostova',
    email: 'elena.rostova@example.com',
    phone: '+1 (555) 890-1234',
    jobId: 'JOB-01',
    jobTitle: 'Senior Full Stack React / Node.js Engineer',
    department: 'Web Development',
    portfolio: 'https://github.com/elenarostova-dev',
    resumeLink: 'https://drive.google.com/file/d/elena-cv-2026/view',
    coverNote: 'Over 6 years designing robust distributed web apps, high-throughput microservices, and sleek dark-mode user experiences.',
    status: 'Reviewing',
    appliedAt: new Date(Date.now() - 3600000 * 12).toISOString()
  }
];

export const initialNotifications = [
  {
    id: 'NOTIF-1001',
    title: 'New Client Lead: Robert Thorne',
    message: 'Submitted an inquiry for Web Development ($10,000 - $25,000).',
    time: '5 hours ago',
    read: false,
    type: 'inquiry'
  },
  {
    id: 'NOTIF-1002',
    title: 'Milestone Completed',
    message: 'Sprint 2 Deliverables approved by Apex Digital Ventures.',
    time: '1 day ago',
    read: true,
    type: 'project'
  }
];

export const initialMessages = [
  {
    id: 'CONV-001',
    title: 'Engineering Core Hub',
    participants: ['ADM-001', 'TDS001', 'TDS002'],
    lastMessage: 'All REST API endpoints and data models are synced.',
    lastTime: '10 mins ago',
    chatHistory: [
      {
        id: 'MSG-1',
        senderId: 'ADM-001',
        senderName: 'Tensora Administrator',
        text: 'Welcome to the Tensora Core Operations Hub. Ready to ship the sprint.',
        time: '10:00 AM'
      },
      {
        id: 'MSG-2',
        senderId: 'TDS001',
        senderName: 'Alexander Tensora',
        text: 'Backend and frontend synchronizations completed and tested.',
        time: '10:15 AM'
      }
    ]
  }
];

export const initialAttendance = [
  {
    id: 'ATT-01',
    employeeId: 'TDS001',
    date: new Date().toISOString().split('T')[0],
    checkIn: '09:00 AM',
    checkOut: '—',
    hours: 'In Progress',
    status: 'Present'
  }
];

export const initialLoginSessions = [
  {
    id: 'SES-9001',
    employeeId: 'TDS001',
    employeeName: 'Alexander Tensora',
    department: 'Full Stack Engineering',
    designation: 'Lead Software Architect',
    loginTime: `${new Date().toISOString().split('T')[0]} 09:00:15`,
    loginTimestamp: Date.now() - 3600000 * 2,
    logoutTime: '—',
    duration: 'Active Now',
    ipAddress: '192.168.1.45',
    device: 'Windows 11 / Chrome',
    status: 'Active'
  }
];
