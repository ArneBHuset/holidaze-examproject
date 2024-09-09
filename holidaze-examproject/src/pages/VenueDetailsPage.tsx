import { useLocation } from 'react-router-dom';
import VenueSpecificDetails from '../components/cards/VenueSpecificDetails.tsx';
import ImageDisplayCard from '../components/cards/ImageDisplayCard.tsx';
import Grid from '@mui/material/Grid2';
import VenueData from '../services/interfaces/api/venueResponse.ts';
import { Container } from '@mui/material'; // Import VenueData interface

const VenueDetailsPage = () => {
  const location = useLocation();
  const { venue } = location.state as { venue: VenueData }; // Access venue data from the passed state

  return (
    <Container maxWidth={'sm'}>
      <Grid container spacing={2} maxWidth={'sm'}>
        <Grid item size={12} marginBottom={2}>
          <ImageDisplayCard venueMedia={venue.media} />
        </Grid>
        <Grid item size={12}>
          <VenueSpecificDetails venue={venue} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default VenueDetailsPage;
