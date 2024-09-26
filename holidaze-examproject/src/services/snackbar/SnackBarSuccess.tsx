import { Snackbar, Alert, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

let showSnackBarSuccess: (message: string) => void = () => {};

export default function SnackBarSuccess() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string>('');
  const theme = useTheme();

  useEffect(() => {
    showSnackBarSuccess = (msg: string) => {
      setMessage(msg);
      setOpen(true);
    };
  }, []);

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={handleClose}
        severity="success"
        sx={{
          width: '500px',
          backgroundColor: theme.palette.secondary.light,
          color: theme.palette.background.paper,
          textAlign: 'center',
          pl: { xs: 4, sm: 10 },
          overflow: 'hidden',
        }}
      >
        <Typography
          align="center"
          sx={{
            textDecoration: 'underline',
            fontFamily: theme.typography.subtitle1,
            width: '100%',
            overflow: 'hidden',
          }}
        >
          Success!
        </Typography>
        <Typography variant="h5" align="center" sx={{ width: '100%', overflow: 'hidden' }}>
          {message}
        </Typography>
      </Alert>
    </Snackbar>
  );
}

export function snackBarSuccess(message: string) {
  showSnackBarSuccess(message);
}
