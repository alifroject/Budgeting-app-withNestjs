import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PieChartIcon from '@mui/icons-material/PieChart';
import PeopleIcon from '@mui/icons-material/People';

interface MenuItem {
  path: string;
  label: string;
}

interface SidebarMenuProps {
  menuItems: MenuItem[];
  isCollapsed: boolean;
  isMobile?: boolean;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ menuItems, isCollapsed, isMobile }) => {
  const location = useLocation();

  return (
    <Box sx={{ flex: 1, p: 2 }}>
      {menuItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px',
            borderRadius: 8,
            marginBottom: 8,
            textDecoration: 'none',
            color: 'white',
            backgroundColor: location.pathname === item.path ? '#1565c0' : 'transparent',
            transition: 'background-color 0.3s',
            justifyContent: isCollapsed && !isMobile ? 'center' : 'flex-start',
          }}
        >
          {isCollapsed && !isMobile ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {item.label === 'Dashboard' && <DashboardIcon />}
              {item.label === 'Transactions' && <MonetizationOnIcon />}
              {item.label === 'Budgets' && <PieChartIcon />}
              {item.label === 'Users' && <PeopleIcon />}
            </Box>
          ) : (
            <Typography>{item.label}</Typography>
          )}
        </Link>
      ))}
    </Box>
  );
};

export default SidebarMenu;
