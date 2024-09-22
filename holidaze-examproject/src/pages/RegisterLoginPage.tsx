import { Container } from '@mui/material';
import Register from '../components/forms/Register.tsx';
import Login from '../components/forms/Login.tsx';
import { useState } from 'react';
import Box from '@mui/material/Box';
import '../styles/scss/component-specific/_form-carousel.scss';
import WelcomeCard from '../components/cards/WelcomeCard.tsx';

function RegisterLoginPage({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [isRegistering, setIsRegistering] = useState(true);
  return (
    <Container maxWidth="sm">
      <WelcomeCard />
      <Box marginTop={'20px'} className="register-login-container">
        <Box className={`form-box ${isRegistering ? 'show' : ''}`}>
          <Login setIsRegistering={setIsRegistering} onLoginSuccess={onLoginSuccess} />
        </Box>
        <Box className={`form-box ${!isRegistering ? 'show' : ''}`}>
          <Register setIsRegistering={setIsRegistering} />
        </Box>
      </Box>
    </Container>
  );
}

export default RegisterLoginPage;
