import { ReactNode } from 'react';
import { Box, Container } from '@mui/material';
import bg1 from '../assets/images/bg1.jpeg';

interface LayoutProps {
  children: ReactNode;
}

function authLayout(props: LayoutProps) {
  return (
    <Container maxWidth={false} disableGutters sx={{backgroundImage: `url(${bg1})`, height:'100vh',
   }}>

      <Box>
        <Box component="main">{props.children}</Box>
      </Box>
    </Container>
  );
}

export default authLayout;
