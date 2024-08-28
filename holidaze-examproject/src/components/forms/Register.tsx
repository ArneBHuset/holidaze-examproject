import FormControl from '@mui/material/FormControl';
import {TextField, Button} from '@mui/material';
import Grid from '@mui/material/Grid2';
import FormCard from '../../layout/FormCard.tsx';

function Register() {
  return (
        <FormCard>
        <FormControl>
          <Grid container spacing={4}>
            <Grid size={12}><h5>Button</h5></Grid>
            <Grid size={12}><TextField fullWidth={true} id="standard-basic" label="Standard" variant="standard" /></Grid>
            <Grid size={12}><TextField fullWidth={true} id="standard-basic" label="Standard" variant="standard" /></Grid>
            <Grid size={12}><TextField fullWidth={true}id="standard-basic" label="Standard" variant="standard" /></Grid>
            <Grid size={6}><Button>Upload avatar</Button></Grid>
            <Grid size={6}><Button>Upload banner</Button></Grid>
          </Grid>
        </FormControl>
      </FormCard>
  );
}

export default Register;