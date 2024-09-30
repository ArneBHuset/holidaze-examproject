import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormControl from '@mui/material/FormControl';
import { TextField, Button, Box, Checkbox } from '@mui/material';
import Grid from '@mui/material/Grid2';
import MainCard from '../../layout/MainCard.tsx';
import SubTitle from '../titles/SubTitle';
import { registerValidationSchema } from './validation/registerValidation.ts';
import { registrationApiCall } from '../../services/api/auth/RegisterApi.ts';
import DefaultButton from '../../styles/mui-styles/components/defaultBtn.tsx';
import DefaultInput from '../../styles/mui-styles/components/inputs.tsx';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import VillaIcon from '@mui/icons-material/Villa';
import theme from '../../styles/mui-styles/MuiThemes.ts';
import Typography from '@mui/material/Typography';
import SecondaryButton from '../../styles/mui-styles/components/SecondaryBtn.tsx';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
function Register({ setIsRegistering }) {
    const { control, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(registerValidationSchema),
    });
    const onSubmit = async (data) => {
        const processedData = {
            ...data,
            avatar: data.avatar?.url?.trim() ? data.avatar : undefined,
            banner: data.banner?.url?.trim() ? data.banner : undefined,
        };
        await registrationApiCall(processedData, setIsRegistering);
    };
    const customerLabel = { inputProps: { 'aria-label': 'Customer checkbox' } };
    const venueManagerLabel = { inputProps: { 'aria-label': 'Venue manager checkbox' } };
    return (_jsx(MainCard, { children: _jsx(FormControl, { component: "form", onSubmit: handleSubmit(onSubmit), children: _jsxs(Grid, { container: true, spacing: 1, p: 2, children: [_jsx(Box, { width: "100%", children: _jsx(SubTitle, { children: "USER TYPE" }) }), _jsx(Grid, { size: { xs: 12, sm: 6 }, width: "100%", children: _jsxs(Box, { display: "flex", alignItems: "center", children: [_jsx(Controller, { name: "venueManager", control: control, defaultValue: false, render: ({ field }) => (_jsx(Checkbox, { ...customerLabel, checked: field.value === false, onChange: () => field.onChange(false), icon: _jsx(TravelExploreIcon, { sx: { fontSize: 45 } }), checkedIcon: _jsx(TravelExploreIcon, { sx: { fontSize: 45 } }), sx: {
                                            color: theme.palette.primary.light,
                                            '&.Mui-checked': {
                                                color: theme.palette.secondary.main,
                                            },
                                        } })) }), _jsx(Typography, { variant: "subtitle1", children: "CUSTOMER" })] }) }), _jsx(Grid, { size: { xs: 12, sm: 6 }, width: "100%", children: _jsxs(Box, { display: "flex", alignItems: "center", children: [_jsx(Controller, { name: "venueManager", control: control, defaultValue: false, render: ({ field }) => (_jsx(Checkbox, { ...venueManagerLabel, checked: field.value === true, onChange: () => field.onChange(true), icon: _jsx(VillaIcon, { sx: { fontSize: 40 } }), checkedIcon: _jsx(VillaIcon, { sx: { fontSize: 40 } }), sx: {
                                            color: theme.palette.primary.light,
                                            '&.Mui-checked': {
                                                color: theme.palette.secondary.main,
                                            },
                                        } })) }), _jsx(Typography, { variant: "subtitle1", children: "VENUE MANAGER" })] }) }), _jsx(Grid, { size: { xs: 12, sm: 6 }, children: _jsxs(Box, { children: [_jsx(SubTitle, { children: "Name" }), _jsx(Controller, { name: "name", control: control, defaultValue: "", render: ({ field }) => (_jsx(DefaultInput, { children: _jsx(TextField, { fullWidth: true, placeholder: "Mr. Anderson", variant: "standard", ...field, error: !!errors.name, helperText: errors.name?.message }) })) })] }) }), _jsx(Grid, { size: { xs: 12, sm: 6 }, children: _jsxs(Box, { children: [_jsx(SubTitle, { children: "Email" }), _jsx(Controller, { name: "email", control: control, defaultValue: "", render: ({ field }) => (_jsx(DefaultInput, { children: _jsx(TextField, { fullWidth: true, type: "email", placeholder: "anderson@stud.noroff.no", variant: "standard", ...field, error: !!errors.email, helperText: errors.email?.message }) })) })] }) }), _jsx(Grid, { size: { xs: 12 }, children: _jsxs(Box, { children: [_jsx(SubTitle, { children: "Password" }), _jsx(Controller, { name: "password", control: control, defaultValue: "", render: ({ field }) => (_jsx(DefaultInput, { children: _jsx(TextField, { fullWidth: true, type: "password", variant: "standard", ...field, error: !!errors.password, helperText: errors.password?.message }) })) })] }) }), _jsx(Grid, { size: { xs: 12 }, children: _jsxs(Box, { children: [_jsx(SubTitle, { children: "Bio" }), _jsx(Controller, { name: "bio", control: control, defaultValue: "", render: ({ field }) => (_jsx(DefaultInput, { children: _jsx(TextField, { fullWidth: true, multiline: true, rows: 2, placeholder: "Adventurer by heart, love fine dining and...", variant: "standard", ...field, error: !!errors.bio, helperText: errors.bio?.message }) })) })] }) }), _jsx(Grid, { size: { xs: 6 }, children: _jsxs(Box, { children: [_jsx(SubTitle, { children: "Avatar" }), _jsx(Controller, { name: "avatar.url", control: control, render: ({ field }) => (_jsx(DefaultInput, { children: _jsx(TextField, { fullWidth: true, type: "url", placeholder: "image url", variant: "standard", ...field, error: !!errors.avatar?.url, helperText: errors.avatar?.url?.message }) })) })] }) }), _jsx(Grid, { size: { xs: 6 }, children: _jsxs(Box, { children: [_jsx(SubTitle, { children: "Avatar description" }), _jsx(Controller, { name: "avatar.alt", control: control, render: ({ field }) => (_jsx(DefaultInput, { children: _jsx(TextField, { fullWidth: true, type: "text", placeholder: "Me at my 24th birthday", variant: "standard", ...field, error: !!errors.avatar?.alt, helperText: errors.avatar?.alt?.message }) })) })] }) }), _jsx(Grid, { size: { xs: 6 }, children: _jsxs(Box, { children: [_jsx(SubTitle, { children: "Banner picture" }), _jsx(Controller, { name: "banner.url", control: control, render: ({ field }) => (_jsx(DefaultInput, { children: _jsx(TextField, { fullWidth: true, type: "url", placeholder: "image url", variant: "standard", ...field, error: !!errors.banner?.url, helperText: errors.banner?.url?.message }) })) })] }) }), _jsx(Grid, { size: { xs: 6 }, children: _jsxs(Box, { children: [_jsx(SubTitle, { children: "Banner description" }), _jsx(Controller, { name: "banner.alt", control: control, render: ({ field }) => (_jsx(DefaultInput, { children: _jsx(TextField, { fullWidth: true, type: "text", placeholder: "My favorite view", variant: "standard", ...field, error: !!errors.banner?.alt, helperText: errors.banner?.alt?.message }) })) })] }) }), _jsx(Grid, { size: { xs: 6 }, marginTop: 2, children: _jsx(SecondaryButton, { children: _jsx(Button, { onClick: () => setIsRegistering(true), fullWidth: true, children: "Back to Login" }) }) }), _jsx(Grid, { size: { xs: 6 }, marginTop: 2, children: _jsx(DefaultButton, { children: _jsx(Button, { type: "submit", fullWidth: true, endIcon: _jsx(ArrowForwardIosIcon, {}), children: "Submit" }) }) })] }) }) }));
}
export default Register;
