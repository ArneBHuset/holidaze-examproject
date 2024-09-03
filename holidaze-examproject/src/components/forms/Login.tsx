import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormControl from '@mui/material/FormControl';
import { TextField, Button, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import FormCard from '../../layout/FormCard';
import SubTitle from '../titles/SubTitle';
import LoginData from '../../services/interfaces/LoginForm.ts';
import { loginValidationSchema } from './validation/loginValidation';
import { loginApiCall } from '../../services/api/auth/loginApi.ts';

/**
 * React component for login form
 * @param {boolean} setIsRegistering - Boolean to toggle between registration and login
 */
function Login({ setIsRegistering }: { setIsRegistering: React.Dispatch<React.SetStateAction<boolean>> }) {
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
      console.log('Login successful!');
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
              <SubTitle>Email</SubTitle>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    fullWidth
                    type="email"
                    placeholder="anderson@noroff.no"
                    variant="standard"
                    {...field}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Box>
              <SubTitle>Password</SubTitle>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    fullWidth
                    type="password"
                    variant="standard"
                    {...field}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Button onClick={() => setIsRegistering(true)}>Register new profile?</Button>
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
