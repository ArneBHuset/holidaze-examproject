import { Container } from '@mui/material';
import UserProfileCard from '../components/cards/UserProfileCard.tsx';
import Grid from '@mui/material/Grid2';
import UpcomingBookingCard from '../components/cards/UpcomingBookingCard.tsx';
import { useEffect, useState } from 'react';
import baseApiCall from '../services/api/apiMain.ts';
import { profileEndpoint } from '../services/api/variables/endpoints/profileEndpoints.ts';
import { getValidatedHeader } from '../services/api/variables/headers.ts';
import { LinearProgress } from '@mui/material';
import { snackBarError } from '../services/snackbar/SnackBarError.tsx';
import { ApiError } from '../services/interfaces/error/catchError.ts';

const apiKey = import.meta.env.VITE_NOROFF_API_KEY;

export default function UserOverviewPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const headers = getValidatedHeader();

  const fetchBookings = async () => {
    const profileData = localStorage.getItem('profileData');
    const profileName = profileData ? JSON.parse(profileData).name : null;

    if (!profileName) {
      snackBarError('No profile name found. Please log in again.');
      return;
    }

    try {
      setLoading(true);

      const response = await baseApiCall({
        url: `${profileEndpoint}${profileName}/bookings?_venue=true&sort=dateFrom&sortOrder=asc`,
        method: 'GET',
        headers: { ...headers, 'X-Noroff-Api-Key': apiKey },
      });

      setBookings(response.data);
      setLoading(false);
    } catch (error) {
      const apiError = error as ApiError;
      snackBarError(apiError.message || 'Unknown error');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <LinearProgress color="secondary" />;

  return (
    <Container maxWidth="md">
      <Grid container spacing={4} marginTop={4} width={'100%'}>
        <Grid size={12}>
          <UserProfileCard />
        </Grid>
        <Grid size={12}>
          <UpcomingBookingCard bookings={bookings} />
        </Grid>
      </Grid>
    </Container>
  );
}
