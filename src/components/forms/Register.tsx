import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormControl from '@mui/material/FormControl';
import { TextField, Button, Box, Checkbox } from '@mui/material';
import Grid from '@mui/material/Grid2';
import MainCard from '../../layout/MainCard.tsx';
import SubTitle from '../titles/SubTitle';
import RegistrationData from '../../services/interfaces/registrationForm.ts';
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

/**
 * Register component handles the user registration form, allowing users to fill out their information,
 * such as name, email, password, bio, and optional avatar and banner images. It includes options to
 * choose between customer and venue manager roles.
 *
 * @param {Object} props - Component props.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setIsRegistering - Function to toggle the registration state, typically used to switch between the registration and login forms.
 *
 * @returns {JSX.Element} The rendered registration form.
 */
function Register({ setIsRegistering }: { setIsRegistering: React.Dispatch<React.SetStateAction<boolean>> }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegistrationData>({
    resolver: yupResolver<RegistrationData>(registerValidationSchema),
  });

  const avatarUrl = watch('avatar.url');
  const bannerUrl = watch('banner.url');

  const onSubmit = async (data: RegistrationData) => {
    const processedData: RegistrationData = {
      ...data,
      avatar: data.avatar?.url?.trim() ? data.avatar : undefined,
      banner: data.banner?.url?.trim() ? data.banner : undefined,
    };
    await registrationApiCall(processedData, setIsRegistering);
  };
  const customerLabel = { inputProps: { 'aria-label': 'Customer checkbox' } };
  const venueManagerLabel = { inputProps: { 'aria-label': 'Venue manager checkbox' } };

  return (
    <MainCard>
      <FormControl component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1} p={2}>
          <Box width="100%">
            <SubTitle>USER TYPE</SubTitle>
          </Box>
          <Grid size={{ xs: 12, sm: 6 }} width="100%">
            <Box display="flex" alignItems="center">
              <Controller
                name="venueManager"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <>
                    <Checkbox
                      {...customerLabel}
                      checked={field.value === false}
                      onChange={() => field.onChange(false)}
                      icon={<TravelExploreIcon sx={{ fontSize: 45 }} />}
                      checkedIcon={<TravelExploreIcon sx={{ fontSize: 45 }} />}
                      sx={{
                        color: theme.palette.primary.light,
                        '&.Mui-checked': {
                          color: theme.palette.secondary.main,
                        },
                      }}
                    />
                    <Typography
                      variant="subtitle1"
                      sx={{
                        textDecoration: field.value === false ? 'underline' : 'none',
                      }}
                    >
                      CUSTOMER
                    </Typography>
                  </>
                )}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }} width="100%">
            <Box display="flex" alignItems="center">
              <Controller
                name="venueManager"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <>
                    <Checkbox
                      {...venueManagerLabel}
                      checked={field.value === true}
                      onChange={() => field.onChange(true)}
                      icon={<VillaIcon sx={{ fontSize: 40 }} />}
                      checkedIcon={<VillaIcon sx={{ fontSize: 40 }} />}
                      sx={{
                        color: theme.palette.primary.light,
                        '&.Mui-checked': {
                          color: theme.palette.secondary.main,
                        },
                      }}
                    />
                    <Typography
                      variant="subtitle1"
                      sx={{
                        textDecoration: field.value === true ? 'underline' : 'none',
                      }}
                    >
                      VENUE MANAGER
                    </Typography>
                  </>
                )}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
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
                      placeholder="Mr. Anderson"
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

          <Grid size={{ xs: 12, sm: 6 }}>
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
                      placeholder="anderson@stud.noroff.no"
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
                      rows={2}
                      placeholder="Adventurer by heart, love fine dining and..."
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

          <Grid size={12}>
            <Box>
              <SubTitle>Avatar</SubTitle>
              <Controller
                name="avatar.url"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <DefaultInput>
                    <TextField
                      fullWidth
                      type="url"
                      placeholder="image url"
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

          {avatarUrl && (
            <Grid size={12}>
              <Box>
                <SubTitle>Avatar alt</SubTitle>
                <Controller
                  name="avatar.alt"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <DefaultInput>
                      <TextField
                        fullWidth
                        type="text"
                        placeholder="Describe your avatar"
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
          )}

          <Grid size={12}>
            <Box>
              <SubTitle>Banner picture</SubTitle>
              <Controller
                name="banner.url"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <DefaultInput>
                    <TextField
                      fullWidth
                      type="url"
                      placeholder="image url"
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

          {bannerUrl && (
            <Grid size={12}>
              <Box>
                <SubTitle>Banner alt</SubTitle>
                <Controller
                  name="banner.alt"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <DefaultInput>
                      <TextField
                        fullWidth
                        type="text"
                        placeholder="Describe you banner"
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
          )}

          <Grid size={{ xs: 6 }} marginTop={2}>
            <SecondaryButton>
              <Button onClick={() => setIsRegistering(true)} fullWidth={true}>
                Login
              </Button>
            </SecondaryButton>
          </Grid>

          <Grid size={{ xs: 6 }} marginTop={2}>
            <DefaultButton>
              <Button type="submit" fullWidth={true} endIcon={<ArrowForwardIosIcon />}>
                Submit
              </Button>
            </DefaultButton>
          </Grid>
        </Grid>
      </FormControl>
    </MainCard>
  );
}

export default Register;
