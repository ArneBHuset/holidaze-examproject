import { ReactNode } from 'react';
import Header from '../components/header/Header.tsx';
import { Box, Container } from '@mui/material';
import theme from '../styles/mui-styles/MuiThemes.ts';

interface LayoutProps {
  children: ReactNode;
}

function Layout(props: LayoutProps) {
  return (
    <Container  maxWidth={false} disableGutters sx={{backgroundColor:theme.palette.primary.light}}>
      <Box>
        <Header />
        <Box component="main">{props.children}</Box>
      </Box>
    </Container>
  );
}

export default Layout;
