import { ReactNode } from 'react';
import Header from '../components/header/Header.tsx';
import { Box, Container } from '@mui/material';
import Footer from '../components/footer/Footer.tsx';

interface LayoutProps {
  children: ReactNode;
}

function Layout(props: LayoutProps) {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 2,
        }}
      >
        {props.children}
      </Box>
      <Footer />
    </Container>
  );
}

export default Layout;
