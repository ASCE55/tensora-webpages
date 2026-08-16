import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { config } from './config/index.js';
import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';

const app = express();

// Middlewares
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman) or matching whitelist
      if (!origin || config.corsOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
        callback(null, true);
      } else {
        callback(null, true); // Permissive in local dev environments
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (config.nodeEnv !== 'test') {
  app.use(morgan('dev'));
}

// API Root Information Endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'TENSORA DIGITAL SOLUTIONS REST API GATEWAY',
    version: '1.0.0',
    status: 'ONLINE',
    documentation: {
      auth: '/api/auth',
      inquiries: '/api/inquiries',
      applications: '/api/applications',
      clients: '/api/clients',
      projects: '/api/projects',
      services: '/api/services',
      employees: '/api/employees',
      tasks: '/api/tasks',
      invoices: '/api/invoices',
      payments: '/api/payments',
      expenses: '/api/expenses',
      messages: '/api/messages',
      notifications: '/api/notifications',
      attendance: '/api/attendance',
      sessions: '/api/sessions',
      analytics: '/api/analytics',
      system: '/api/system'
    },
    clientWebsites: {
      corporateWebsite: 'http://localhost:5173',
      managementDashboard: 'http://localhost:5174'
    },
    serverTime: new Date().toISOString()
  });
});

// Mount Main API Router
app.use('/api', routes);

// 404 & Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
