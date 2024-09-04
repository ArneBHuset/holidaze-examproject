import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormControl from '@mui/material/FormControl';
import { TextField, Button, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import FormCard from '../../layout/FormCard';
import DefaultSubTitle from '../titles/SubTitle.tsx';
import LoginData from '../../services/interfaces/LoginForm.ts';
import { loginValidationSchema } from './validation/loginValidation';
import { loginApiCall } from '../../services/api/auth/loginApi.ts';
import DefaultInput from '../../styles/mui-styles/components/inputs.tsx';
import { useTheme} from '@mui/material';
import '../../styles/scss/component-specific/input.scss';



/**
 * React component for login form
 * @param {boolean} setIsRegistering - Boolean to toggle between registration and login
 */
function Login({ setIsRegistering }: { setIsRegistering: React.Dispatch<React.SetStateAction<boolean>> }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: yupResolver(loginValidationSchema),
  });

  const onSubmit = async (data: LoginData) => {
    const response = await loginApiCall(data);
    if (response.success) {
      navigate('/');
      console.error('Login successful, but accessToken is not set!');
    } else {
      console.log('Login failed:', response.message);
    }
  };

  return (
    <FormCard>
      <FormControl component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
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
            <Button onClick={() => setIsRegistering(false)}>Register new profile?</Button>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </FormCard>
  );
}

export default Login;
