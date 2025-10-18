import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMe, logoutUser } from '../../features/authSlice';
import { RootState, AppDispatch } from '../../store/store';
import { useTheme } from '../../contexts/ThemeContext';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PieChartIcon from '@mui/icons-material/PieChart';
import PeopleIcon from '@mui/icons-material/People';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


interface DashboardSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  isMobile?: boolean;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isCollapsed, onToggle, isMobile }) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

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

      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ display: isCollapsed && !isMobile ? 'none' : 'block' }}>
          BudgetBuddy
        </Typography>

        <Button onClick={onToggle} sx={{ color: 'white', minWidth: 0 }}>
          {isMobile
            ? '' // below md, we do not show an icon for collapsing
            : isCollapsed
              ? <ChevronRightIcon />
              : <ChevronLeftIcon />
          }
        </Button>


      </Box>


      <Box sx={{ p: 2, display: 'flex', justifyContent: isCollapsed && !isMobile ? 'center' : 'flex-start' }}>
        <IconButton
          onClick={toggleTheme}
          sx={{
            bgcolor: theme === 'dark' ? 'grey.700' : 'grey.300',
            transition: '0.3s',
            color: theme === 'dark' ? 'yellow' : 'black',
          }}
        >
          {theme === 'dark' ? <Brightness7Icon /> : <DarkModeIcon />}
        </IconButton>
      </Box>

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


      <Divider sx={{ bgcolor: 'primary.light' }} />

      {/* Bottom Buttons */}
      <Box sx={{ p: 2, mt: 'auto', display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Button
          startIcon={<SettingsIcon />}
          sx={{
            justifyContent: isCollapsed && !isMobile ? 'center' : 'flex-start',
            color: 'white',
            textTransform: 'none',
          }}
        >
          {!isCollapsed || isMobile ? 'Settings' : ''}
        </Button>

        <Button
          startIcon={<LogoutIcon />}
          sx={{
            justifyContent: isCollapsed && !isMobile ? 'center' : 'flex-start',
            color: 'red',
            textTransform: 'none',
          }}
          onClick={() => dispatch(logoutUser())}
        >
          {!isCollapsed || isMobile ? 'Logout' : ''}
        </Button>
      </Box>
    </Box>
  );
};

export default DashboardSidebar;
