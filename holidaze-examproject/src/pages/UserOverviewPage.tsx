import { Container } from '@mui/material';
import MainCard from '../layout/MainCard.tsx';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import UserProfileCard from '../components/cards/UserProfileCard.tsx';
import Grid from '@mui/material/Grid2';

function UserOverviewPage() {
  return (
    <Container maxWidth="sm">
      <Grid container spacing={4} marginTop={4} width={'100%'}>
        <Grid size={12}>
          <UserProfileCard />
        </Grid>
        <Grid size={12}></Grid>
      </Grid>
    </Container>
  );
}

export default UserOverviewPage;
