import MainLayout from '../layout/MainLayout.tsx';
import { Container } from '@mui/material';
import Register from '../components/forms/Register.tsx';
import Login from '../components/forms/Login.tsx';
import { useTheme } from '@mui/material/styles';

function RegisterLoginPage() {
  const theme = useTheme();

  return (
    <Container maxWidth="sm">
      <Register />
      <Login />
    </Container>
  );
}

export default RegisterLoginPage;
