import MainLayout from '../layout/MainLayout.tsx';
import { Container } from '@mui/material';
import Register from '../components/forms/Register.tsx';
import Login from '../components/forms/Login.tsx';
import {useState} from 'react';
import Box from '@mui/material/Box';
import '../styles/scss/component-specific/_form-carousel.scss'


function RegisterLoginPage() {
  const [isRegistering, setIsRegistering] = useState(true);
  console.log(isRegistering);
  return (
    <Container maxWidth="sm">
      <Box className="register-login-container">
        <Box className={`form-box ${isRegistering ? 'show' : ''}`}>
          <Register setIsRegistering={setIsRegistering} />
        </Box>
        <Box className={`form-box ${!isRegistering ? 'show' : ''}`}>
          <Login setIsRegistering={setIsRegistering} />
        </Box>
      </Box>
    </Container>
  );
}

export default RegisterLoginPage;
