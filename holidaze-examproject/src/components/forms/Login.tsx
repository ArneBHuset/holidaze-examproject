import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormControl from '@mui/material/FormControl';
import { TextField, Button, Box, alpha } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import DefaultSubTitle from '../titles/SubTitle.tsx';
import LoginData from '../../services/interfaces/LoginForm.ts';
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
function Login({
  setIsRegistering,
  onLoginSuccess,
}: {
  setIsRegistering: React.Dispatch<React.SetStateAction<boolean>>;
  onLoginSuccess: () => void;
}) {
  const navigate = useNavigate();
  const { updateVenueManagerStatus } = useUser();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: yupResolver(loginValidationSchema),
  });

  const onSubmit = async (data: LoginData) => {
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

  return (
    <Card sx={{ backgroundColor:(alpha(theme.palette.background.paper, 0.93))}}>
      <FormControl component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} p={2}>
          <Grid size={{ xs: 12 }}>
            <Box>
              <DefaultSubTitle>Email</DefaultSubTitle>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <DefaultInput>
                    <TextField
                      fullWidth
                      type="email"
                      placeholder="anderson@noroff.no"
                      variant="standard"
                      {...field}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  </DefaultInput>
                )}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Box>
              <DefaultSubTitle>Password</DefaultSubTitle>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <DefaultInput>
                    <TextField
                      fullWidth
                      type="password"
                      placeholder="Password"
                      variant="standard"
                      {...field}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                    />
                  </DefaultInput>
                )}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <SecondaryButton>
              <Button onClick={() => setIsRegistering(false)} fullWidth={true}>
                Register ?
              </Button>
            </SecondaryButton>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <DefaultButton>
              <Button endIcon={<LoginIcon />} type="submit" fullWidth={true}>
                Log in
              </Button>
            </DefaultButton>
          </Grid>
        </Grid>
      </FormControl>
    </Card>
  );
}

export default Login;
