import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormControl from '@mui/material/FormControl';
import { TextField, Button, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import FormCard from '../../layout/FormCard';
import SubTitle from '../titles/SubTitle';
import { MaterialUISwitch } from '../../styles/mui-styles/components/MuiSwitch';
import RegistrationData from '../../services/interfaces/registrationForm.ts';
import { registerValidationSchema } from './validation/registerValidation.ts';
import { registrationApiCall } from '../../services/api/auth/RegisterApi.ts';

/**
 * React component for registration form
 * @param {boolean} setIsRegistering - Boolean to toggle between registration and login
 */
function Register({ setIsRegistering }: { setIsRegistering: React.Dispatch<React.SetStateAction<boolean>> }) {
  // Use useForm hook with Yup validation
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationData>({
    resolver: yupResolver(registerValidationSchema),
  });

  const onSubmit = async (data: RegistrationData) => {
    try {
      const response = await registrationApiCall(data);
      console.log('Registration successful:', response);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <FormCard>
      <FormControl component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12 }}>
            <Box width="100%">
              <Controller
                name="venueManager"
                control={control}
                defaultValue={false}
                render={({ field }) => <MaterialUISwitch checked={field.value} onChange={field.onChange} />}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Box>
              <SubTitle>Name</SubTitle>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    fullWidth
                    placeholder="Mr. Anderson"
                    variant="standard"
                    {...field}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Box>
          </Grid>
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
          <Grid size={{ xs: 12 }}>
            <Box>
              <SubTitle>Bio</SubTitle>
              <Controller
                name="bio"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="Adventurer by heart, and..."
                    variant="standard"
                    {...field}
                    error={!!errors.bio}
                    helperText={errors.bio?.message}
                  />
                )}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Box>
              <SubTitle>Profile picture</SubTitle>
              <Controller
                name="avatar.url"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    fullWidth
                    type="url"
                    placeholder="Profile picture URL"
                    variant="standard"
                    {...field}
                    error={!!errors.avatar?.url}
                    helperText={errors.avatar?.url?.message}
                  />
                )}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Box>
              <SubTitle>Profile Picture Alt Text</SubTitle>
              <Controller
                name="avatar.alt"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    fullWidth
                    type="text"
                    placeholder="Me at my 24th birthday"
                    variant="standard"
                    {...field}
                    error={!!errors.avatar?.alt}
                    helperText={errors.avatar?.alt?.message}
                  />
                )}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Box>
              <SubTitle>Banner picture</SubTitle>
              <Controller
                name="banner.url"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    fullWidth
                    type="url"
                    placeholder="Banner picture URL"
                    variant="standard"
                    {...field}
                    error={!!errors.banner?.url}
                    helperText={errors.banner?.url?.message}
                  />
                )}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Box>
              <SubTitle>Banner Picture Alt Text</SubTitle>
              <Controller
                name="banner.alt"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    fullWidth
                    type="text"
                    placeholder="My favorite view"
                    variant="standard"
                    {...field}
                    error={!!errors.banner?.alt}
                    helperText={errors.banner?.alt?.message}
                  />
                )}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Button variant="contained" onClick={() => setIsRegistering(false)}>
              Already signed up? Login instead
            </Button>
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

export default Register;
