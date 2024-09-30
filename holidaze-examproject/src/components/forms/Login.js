import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormControl from '@mui/material/FormControl';
import { TextField, Button, Box, alpha } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import DefaultSubTitle from '../titles/SubTitle.tsx';
import { loginValidationSchema } from './validation/loginValidation';
import { loginApiCall } from '../../services/api/auth/loginApi.ts';
import DefaultInput from '../../styles/mui-styles/components/inputs.tsx';
import LoginIcon from '@mui/icons-material/Login';
import '../../styles/scss/component-specific/input.scss';
import DefaultButton from '../../styles/mui-styles/components/defaultBtn.tsx';
import { useUser } from '../../services/utilities/UserTypeContext.tsx';
import Card from '@mui/material/Card';
import theme from '../../styles/mui-styles/MuiThemes.ts';
import SecondaryButton from '../../styles/mui-styles/components/SecondaryBtn.tsx';
/**
 * React component for login form
 * @param {boolean} setIsRegistering - Boolean to toggle between registration and login
 * @param onLoginSuccess Parameter called to trigger checkAuthStatus, ensuring authentication and navigation to landing page
 */
function Login({ setIsRegistering, onLoginSuccess }) {
  const navigate = useNavigate();
  const { updateVenueManagerStatus } = useUser();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
  });
  const onSubmit = async (data) => {
    const response = await loginApiCall(data, updateVenueManagerStatus);
    if (response.success) {
      onLoginSuccess();
      const profileData = JSON.parse(localStorage.getItem('profileData') || '{}');
      if (profileData.venueManager) {
        navigate('/manage-venue');
      } else {
        navigate('/');
      }
    }
  };
  return _jsx(Card, {
    sx: { backgroundColor: alpha(theme.palette.background.paper, 0.93) },
    children: _jsx(FormControl, {
      component: 'form',
      onSubmit: handleSubmit(onSubmit),
      children: _jsxs(Grid, {
        container: true,
        spacing: 2,
        p: 2,
        children: [
          _jsx(Grid, {
            size: { xs: 12 },
            children: _jsxs(Box, {
              children: [
                _jsx(DefaultSubTitle, { children: 'Email' }),
                _jsx(Controller, {
                  name: 'email',
                  control: control,
                  defaultValue: '',
                  render: ({ field }) =>
                    _jsx(DefaultInput, {
                      children: _jsx(TextField, {
                        fullWidth: true,
                        type: 'email',
                        placeholder: 'anderson@noroff.no',
                        variant: 'standard',
                        ...field,
                        error: !!errors.email,
                        helperText: errors.email?.message,
                      }),
                    }),
                }),
              ],
            }),
          }),
          _jsx(Grid, {
            size: { xs: 12 },
            children: _jsxs(Box, {
              children: [
                _jsx(DefaultSubTitle, { children: 'Password' }),
                _jsx(Controller, {
                  name: 'password',
                  control: control,
                  defaultValue: '',
                  render: ({ field }) =>
                    _jsx(DefaultInput, {
                      children: _jsx(TextField, {
                        fullWidth: true,
                        type: 'password',
                        placeholder: 'Password',
                        variant: 'standard',
                        ...field,
                        error: !!errors.password,
                        helperText: errors.password?.message,
                      }),
                    }),
                }),
              ],
            }),
          }),
          _jsx(Grid, {
            size: { xs: 6 },
            children: _jsx(SecondaryButton, {
              children: _jsx(Button, {
                onClick: () => setIsRegistering(false),
                fullWidth: true,
                children: 'Register ?',
              }),
            }),
          }),
          _jsx(Grid, {
            size: { xs: 6 },
            children: _jsx(DefaultButton, {
              children: _jsx(Button, {
                endIcon: _jsx(LoginIcon, {}),
                type: 'submit',
                fullWidth: true,
                children: 'Log in',
              }),
            }),
          }),
        ],
      }),
    }),
  });
}
export default Login;
