import { Container } from '@mui/material';
import Register from '../components/forms/Register.tsx';
import Login from '../components/forms/Login.tsx';
import { useState } from 'react';
import Box from '@mui/material/Box';
import '../styles/scss/component-specific/_form-carousel.scss';
import WelcomeCard from '../components/cards/WelcomeCard.tsx';
import Grid from '@mui/material/Grid2';

function RegisterLoginPage({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [isRegistering, setIsRegistering] = useState(true);
  return (
    <Container maxWidth={false}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, sm: !isRegistering ? 5 : 6 }} marginTop={{ xs: 2, sm: 12 }}>
          <WelcomeCard />
        </Grid>
        <Grid size={{ xs: 12, sm: !isRegistering ? 7 : 6 }} marginTop={{ xs: 2, sm: 12 }}>
          <Box className="register-login-container">
            <Box className={`form-box ${isRegistering ? 'show' : ''}`} maxWidth="450px">
              <Login setIsRegistering={setIsRegistering} onLoginSuccess={onLoginSuccess} />
            </Box>
            <Box className={`form-box ${!isRegistering ? 'show' : ''}`} maxWidth="700px">
              <Register setIsRegistering={setIsRegistering} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default RegisterLoginPage;
