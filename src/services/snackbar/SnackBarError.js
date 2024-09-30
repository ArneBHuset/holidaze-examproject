import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Snackbar, Alert, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
let showSnackBar = () => {};
export default function SnackBarError() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const theme = useTheme();
  useEffect(() => {
    showSnackBar = (msg) => {
      setMessage(msg);
      setOpen(true);
    };
  }, []);
  const handleClose = (_event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return _jsx(Snackbar, {
    open: open,
    autoHideDuration: 5000,
    onClose: handleClose,
    anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
    children: _jsxs(Alert, {
      onClose: handleClose,
      severity: 'error',
      sx: {
        width: '400px',
        backgroundColor: theme.palette.error.main,
        color: theme.palette.background.paper,
      },
      children: [
        _jsx(Typography, {
          align: 'center',
          sx: { textDecoration: 'underline', fontFamily: theme.typography.subtitle1 },
          children: 'There seems to be an issue!',
        }),
        _jsx(Typography, { variant: 'body1', align: 'center', sx: { width: '100%' }, children: message }),
      ],
    }),
  });
}
export function snackBarError(message) {
  showSnackBar(message);
}
