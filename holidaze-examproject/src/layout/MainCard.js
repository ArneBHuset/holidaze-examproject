import { jsx as _jsx } from "react/jsx-runtime";
import { alpha, Card, CardContent } from '@mui/material';
import { useTheme } from '@mui/material/styles';
function MainCard(props) {
    const theme = useTheme();
    return (_jsx(Card, { sx: {
            backgroundColor: alpha(theme.palette.background.paper, 0.9),
            boxShadow: '3px 3px 15px rgba(73, 190, 248, 0.25)',
        }, children: _jsx(CardContent, { sx: { padding: 0 }, children: props.children }) }));
}
export default MainCard;
