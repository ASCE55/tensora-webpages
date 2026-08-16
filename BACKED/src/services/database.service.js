import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  initialAdmin,
  initialEmployees,
  initialClients,
  initialProjects,
  initialServices,
  initialTasks,
  initialInvoices,
  initialPayments,
  initialExpenses,
  initialInquiries,
  initialApplications,
  initialNotifications,
  initialMessages,
  initialAttendance,
  initialLoginSessions
} from '../data/initialData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');
const DB_FILE = path.resolve(DATA_DIR, 'tds_database.json');

class DatabaseService {
  constructor() {
    this.data = {};
    this.isInitialized = false;
    this.ensureDataDir();
    this.init();
  }

  ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  }

  getDefaultData() {
    return {
      admin: { ...initialAdmin },
      employees: JSON.parse(JSON.stringify(initialEmployees)),
      clients: JSON.parse(JSON.stringify(initialClients)),
      projects: JSON.parse(JSON.stringify(initialProjects)),
      services: JSON.parse(JSON.stringify(initialServices)),
      tasks: JSON.parse(JSON.stringify(initialTasks)),
      invoices: JSON.parse(JSON.stringify(initialInvoices)),
      payments: JSON.parse(JSON.stringify(initialPayments)),
      expenses: JSON.parse(JSON.stringify(initialExpenses)),
      inquiries: JSON.parse(JSON.stringify(initialInquiries)),
      applications: JSON.parse(JSON.stringify(initialApplications)),
      notifications: JSON.parse(JSON.stringify(initialNotifications)),
      messages: JSON.parse(JSON.stringify(initialMessages)),
      attendance: JSON.parse(JSON.stringify(initialAttendance)),
      loginSessions: JSON.parse(JSON.stringify(initialLoginSessions)),
      settings: {
        companyName: 'TENSORA DIGITAL SOLUTIONS PVT LTD',
        companyEmail: 'contact@tensoradigital.com',
        adminEmail: 'admin@tensora.com',
        phone: '+91 99000 11223',
        defaultCurrency: 'INR',
        currencySymbol: '₹',
        defaultTaxRate: 18,
        systemStatus: 'Operational'
      }
    };
  }

  init() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(fileContent);
      } else {
        this.data = this.getDefaultData();
        this.persist();
      }
      this.isInitialized = true;
    } catch (err) {
      console.error('Failed to initialize database, falling back to default seed:', err);
      this.data = this.getDefaultData();
      this.persist();
    }
  }

  persist() {
    try {
      this.ensureDataDir();
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error writing to database file:', err);
    }
  }

  getCollection(collectionName) {
    if (!this.data[collectionName]) {
      this.data[collectionName] = [];
    }
    return this.data[collectionName];
  }

  setCollection(collectionName, items) {
    this.data[collectionName] = items;
    this.persist();
    return this.data[collectionName];
  }

  findById(collectionName, id) {
    const col = this.getCollection(collectionName);
    if (Array.isArray(col)) {
      return col.find((item) => String(item.id).toLowerCase() === String(id).toLowerCase());
    }
    return null;
  }

  find(collectionName, predicate) {
    const col = this.getCollection(collectionName);
    if (Array.isArray(col)) {
      return col.filter(predicate);
    }
    return [];
  }

  findOne(collectionName, predicate) {
    const col = this.getCollection(collectionName);
    if (Array.isArray(col)) {
      return col.find(predicate);
    }
    return null;
  }

  insert(collectionName, item) {
    const col = this.getCollection(collectionName);
    if (Array.isArray(col)) {
      col.unshift(item);
      this.persist();
      return item;
    }
    return null;
  }

  update(collectionName, id, updateData) {
    const col = this.getCollection(collectionName);
    if (Array.isArray(col)) {
      const idx = col.findIndex((item) => String(item.id).toLowerCase() === String(id).toLowerCase());
      if (idx !== -1) {
        col[idx] = { ...col[idx], ...updateData };
        this.persist();
        return col[idx];
      }
    }
    return null;
  }

  delete(collectionName, id) {
    const col = this.getCollection(collectionName);
    if (Array.isArray(col)) {
      const initialLen = col.length;
      this.data[collectionName] = col.filter((item) => String(item.id).toLowerCase() !== String(id).toLowerCase());
      const deleted = this.data[collectionName].length < initialLen;
      if (deleted) {
        this.persist();
      }
      return deleted;
    }
    return false;
  }

  reset() {
    this.data = this.getDefaultData();
    this.persist();
    return this.data;
  }
}

export const db = new DatabaseService();
