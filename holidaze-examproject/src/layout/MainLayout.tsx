import { ReactNode } from 'react';
import Header from '../components/header/Header.tsx';
import { Box, Container } from '@mui/material';

interface LayoutProps {
  children: ReactNode;
}

function Layout(props: LayoutProps) {
  return (
    <Container maxWidth={false} disableGutters>
      <Box>
        <Header />
        <Box component="main">{props.children}</Box>
      </Box>
    </Container>
  );
}

export default Layout;
