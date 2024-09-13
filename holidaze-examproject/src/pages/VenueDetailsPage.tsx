import { useLocation } from 'react-router-dom';
import VenueSpecificDetails from '../components/cards/VenueSpecificDetails.tsx';
import ImageDisplayCard from '../components/cards/ImageDisplayCard.tsx';
import Grid from '@mui/material/Grid2';
import VenueData from '../services/interfaces/api/venueResponse.ts';
import { Container } from '@mui/material';
import { useState } from 'react';
import DefaultBottomNavigation from '../styles/mui-styles/components/BottomNavigation.tsx';
import Button from '@mui/material/Button';
import BookVenueDrawer from '../components/forms/NewBooking.tsx';

const VenueDetailsPage = () => {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer =
    (_anchor: 'top' | 'left' | 'bottom' | 'right', open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const { venue } = location.state as { venue: VenueData }; // Access venue data

  return (
    <Container maxWidth={'sm'}>
      <Grid container spacing={2} maxWidth={'sm'}>
        <Grid size={12} marginBottom={2}>
          <ImageDisplayCard venueMedia={venue.media || [{ url: 'https://shorturl.at/MBljW', alt: 'Image missing' }]} />
        </Grid>
        <Grid size={12}>
          <VenueSpecificDetails venue={venue} />
        </Grid>
      </Grid>
      <DefaultBottomNavigation>
        <Button sx={{ width: '100%' }} onClick={toggleDrawer('bottom', true)}>
          BOOK THIS VENUE
        </Button>
      </DefaultBottomNavigation>

      <BookVenueDrawer open={drawerOpen} toggleDrawer={toggleDrawer} venue={venue} />
    </Container>
  );
};

export default VenueDetailsPage;
