import React, { useState } from 'react';
import DashboardSidebar from '../components/dashboard/dahboard_sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar 
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;