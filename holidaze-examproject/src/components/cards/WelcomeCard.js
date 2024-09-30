import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Typography from '@mui/material/Typography';
import { CardContent, Box, useTheme, alpha } from '@mui/material';
import Card from '@mui/material/Card';
function WelcomeCard() {
    const theme = useTheme();
    return (_jsx(Card, { sx: {
            background: `linear-gradient(to bottom, ${alpha(theme.palette.primary.light, 0.7)} 15%, ${alpha(theme.palette.primary.light, 0.1)} 100%)`,
            width: { xs: '100%', sm: '90%', md: '90%', lg: '70%' },
        }, children: _jsx(CardContent, { sx: { backgroundColor: alpha(theme.palette.primary.light, 0) }, children: _jsxs(Box, { sx: {
                    textAlign: 'left',
                    borderRadius: 2,
                    paddingTop: 2,
                    color: theme.palette.primary.light,
                }, children: [_jsx(Typography, { variant: "h1", sx: {
                            color: theme.palette.secondary.main,
                            fontSize: {
                                xs: theme.typography.h2.fontSize,
                                sm: theme.typography.h3.fontSize,
                                md: theme.typography.h2.fontSize,
                                lg: theme.typography.h1.fontSize,
                            },
                        }, children: "HOLIDAZE" }), _jsx(Typography, { variant: "h4", sx: { color: theme.palette.background.paper }, children: "Your luxurious adventures are only a few clicks aways" })] }) }) }));
}
export default WelcomeCard;
