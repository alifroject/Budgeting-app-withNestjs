import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface SidebarHeaderProps {
  isCollapsed: boolean;
  onToggle: () => void;
  isMobile?: boolean;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ isCollapsed, onToggle, isMobile }) => {
  return (
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
  );
};

export default SidebarHeader;
