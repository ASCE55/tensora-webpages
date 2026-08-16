# TENSORA DIGITAL SOLUTIONS PVT LTD
## Futuristic Enterprise Company Management & Operations Dashboard

A production-quality, responsive Company Management Dashboard Web Application built for **TENSORA DIGITAL SOLUTIONS PVT LTD**.

---

### 🎨 Visual Theme & Palette
* **Theme**: Deep Black + Metallic Silver + Electric Blue
* **Deep Black**: `#050505`
* **Main Background**: `#080A0D`
* **Secondary Background**: `#0D1117`
* **Card Background**: `#11161D`
* **Elevated Card**: `#161C24`
* **Metallic Silver**: `#C9CED6`
* **Bright Silver**: `#F2F4F7`
* **Electric Blue**: `#0057FF`
* **Bright Blue**: `#006BFF`
* **Neon Blue Highlight**: `#00A8FF`
* **Border Accent**: `rgba(0, 102, 255, 0.22)`
* **Subtle Blue Glow**: `rgba(0, 102, 255, 0.35)`

---

### 🔐 Dual Authentication System & Demo Credentials

| Role | Access URL | Credentials | Capabilities |
| :--- | :--- | :--- | :--- |
| **Admin** | `/login` (Admin Tab) | **Email**: `admin@tensora.com`<br>**Password**: `admin123` | Full enterprise control, financials, client dossier, employee management, project budgets, tax invoices, OPEX expenses, CSV reports, reset demo data. |
| **Employee / User** | `/login` (User Tab) | **Employee ID**: `TDS001`<br>**Password**: `user123` | Personal workspace, assigned sprint projects, Kanban tasks, progress slider updates, shift punch clock in/out, team messaging. |

---

### 🚀 Core Modules & Features

1. **Futuristic Login Portal**:
   - Tabbed role switcher (Admin vs Employee).
   - Radial glows, grid mesh overlays, password visibility toggle, session persistence.

2. **Admin Executive Dashboard**:
   - 8 live KPI cards with percentage trends (Clients, Active Projects, Monthly Revenue ₹8,45,000, Pending Receivables, Employees, Monthly OPEX, Net Profit ₹5,60,000, Pending Tasks).
   - Interactive Chart.js Revenue Overview with 7D / 30D / 6M / 1Y time-slice filters.
   - Doughnut chart for project pipeline distribution.
   - Recent projects table and right-side activity audit log.

3. **Client Management (CRM)**:
   - Full CRUD operations with instant search, filtering by status, and sorting.
   - Detailed Client Dossier Modal showing associated deliverables, billings, and payment history.

4. **Project Management (ERP)**:
   - Project lifecycle tracking across 6 statuses (Planning, In Progress, Review, Completed, On Hold, Cancelled).
   - Assign technical leads, set deadlines, budgets, and priority levels.

5. **Services & Core Capabilities**:
   - The 6 Tensora service pillars: Web Development, App Development, Game Script Development, Graphic Design, 3D Modelling, Professional Photo & Video Editing.

6. **Employee & Human Resources**:
   - Complete employee profiles with technical skills, departments, performance ratings, and salary records.

7. **Agile Sprint Tasks (Kanban)**:
   - 4-column agile board (TO DO, IN PROGRESS, REVIEW, COMPLETED).
   - Status transitions, milestone progress sliders, and threaded technical discussion logs.

8. **Tax Invoices & Billing**:
   - 18% GST automated calculations, discount handlers, and status tracking (Paid, Pending, Partially Paid, Overdue).
   - **Printable / PDF-Ready Tensora Branded Tax Invoice Document** with company details, banking information, and QR code identifiers.

9. **Payment Operations & Treasury**:
   - Inbound transaction logs (UPI, Bank Wire / NEFT / IMPS, Card, Cash).
   - Currency formatting in Indian Rupee (₹).

10. **OPEX & Expense Tracking**:
    - Categorized expenses (Hosting, Software, Hardware, Marketing, Office, Miscellaneous).
    - Category share breakdown charts.

11. **Executive Intelligence & Reports**:
    - Multi-domain audit reports with date range filtering.
    - One-click **CSV Data Export** and **Print / PDF** generation.

12. **Employee Workspace**:
    - Direct access to assigned projects and tasks.
    - Shift Attendance tracker with real-time digital clock, Punch In/Out, and monthly ledger.

13. **Global Search**:
    - Instant keyboard-accessible (`Ctrl+K` / `⌘K`) universal search across clients, projects, tasks, employees, services, and invoices.

14. **Settings & Factory Reset**:
    - Legal company configuration, default currency, GST rates.
    - **Reset Demo Data** button to restore initial factory records at any time.

---

### 🛠️ Technology Stack
- **Frontend Framework**: React 18 + Vite
- **UI Components & Styling**: Bootstrap 5 + React-Bootstrap + Bootstrap Icons + Custom Cybernetic CSS
- **Visualization**: Chart.js + react-chartjs-2
- **Routing**: React Router DOM v6 (with ProtectedRoute & RoleProtectedRoute)
- **Forms & Alerts**: React Hook Form, React Toastify
- **API Client**: Axios (configured with JWT authorization interceptors)
- **State & Storage**: React Context API (`AuthContext`, `ThemeContext`, `DataContext`) + `localStorage` persistence

---

### 💻 Development & Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Build production bundle
npm run build
```
