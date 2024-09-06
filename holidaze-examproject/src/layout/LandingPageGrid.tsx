import Grid from '@mui/material/Grid2';
import MainVenueCard from '../components/cards/mainVenueCard.tsx';
import MainFilterCard from '../components/cards/MainFilterCard.tsx';

function LandingPageGrid() {
  return (
    <Grid container spacing={4} marginTop={4}>
      <Grid size={{ xs: 12 }}>
        <MainFilterCard />
      </Grid>
      <Grid>
        <MainVenueCard />
      </Grid>
    </Grid>
  );
}

export default LandingPageGrid;
