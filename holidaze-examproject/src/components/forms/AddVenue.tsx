import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormControl from '@mui/material/FormControl';
import { TextField, Button, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import MainCard from '../../layout/MainCard.tsx';
import SubTitle from '../titles/SubTitle';
import { MaterialUISwitch } from '../../styles/mui-styles/components/MuiSwitch';
import RegistrationData from '../../services/interfaces/registrationForm.ts';
import { registerValidationSchema } from './validation/registerValidation.ts';
import { registrationApiCall } from '../../services/api/auth/RegisterApi.ts';
import DefaultButton from '../../styles/mui-styles/components/defaultBtn.tsx';
import DefaultInput from '../../styles/mui-styles/components/inputs.tsx';

function AddVenue() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationData>({
    resolver: yupResolver<RegistrationData>(registerValidationSchema),
  });
  const onSubmit = async (data: RegistrationData) => {
    const processedData: RegistrationData = {
      ...data,
      avatar: data.avatar?.url?.trim() ? data.avatar : undefined,
      banner: data.banner?.url?.trim() ? data.banner : undefined,
    };

    console.log('Processed Registration Data:', processedData);
    await registrationApiCall(processedData, setIsRegistering);
  };

  return (
    <MainCard>
      <FormControl component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12 }}>
            <Box>
              <SubTitle>Name</SubTitle>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <DefaultInput>
                    <TextField
                      fullWidth
                      placeholder="Villa exelence"
                      variant="standard"
                      {...field}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  </DefaultInput>
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
              <SubTitle>Password</SubTitle>
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

          <Grid size={{ xs: 12 }}>
            <Box>
              <SubTitle>Bio</SubTitle>
              <Controller
                name="bio"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <DefaultInput>
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
                  </DefaultInput>
                )}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Box>
              <SubTitle>Avatar picture</SubTitle>
              <Controller
                name="avatar.url"
                control={control}
                render={({ field }) => (
                  <DefaultInput>
                    <TextField
                      fullWidth
                      type="url"
                      placeholder="Profile picture URL"
                      variant="standard"
                      {...field}
                      error={!!errors.avatar?.url}
                      helperText={errors.avatar?.url?.message}
                    />
                  </DefaultInput>
                )}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Box>
              <SubTitle>Avatar description</SubTitle>
              <Controller
                name="avatar.alt"
                control={control}
                render={({ field }) => (
                  <DefaultInput>
                    <TextField
                      fullWidth
                      type="text"
                      placeholder="Me at my 24th birthday"
                      variant="standard"
                      {...field}
                      error={!!errors.avatar?.alt}
                      helperText={errors.avatar?.alt?.message}
                    />
                  </DefaultInput>
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
                render={({ field }) => (
                  <DefaultInput>
                    <TextField
                      fullWidth
                      type="url"
                      placeholder="Banner picture URL"
                      variant="standard"
                      {...field}
                      error={!!errors.banner?.url}
                      helperText={errors.banner?.url?.message}
                    />
                  </DefaultInput>
                )}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Box>
              <SubTitle>Banner description</SubTitle>
              <Controller
                name="banner.alt"
                control={control}
                render={({ field }) => (
                  <DefaultInput>
                    <TextField
                      fullWidth
                      type="text"
                      placeholder="My favorite view"
                      variant="standard"
                      {...field}
                      error={!!errors.banner?.alt}
                      helperText={errors.banner?.alt?.message}
                    />
                  </DefaultInput>
                )}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <DefaultButton>
              <Button onClick={() => setIsRegistering(true)} fullWidth={true}>
                Back to Login
              </Button>
            </DefaultButton>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <DefaultButton>
              <Button type="submit" fullWidth={true}>
                Submit
              </Button>
            </DefaultButton>
          </Grid>
        </Grid>
      </FormControl>
    </MainCard>
  );
}

export default AddVenue;
