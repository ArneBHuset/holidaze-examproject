import { ReactNode } from 'react';
import { Box, Container } from '@mui/material';

interface LayoutProps {
  children: ReactNode;
}

function authLayout(props: LayoutProps) {
  return (
    <Container maxWidth={false} disableGutters>
      <Box>
        <Box component="main">{props.children}</Box>
      </Box>
    </Container>
  );
}

export default authLayout;
