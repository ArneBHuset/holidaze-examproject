import { jsx as _jsx } from "react/jsx-runtime";
import { Container } from '@mui/material';
import MainCard from '../layout/MainCard.tsx';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
function AboutPage() {
    return (_jsx(Container, { maxWidth: "sm", sx: { my: 2 }, children: _jsx(MainCard, { children: _jsx(CardContent, { children: _jsx(Grid, { container: true, children: _jsx(Grid, { size: 12, children: _jsx(Typography, { component: "h1", variant: "h5", textAlign: "center", children: "WELCOME TO HOLIDAZE" }) }) }) }) }) }));
}
export default AboutPage;
