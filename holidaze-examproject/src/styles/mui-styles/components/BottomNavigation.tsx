import React from 'react';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import { useTheme } from '@mui/material/styles';

interface ReusableBottomNavigationProps {
  children: React.ReactNode;
}

const DefaultBottomNavigation: React.FC<ReusableBottomNavigationProps> = ({ children }) => {
  const theme = useTheme();
  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        maxWidth: 'md',
        zIndex: 100,
        width: { xs: '100%', md: '66vw !important' },
        backgroundColor: 'none',
        display: 'flex',
        justifyContent: 'center',
      }}
      elevation={3}
    >
      <BottomNavigation
        sx={{
          backgroundColor: theme.palette.secondary.main,
          width: '100%',
          borderTopLeftRadius: '6px',
          borderTopRightRadius: '6px',
        }}
      >
        {children}
      </BottomNavigation>
    </Paper>
  );
};

export default DefaultBottomNavigation;
