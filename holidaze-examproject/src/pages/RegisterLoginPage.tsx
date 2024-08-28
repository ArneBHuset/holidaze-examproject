import MainLayout from '../layout/MainLayout.tsx';
import { Container } from '@mui/material';
import Register from '../components/forms/Register.tsx';
import {useTheme} from '@mui/material/styles';

function RegisterLoginPage() {
  const theme = useTheme();

  return (
    <Container maxWidth="sm">
    <Register/>
    </Container>
      );
}

export default RegisterLoginPage;
