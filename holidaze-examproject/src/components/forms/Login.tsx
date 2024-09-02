import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import { TextField, Button, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import FormCard from '../../layout/FormCard';
import SubTitle from '../titles/SubTitle';
import LoginData from '../../services/interfaces/LoginForm.ts';
import { loginValidation } from './validation/loginValidation';
import { loginApiCall } from '../../services/api/auth/loginApi.ts';

/**
 * React component for login form
 * @param {boolean} setIsRegistering - booleon to toggle between registration and login
 */
function Login({ setIsRegistering }: { setIsRegistering: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [loginFormData, setLoginFormData] = useState<LoginData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const isValid = loginValidation(loginFormData, errors, setErrors);
    if (isValid) {
      const response = await loginApiCall(loginFormData);

      if (response.success) {
        console.log('Login successful!');
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: response.message || 'Login failed.',
        }));
        console.log('Login failed:', response.message);
      }
    } else {
      console.log('Form validation errors:', errors);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setLoginFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <FormCard>
      <FormControl component="form" onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12 }}>
            <Box>
              <SubTitle>Email</SubTitle>
              <TextField
                fullWidth
                id="email"
                type="email"
                placeholder="anderson@noroff.no"
                variant="standard"
                value={loginFormData.email}
                onChange={handleInputChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Box>
              <SubTitle>Password</SubTitle>
              <TextField
                fullWidth
                id="password"
                type="password"
                variant="standard"
                value={loginFormData.password}
                onChange={handleInputChange}
                error={Boolean(errors.password)}
                helperText={errors.password}
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
