import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Header from '../components/header/Header.tsx';
import { Box, Container } from '@mui/material';
import Footer from '../components/footer/Footer.tsx';
function Layout(props) {
    return (_jsxs(Container, { maxWidth: false, disableGutters: true, sx: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
        }, children: [_jsx(Header, {}), _jsx(Box, { component: "main", sx: {
                    flexGrow: 1,
                    padding: 2,
                }, children: props.children }), _jsx(Footer, {})] }));
}
export default Layout;
