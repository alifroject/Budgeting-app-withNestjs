import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMe, logoutUser } from '../../features/authSlice';
import { RootState, AppDispatch } from '../../store/store';
import { useTheme } from '../../contexts/ThemeContext';
import Box from '@mui/material/Box';

import SidebarHeader from './SidebarHeader';
import SidebarMenu from './SidebarMenu';
import SidebarFooter from './SidebarFooter';

interface DashboardSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  isMobile?: boolean;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isCollapsed, onToggle, isMobile }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  const menuItems = React.useMemo(() => {
    if (!user) return [];
    if (user.role === 'admin') return [{ path: '/users', label: 'Users' }];
    return [
      { path: '/dashboard', label: 'Dashboard' },
      { path: '/transactions', label: 'Transactions' },
      { path: '/budgets', label: 'Budgets' },
    ];
  }, [user]);

  return (
    <Box
      sx={{
        width: isCollapsed ? 80 : 250,
        bgcolor: 'primary.main',
        color: 'white',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s ease, left 0.3s ease',
        position: isMobile ? 'absolute' : 'relative',
        zIndex: 1000,
        left: isMobile && !isCollapsed ? 0 : isMobile ? '-100%' : 0,
      }}
    >
      <SidebarHeader isCollapsed={isCollapsed} onToggle={onToggle} isMobile={isMobile} />
      <SidebarMenu menuItems={menuItems} isCollapsed={isCollapsed} isMobile={isMobile} />
      <SidebarFooter
        isCollapsed={isCollapsed}
        isMobile={isMobile}
        theme={theme}
        toggleTheme={toggleTheme}
        onLogout={() => dispatch(logoutUser())}
      />
    </Box>
  );
};

export default DashboardSidebar;
