import { useLocation, useParams } from 'react-router-dom';
import VenueSpecificDetails from '../components/cards/VenueSpecificDetails.tsx';
import ImageDisplayCard from '../components/cards/ImageDisplayCard.tsx';
import Grid from '@mui/material/Grid2';
import VenueData from '../services/interfaces/api/venueResponse.ts';
import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import DefaultBottomNavigation from '../styles/mui-styles/components/BottomNavigation.tsx';
import Button from '@mui/material/Button';
import BookVenueDrawer from '../components/forms/NewBooking.tsx';
import baseApiCall from '../services/api/apiMain.ts';
import { venuesEndpoint } from '../services/api/variables/endpoints/venueEndpoint.ts';
import { snackBarError } from '../services/snackbar/SnackBarError.tsx';
import { LinearProgress } from '@mui/material';
import { getValidatedHeader } from '../services/api/variables/headers.ts';
import { ApiError } from '../services/interfaces/error/catchError.ts';

const apiKey = import.meta.env.VITE_NOROFF_API_KEY;

export default function VenueDetailsPage() {
  const location = useLocation();
  const { state } = location;
  const { id } = useParams();
  const [venue, setVenue] = useState<VenueData | null>(state?.venue || null);
  const [loading, setLoading] = useState(false);
  const headers = getValidatedHeader();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer =
    (_anchor: 'top' | 'left' | 'bottom' | 'right', open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setDrawerOpen(open);
    };

  useEffect(() => {
    if (!venue && id) {
      const fetchVenueData = async () => {
        setLoading(true);
        try {
          const queryParams = { id, owner: true, bookings: true };
          const endpoint = venuesEndpoint(queryParams);
          const response = await baseApiCall({
            url: endpoint,
            method: 'GET',
            headers: { ...headers, 'X-Noroff-Api-Key': apiKey },
          });

          if (response && response.data) {
            setVenue(response.data);
          } else {
            throw new Error('Unexpected response structure');
          }
        } catch (error) {
          const apiError = error as ApiError;
          snackBarError(apiError.message || 'Unknown error');
        } finally {
          setLoading(false);
        }
      };
      fetchVenueData();
    }
  }, [venue, id]);

  if (loading) return <LinearProgress color="secondary" />;

  if (!venue) {
    return null;
  }

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
          BOOK VENUE
        </Button>
      </DefaultBottomNavigation>
      <BookVenueDrawer open={drawerOpen} toggleDrawer={toggleDrawer} venue={venue} />
    </Container>
  );
}
