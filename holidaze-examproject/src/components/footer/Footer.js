import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography, IconButton, Container } from '@mui/material';
import { LinkedIn, EmojiPeople, GitHub } from '@mui/icons-material';
import theme from '../../styles/mui-styles/MuiThemes.ts';
function Footer() {
    return (_jsx(Box, { component: "footer", sx: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            backgroundColor: 'primary.light',
            borderTop: `2px solid ${theme.palette.secondary.main}`,
            color: 'white',
            padding: 2,
            mt: 'auto',
        }, children: _jsxs(Container, { maxWidth: "md", sx: { textAlign: 'center' }, children: [_jsxs(Box, { sx: { display: 'flex', justifyContent: 'center', gap: 2 }, children: [_jsx(IconButton, { component: "a", href: "www.linkedin.com/in/arne-bjelde-hustveit-48ab31276", target: "_blank", sx: { color: 'white' }, "aria-label": "LinkedIn", children: _jsx(LinkedIn, {}) }), _jsx(IconButton, { component: "a", href: "https://arnehustveit.myportfolio.com/", target: "_blank", sx: { color: 'white' }, "aria-label": "Portfolio", children: _jsx(EmojiPeople, {}) }), _jsx(IconButton, { component: "a", href: "https://github.com/ArneBHuset", target: "_blank", sx: { color: 'white' }, "aria-label": "Github", children: _jsx(GitHub, {}) })] }), _jsx(Typography, { variant: "h6", sx: { mt: 1 }, children: "\u00A9 2024 Created by Arne Bjelde Hustveit" })] }) }));
}
export default Footer;
