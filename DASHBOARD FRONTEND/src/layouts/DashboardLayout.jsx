import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';

export const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => setIsCollapsed(prev => !prev);
  const toggleMobile = () => setIsMobileOpen(prev => !prev);
  const closeMobile = () => setIsMobileOpen(false);

  return (
    <div className="app-layout">
      <Sidebar
        isCollapsed={isCollapsed}
        isMobileOpen={isMobileOpen}
        onCloseMobile={closeMobile}
      />
      <div className={`app-main ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Navbar
          onToggleSidebar={toggleSidebar}
          onToggleMobile={toggleMobile}
        />
        <main className="page-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
