import FormControl from '@mui/material/FormControl';
import { TextField, Button, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import FormCard from '../../layout/FormCard.tsx';
import SubTitle from '../titles/SubTitle.tsx';
import { MaterialUISwitch } from '../../styles/mui-styles/components/MuiSwitch.tsx';
import { useState } from 'react';

function Register({ setIsRegistering }: { setIsRegistering: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [userType, setUserType] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
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
    const newErrors = { name: '', email: '', password: '', bio: '', profileUrl: '', bannerUrl: '' };

    if (!name) {
      newErrors.name = 'Name is required';
      formIsValid = false;
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Valid email is required';
      formIsValid = false;
    }
    if (!password) {
      newErrors.password = 'Password is required';
      formIsValid = false;
    }
    if (!bio) {
      newErrors.bio = 'Bio is required';
      formIsValid = false;
    }
    if (profileUrl && !/\.(jpeg|jpg|gif|png)$/.test(profileUrl)) {
      newErrors.profileUrl = 'Please enter a valid image URL';
      formIsValid = false;
    }
    if (bannerUrl && !/\.(jpeg|jpg|gif|png)$/.test(bannerUrl)) {
      newErrors.bannerUrl = 'Please enter a valid image URL';
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      console.log('Form is valid, proceed with submission');
    } else {
      console.log('Form has errors');
    }
  };

  const handleChange = () => {
    setUserType((prev) => !prev);
    console.log(`Switch is now ${userType ? 'on' : 'off'}`);
  };
  return (
    <FormCard>
      <FormControl component="form" onSubmit={handleSubmit} >
        <Grid container className={'arne'} spacing={4}>
          <Grid width={'100%'} size={12}>
            <Box width={'100%'} >
              <MaterialUISwitch checked={userType} onChange={handleChange}  />
            </Box>
          </Grid>
          <Grid size={12}>
            <Box>
              <SubTitle>Name</SubTitle>
              <TextField
                fullWidth
                id="name"
                placeholder="Mr. Anderson"
                variant="standard"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={Boolean(errors.name)}
                helperText={errors.name}
              />
            </Box>
          </Grid>
          <Grid size={12}>
            <Box>
              <SubTitle>Email</SubTitle>
              <TextField
                fullWidth
                id="email"
                type="email"
                placeholder="anderson@noroff.no"
                variant="standard"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
            </Box>
          </Grid>
          <Grid size={12}>
            <Box>
              <SubTitle>Password</SubTitle>
              <TextField
                fullWidth
                id="password"
                type="password"
                variant="standard"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
            </Box>
          </Grid>
          <Grid size={12}>
            <Box>
              <SubTitle>Bio</SubTitle>
              <TextField
                fullWidth
                id="bio"
                multiline
                rows={3}
                placeholder="Adventurer by heart, and..."
                variant="standard"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                error={Boolean(errors.bio)}
                helperText={errors.bio}
              />
            </Box>
          </Grid>
          <Grid size={6}>
            <Box>
              <SubTitle>Profile picture</SubTitle>
              <TextField
                fullWidth
                id="profile-url"
                type="url"
                placeholder="Profile picture URL"
                variant="standard"
                value={profileUrl}
                onChange={(e) => setProfileUrl(e.target.value)}
                error={Boolean(errors.profileUrl)}
                helperText={errors.profileUrl}
              />
            </Box>
          </Grid>
          <Grid size={6}>
            <Box>
              <SubTitle>Banner picture</SubTitle>
              <TextField
                fullWidth
                id="banner-url"
                type="url"
                placeholder="Banner picture URL"
                variant="standard"
                value={bannerUrl}
                onChange={(e) => setBannerUrl(e.target.value)}
                error={Boolean(errors.bannerUrl)}
                helperText={errors.bannerUrl}
              />
            </Box>
          </Grid>
          <Grid size={6}>
            <Button variant="contained" onClick={() => setIsRegistering(false)}>Already signed up? Login instead</Button>
          </Grid>
          <Grid size={6}>
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
