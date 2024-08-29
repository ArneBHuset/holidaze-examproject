import FormControl from '@mui/material/FormControl';
import { TextField, Button, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import FormCard from '../../layout/FormCard.tsx';
import SubTitle from '../titles/SubTitle.tsx';

function Login({ setIsRegistering }: { setIsRegistering: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <FormCard>
      <FormControl>
        <Grid container spacing={4}>
          <Grid size={12}></Grid>
          <Grid size={12}>
            <Box>
              <SubTitle>Email</SubTitle>
              <TextField
                fullWidth={true}
                id="standard-basic"
                type={'email'}
                placeholder="anderson@noroff.no"
                variant="standard"
              />
            </Box>
          </Grid>
          <Grid size={12}>
            <Box>
              <SubTitle>Password</SubTitle>
              <TextField fullWidth={true} id="standard-basic" type={'password'} variant="standard" />
            </Box>
          </Grid>
          <Grid size={12}>
            <Button onClick={() => setIsRegistering(true)}>Register new profile?</Button>
          </Grid>
        </Grid>
      </FormControl>
    </FormCard>
  );
}

export default Login;
