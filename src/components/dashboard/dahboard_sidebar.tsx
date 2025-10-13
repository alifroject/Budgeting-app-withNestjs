import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useTheme } from '../../contexts/ThemeContext';

interface DashboardSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  isCollapsed,
  onToggle
}) => {
  const location = useLocation();
  const { theme, toggleTheme }: any = useTheme();  

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/transactions', label: 'Transactions', icon: '💳' },
    { path: '/budgets', label: 'Budgets', icon: '🎯' },
  ];

  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-64'} bg-blue-600 text-white h-full flex flex-col transition-all duration-300`}>
      <div className="p-4 border-b border-blue-500 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
            <span className="text-white">💰</span>
          </div>
          {!isCollapsed && (
            <h1 className="font-bold text-xl">BudgetBuddy</h1>
          )}
        </div>

        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-blue-500 transition-colors"
        >
          {isCollapsed ? '➡️' : '⬅️'}
        </button>
      </div>

      <div className="p-4 border-b border-blue-500">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
            <span className="text-white">👤</span>
          </div>
          {!isCollapsed && (
            <div>
              <p className="font-semibold">User Name</p>
              <p className="text-blue-200 text-sm">View Profile</p>
            </div>
          )}
        </div>
        <div className="mt-4 flex items-center justify-between">
          {!isCollapsed && (
            <span className="text-blue-200 text-sm">Dark Mode</span>
          )}

          <button
            onClick={toggleTheme}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${
              theme === 'dark' ? 'bg-blue-400' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transition-transform ${
                theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
              }`}
            ></div>
          </button>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-lg mb-2 transition-colors ${location.pathname === item.path
                ? 'bg-blue-700 text-white'
                : 'text-blue-100 hover:bg-blue-500'
              }`}
            title={isCollapsed ? item.label : ''}
          >
            <span className="text-xl">{item.icon}</span>
            {!isCollapsed && (
              <span className="font-medium">{item.label}</span>
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default DashboardSidebar;
