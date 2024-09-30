import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Snackbar, Alert, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
let showSnackBarSuccess = () => { };
export default function SnackBarSuccess() {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const theme = useTheme();
    useEffect(() => {
        showSnackBarSuccess = (msg) => {
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
    return (_jsx(Snackbar, { open: open, autoHideDuration: 6000, onClose: handleClose, anchorOrigin: { vertical: 'bottom', horizontal: 'center' }, children: _jsxs(Alert, { onClose: handleClose, severity: "success", sx: {
                width: '500px',
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.background.paper,
                textAlign: 'center',
                pl: { xs: 4, sm: 10 },
                overflow: 'hidden',
            }, children: [_jsx(Typography, { align: "center", sx: {
                        textDecoration: 'underline',
                        fontFamily: theme.typography.subtitle1,
                        width: '100%',
                        overflow: 'hidden',
                    }, children: "Success!" }), _jsx(Typography, { variant: "h5", align: "center", sx: { width: '100%', overflow: 'hidden' }, children: message })] }) }));
}
export function snackBarSuccess(message) {
    showSnackBarSuccess(message);
}
