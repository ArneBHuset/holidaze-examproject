import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';
function NotFoundPage() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const handleRedirect = () => {
    if (accessToken) {
      navigate('/');
    } else {
      navigate('/auth');
    }
  };
  return _jsxs(Box, {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    children: [
      _jsx(Typography, { variant: 'h3', gutterBottom: true, children: '404 - Page Not Found' }),
      _jsx(Typography, {
        variant: 'body1',
        gutterBottom: true,
        children: "The page you're looking for doesn't exist.",
      }),
      _jsx(Button, {
        variant: 'contained',
        color: 'primary',
        onClick: handleRedirect,
        children: accessToken ? 'Go to Home' : 'Go to Login',
      }),
    ],
  });
}
export default NotFoundPage;
