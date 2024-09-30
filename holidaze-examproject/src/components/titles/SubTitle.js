import { jsx as _jsx } from "react/jsx-runtime";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
function DefaultSubTitle(props) {
    const theme = useTheme();
    return (_jsx(Box, { sx: { borderBottom: 1, borderColor: theme.palette.primary.main, paddingY: 0 }, children: _jsx(Typography, { variant: "subtitle1", textTransform: "uppercase", children: props.children }) }));
}
export default DefaultSubTitle;
