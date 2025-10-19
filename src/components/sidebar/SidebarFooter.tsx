import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DarkModeIcon from '@mui/icons-material/DarkMode';

interface SidebarFooterProps {
  isCollapsed: boolean;
  isMobile?: boolean;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onLogout: () => void;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ isCollapsed, isMobile, theme, toggleTheme, onLogout }) => {
  return (
    <Box sx={{ p: 2, mt: 'auto', display: 'flex', flexDirection: 'column', gap: 1 }}>
      <IconButton
        onClick={toggleTheme}
        sx={{
          bgcolor: theme === 'dark' ? 'grey.700' : 'grey.300',
          transition: '0.3s',
          color: theme === 'dark' ? 'yellow' : 'black',
          mb: 1,
        }}
      >
        {theme === 'dark' ? <Brightness7Icon /> : <DarkModeIcon />}
      </IconButton>

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
        onClick={onLogout}
      >
        {!isCollapsed || isMobile ? 'Logout' : ''}
      </Button>
    </Box>
  );
};

export default SidebarFooter;
