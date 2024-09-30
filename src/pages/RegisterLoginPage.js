import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Container } from '@mui/material';
import Register from '../components/forms/Register.tsx';
import Login from '../components/forms/Login.tsx';
import { useState } from 'react';
import Box from '@mui/material/Box';
import '../styles/scss/component-specific/_form-carousel.scss';
import WelcomeCard from '../components/cards/WelcomeCard.tsx';
import Grid from '@mui/material/Grid2';
function RegisterLoginPage({ onLoginSuccess }) {
  const [isRegistering, setIsRegistering] = useState(true);
  return _jsx(Container, {
    maxWidth: false,
    children: _jsxs(Grid, {
      container: true,
      spacing: 1,
      children: [
        _jsx(Grid, {
          size: { xs: 12, sm: !isRegistering ? 5 : 6 },
          marginTop: { xs: 2, sm: 12 },
          display: 'flex',
          justifyContent: 'right',
          children: _jsx(WelcomeCard, {}),
        }),
        _jsx(Grid, {
          size: { xs: 12, sm: !isRegistering ? 7 : 6 },
          marginTop: { xs: 2, sm: 12 },
          children: _jsxs(Box, {
            className: 'register-login-container',
            children: [
              _jsx(Box, {
                className: `form-box ${isRegistering ? 'show' : ''}`,
                maxWidth: '450px',
                children: _jsx(Login, { setIsRegistering: setIsRegistering, onLoginSuccess: onLoginSuccess }),
              }),
              _jsx(Box, {
                className: `form-box ${!isRegistering ? 'show' : ''}`,
                maxWidth: '700px',
                children: _jsx(Register, { setIsRegistering: setIsRegistering }),
              }),
            ],
          }),
        }),
      ],
    }),
  });
}
export default RegisterLoginPage;
