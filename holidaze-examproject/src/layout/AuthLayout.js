import { jsx as _jsx } from "react/jsx-runtime";
import { Box, Container } from '@mui/material';
import bg1 from '../assets/images/bg1.jpeg';
function AuthLayout(props) {
    return (_jsx(Container, { maxWidth: false, disableGutters: true, sx: {
            backgroundImage: `url(${bg1})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'repeat',
            backgroundPosition: 'top',
            height: '120vh',
            width: '100%',
        }, children: _jsx(Box, { children: _jsx(Box, { component: "main", children: props.children }) }) }));
}
export default AuthLayout;
