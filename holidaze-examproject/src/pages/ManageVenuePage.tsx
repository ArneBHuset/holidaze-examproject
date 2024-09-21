import { useEffect, useState } from 'react';
import { Container, LinearProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';
import UserProfileCard from '../components/cards/UserProfileCard.tsx';
import ManagedVenuesCard from '../components/cards/ManagedVenuesCard.tsx';
import baseApiCall from '../services/api/apiMain.ts';
import { profileEndpoint } from '../services/api/variables/endpoints/profileEndpoints.ts';
import { snackBarError } from '../services/snackbar/SnackBarError.tsx';
import VenueData from '../services/interfaces/api/venueResponse.ts';
import { getValidatedHeader } from '../services/api/variables/headers.ts';

const apiKey = import.meta.env.VITE_NOROFF_API_KEY;

function ManageVenuePage() {
  const [venues, setVenues] = useState<VenueData[]>([]);
  const [loading, setLoading] = useState(true);

  const profileData = JSON.parse(localStorage.getItem('profileData') || '{}');
  const { name } = profileData;

  const headers = getValidatedHeader();

  useEffect(() => {
    const fetchManagedVenues = async () => {
      try {
        const response = await baseApiCall({
          url: `${profileEndpoint}${name}/venues?_owner=true&_bookings=true`,
          method: 'GET',
          headers: { ...headers, 'X-Noroff-Api-Key': apiKey },
        });

        if (response?.data) {
          setVenues(response.data);
        } else {
          throw new Error('Managed venues not found');
        }
      } catch (error) {
        console.error('Error fetching managed venues:', error);
        snackBarError('Error fetching managed venues. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (name) {
      fetchManagedVenues();
    } else {
      setLoading(false);
      snackBarError('Profile data not found in localStorage.');
    }
  }, [name]);

  if (loading) {
    return <LinearProgress color="secondary" />;
  }

  return (
    <Container maxWidth="md">
      <Grid container spacing={4} marginTop={4} width={'100%'}>
        <Grid size={12}>
          <UserProfileCard />
        </Grid>
        <Grid size={12}>
          <ManagedVenuesCard venues={venues} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default ManageVenuePage;
