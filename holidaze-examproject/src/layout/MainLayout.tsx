import Header from '../components/header/Header.tsx';
import { Container, Box } from '@mui/material';

function MainLayout() {
  return (
    <Container maxWidth={false} style={{ margin: 0, padding: 0 }}>
      <Header />
      <Box component="main">{children}</Box>
    </Container>
  );
}import React, { ReactNode } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { Box, Container } from "@mui/material";

interface LayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container maxWidth={false} disableGutters>
      <Box>
        <Header />
        <Box component="main">{children}</Box>
      </Box>
    </Container>
  );
};

export default MainLayout;
