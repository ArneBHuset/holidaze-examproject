import { React } from 'react';
import FormControl from '@mui/material/FormControl';
import { TextField, Button, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import FormCard from '../../layout/FormCard.tsx';
import SubTitle from '../titles/SubTitle.tsx';
import { useState } from 'react';

function Login({ setIsRegistering }: { setIsRegistering: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const validateForm = () => {
    let formIsValid = true;
    const newErrors = { name: '', email: '', password: '', bio: '', profileUrl: '', bannerUrl: '' };

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Valid email is required';
      formIsValid = false;
    }
    if (!password) {
      newErrors.password = 'Password is required';
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



  return (
    <FormCard>
      <FormControl component="form" onSubmit={handleSubmit} >
        <Grid container spacing={4}>
          <Grid size={12}></Grid>
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
          <Grid size={6}>
            <Button onClick={() => setIsRegistering(true)}>Register new profile?</Button>
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

export default Login;
