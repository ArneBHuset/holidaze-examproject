import React from 'react';
import Paper from '@mui/material/Paper';
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
        backgroundColor: theme.palette.secondary.main,
        display: 'flex',
        justifyContent: 'center',
      }}
      elevation={3}
    >
      {children}
    </Paper>
  );
};

export default DefaultBottomNavigation;
