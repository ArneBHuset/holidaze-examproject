import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import { TextField, Button, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import FormCard from '../../layout/FormCard.tsx';
import SubTitle from '../titles/SubTitle.tsx';
import { MaterialUISwitch } from '../../styles/mui-styles/components/MuiSwitch.tsx';
import apiMain from '../../services/api/apiMain.ts';
import { getApiKey } from '../../services/api/auth/apiKey.ts';

function Register({ setIsRegistering }: { setIsRegistering: React.Dispatch<React.SetStateAction<boolean>> }) {

  const data = getApiKey()
  console.log(data)
  const [formData, setFormData] = useState({
    userType: false,
    name: '',
    email: '',
    password: '',
    bio: '',
    profileUrl: '',
    bannerUrl: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
    profileUrl: '',
    bannerUrl: '',
  });

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = { ...errors };

    if (!formData.name) {
      newErrors.name = 'Name is required';
      formIsValid = false;
    } else {
      newErrors.name = '';
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
      formIsValid = false;
    } else {
      newErrors.email = '';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
      formIsValid = false;
    } else {
      newErrors.password = '';
    }
    if (!formData.bio) {
      newErrors.bio = 'Bio is required';
      formIsValid = false;
    } else {
      newErrors.bio = '';
    }
    if (formData.profileUrl && !/\.(jpeg|jpg|gif|png)$/.test(formData.profileUrl)) {
      newErrors.profileUrl = 'Please enter a valid image URL';
      formIsValid = false;
    } else {
      newErrors.profileUrl = '';
    }
    if (formData.bannerUrl && !/\.(jpeg|jpg|gif|png)$/.test(formData.bannerUrl)) {
      newErrors.bannerUrl = 'Please enter a valid image URL';
      formIsValid = false;
    } else {
      newErrors.bannerUrl = '';
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      console.log('Form data:', formData);
    } else {
      console.log('Form has errors:', errors);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSwitchChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      userType: !prevData.userType,
    }));
  };



  return (
    <FormCard>
      <FormControl component="form" onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12}}>
            <Box width={'100%'}>
              <MaterialUISwitch checked={formData.userType} onChange={handleSwitchChange} />
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
                value={formData.name}
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
                value={formData.email}
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
                value={formData.password}
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
                value={formData.bio}
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
                id="profileUrl"
                type="url"
                placeholder="Profile picture URL"
                variant="standard"
                value={formData.profileUrl}
                onChange={handleInputChange}
                error={Boolean(errors.profileUrl)}
                helperText={errors.profileUrl}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 6}}>
            <Box>
              <SubTitle>Banner picture</SubTitle>
              <TextField
                fullWidth
                id="bannerUrl"
                type="url"
                placeholder="Banner picture URL"
                variant="standard"
                value={formData.bannerUrl}
                onChange={handleInputChange}
                error={Boolean(errors.bannerUrl)}
                helperText={errors.bannerUrl}
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
