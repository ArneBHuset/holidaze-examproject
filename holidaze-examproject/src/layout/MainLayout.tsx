import Header from '../components/header/Header.tsx';
import { Container } from '@mui/material';

function MainLayout() {
  return (
    <Container maxWidth={false} style={{ margin: 0, padding: 0 }}>
      <Header />
    </Container>
  );
}

export default MainLayout;
