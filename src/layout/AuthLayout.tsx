import { ReactNode } from 'react';
import { Box, Container } from '@mui/material';
import bg1 from '../assets/images/bg1.jpeg';

interface LayoutProps {
  children: ReactNode;
}

function AuthLayout(props: LayoutProps) {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        backgroundImage: `url(${bg1})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'top',
        height: '120vh',
        width: '100%',
      }}
    >
      <Box>
        <Box component="main">{props.children}</Box>
      </Box>
    </Container>
  );
}

export default AuthLayout;
