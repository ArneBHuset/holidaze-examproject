import FormControl from '@mui/material/FormControl';
import { TextField, Button, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import FormCard from '../../layout/FormCard.tsx';
import SubTitle from '../titles/SubTitle.tsx';
import { VisuallyHiddenInput } from '../../styles/mui-styles/components/HiddenInput.tsx';
import { MaterialUISwitch } from '../../styles/mui-styles/components/MuiSwitch.tsx';

function Register() {

  return (
    <FormCard>
      <FormControl>
        <Grid container spacing={4}>
          <Grid size={12}>
            <MaterialUISwitch/>
          </Grid>
          <Grid size={12}>
            <Box>
              <SubTitle>Name</SubTitle>
              <TextField fullWidth={true} id="standard-basic" placeholder="Mr. Anderson" variant="standard" />
            </Box>
          </Grid>
          <Grid size={12}>
            <Box>
              <SubTitle>Email</SubTitle>
              <TextField fullWidth={true} id="standard-basic" type={'email'} placeholder="anderson@noroff.no" variant="standard" />
            </Box>
          </Grid>
          <Grid size={12}>
            <Box>
              <SubTitle>Password</SubTitle>
              <TextField fullWidth={true} id="standard-basic" type={'password'} variant="standard" />
            </Box>
          </Grid>
          <Grid size={12}>
            <Box>
              <SubTitle>Bio</SubTitle>
              <TextField fullWidth={true}     id="standard-multiline-static"  multiline
                         rows={3} placeholder="Adventourer by heart, and..." variant="standard" />
            </Box>
          </Grid>
          <Grid size={6}>
            <Box>
              <SubTitle>Email</SubTitle>
            <Button component="label">
              Upload avatar
              <VisuallyHiddenInput type="file" onChange={(event) => console.log(event.target.files)} multiple />
            </Button>
            </Box>
          </Grid>
          <Grid size={6}>
            <Box>
              <SubTitle>Email</SubTitle>
            <Button component="label">
              Upload banner
              <VisuallyHiddenInput type="file" onChange={(event) => console.log(event.target.files)} multiple />
            </Button>
              </Box>
          </Grid>
          <Grid size={12}>
            <Button>Allready signed up? Login instead</Button>
          </Grid>
        </Grid>
      </FormControl>
    </FormCard>
  );
}

export default Register;
