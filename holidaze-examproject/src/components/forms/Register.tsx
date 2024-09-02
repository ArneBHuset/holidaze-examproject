import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import { TextField, Button, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import FormCard from '../../layout/FormCard';
import SubTitle from '../titles/SubTitle';
import { MaterialUISwitch } from '../../styles/mui-styles/components/MuiSwitch';
import RegistrationData from '../../services/interfaces/registrationForm.ts';
import { registerValidation } from './validation/registerValidation.ts';
import { registrationApiCall } from '../../services/api/auth/RegisterApi.ts';

/**
 * React component for registration form
 * @param {boolean} setIsRegistering - booleon to toggle between registration and login
 */
function Register({ setIsRegistering }: { setIsRegistering: React.Dispatch<React.SetStateAction<boolean>> }) {

  const [registrationFormData, setFormData] = useState<RegistrationData>({
    venueManager: false,
    name: '',
    email: '',
    password: '',
    bio: '',
    avatar: {
      url: '',
      alt: ''
    },
    banner: {
      url: '',
      alt: ''
    }
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
    avatarUrl: '',
    avatarAlt: '',
    bannerUrl: '',
    bannerAlt: '',
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const validationErrors = registerValidation(registrationFormData, errors, setErrors);

    if (validationErrors) {
      const requestData: RegistrationData = {
        name: registrationFormData.name,
        email: registrationFormData.email,
        password: registrationFormData.password,
        bio: registrationFormData.bio,
        venueManager: registrationFormData.venueManager,
      };

      if (registrationFormData.avatar?.url) {
        requestData.avatar = registrationFormData.avatar;
      }

      if (registrationFormData.banner?.url) {
        requestData.banner = registrationFormData.banner;
      }

      try {
        const response = await registrationApiCall(requestData);
        console.log('Registration successful:', response);
      } catch (error) {
        console.error('Registration failed:', error);
      }
    } else {
      console.log('Form has errors:', errors);
    }
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id.startsWith('avatar') || id.startsWith('banner')) {
      const [type, field] = id.split('.');

      setFormData((prevData) => ({
        ...prevData,
        [type]: {
          ...(prevData[type as keyof RegistrationData] as any),
          [field]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const handleSwitchChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      venueManager: !prevData.venueManager,
    }));
  };

  return (
    <FormCard>
      <FormControl component="form" onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12}}>
            <Box width="100%">
              <MaterialUISwitch checked={registrationFormData.venueManager} onChange={handleSwitchChange} />
            </Box>
          </Grid>
          <Grid size={{ xs: 12}}>
            <Box>
              <SubTitle>Name</SubTitle>
              <TextField
                fullWidth
                id="name"
                placeholder="Mr. Anderson"
                variant="standard"
                value={registrationFormData.name}
                onChange={handleInputChange}
                error={Boolean(errors.name)}
                helperText={errors.name}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12}}>
            <Box>
              <SubTitle>Email</SubTitle>
              <TextField
                fullWidth
                id="email"
                type="email"
                placeholder="anderson@noroff.no"
                variant="standard"
                value={registrationFormData.email}
                onChange={handleInputChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12}}>
            <Box>
              <SubTitle>Password</SubTitle>
              <TextField
                fullWidth
                id="password"
                type="password"
                variant="standard"
                value={registrationFormData.password}
                onChange={handleInputChange}
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12}}>
            <Box>
              <SubTitle>Bio</SubTitle>
              <TextField
                fullWidth
                id="bio"
                multiline
                rows={3}
                placeholder="Adventurer by heart, and..."
                variant="standard"
                value={registrationFormData.bio}
                onChange={handleInputChange}
                error={Boolean(errors.bio)}
                helperText={errors.bio}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 6}}>
            <Box>
              <SubTitle>Profile picture</SubTitle>
              <TextField
                fullWidth
                id="avatar.url"
                type="url"
                placeholder="Profile picture URL"
                variant="standard"
                value={registrationFormData.avatar?.url || ''}
                onChange={handleInputChange}
                error={Boolean(errors.avatarUrl)}
                helperText={errors.avatarUrl}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 6}}>
            <Box>
              <SubTitle>Profile Picture Alt Text</SubTitle>
              <TextField
                fullWidth
                id="avatar.alt"
                type="text"
                placeholder="Me at my 24th birthday"
                variant="standard"
                value={registrationFormData.avatar?.alt || ''}
                onChange={handleInputChange}
                error={Boolean(errors.avatarAlt)}
                helperText={errors.avatarAlt}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 6}}>
            <Box>
              <SubTitle>Banner picture</SubTitle>
              <TextField
                fullWidth
                id="banner.url"
                type="url"
                placeholder="Banner picture URL"
                variant="standard"
                value={registrationFormData.banner?.url || ''}
                onChange={handleInputChange}
                error={Boolean(errors.bannerUrl)}
                helperText={errors.bannerUrl}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 6}}>
            <Box>
              <SubTitle>Banner Picture Alt Text</SubTitle>
              <TextField
                fullWidth
                id="banner.alt"
                type="text"
                placeholder="My favorite view"
                variant="standard"
                value={registrationFormData.banner?.alt || ''}
                onChange={handleInputChange}
                error={Boolean(errors.bannerAlt)}
                helperText={errors.bannerAlt}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 6}}>
            <Button variant="contained" onClick={() => setIsRegistering(false)}>
              Already signed up? Login instead
            </Button>
          </Grid>
          <Grid size={{ xs: 6}}>
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