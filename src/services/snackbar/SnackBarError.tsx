import { Snackbar, Alert, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

let showSnackBar: (message: string) => void = () => {};

export default function SnackBarError() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string>('');
  const theme = useTheme();

  useEffect(() => {
    showSnackBar = (msg: string) => {
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
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={handleClose}
        severity="error"
        sx={{
          width: '400px',
          backgroundColor: theme.palette.error.main,
          color: theme.palette.background.paper,
        }}
      >
        <Typography align="center" sx={{ textDecoration: 'underline', fontFamily: theme.typography.subtitle1 }}>
          There seems to be an issue!
        </Typography>
        <Typography variant="body1" align="center" sx={{ width: '100%' }}>
          {message}
        </Typography>
      </Alert>
    </Snackbar>
  );
}

export function snackBarError(message: string) {
  showSnackBar(message);
}
