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

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
    >
      <Typography variant="h3" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        The page you're looking for doesn't exist.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleRedirect}>
        {accessToken ? 'Go to Home' : 'Go to Login'}
      </Button>
    </Box>
  );
}

export default NotFoundPage;
