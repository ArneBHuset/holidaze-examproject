import { Container, useMediaQuery } from '@mui/material';
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
import theme from '../styles/mui-styles/MuiThemes.ts';
import Typography from '@mui/material/Typography';

const apiKey = import.meta.env.VITE_NOROFF_API_KEY;

export default function UserOverviewPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const headers = getValidatedHeader();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchBookings = async () => {
    const profileData = localStorage.getItem('profileData');
    const profileName = profileData ? JSON.parse(profileData).name : null;

    if (!profileName) {
      snackBarError('No profile name found');
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

  return (
    <Container maxWidth="md" sx={{ p: 0 }}>
      <Grid container spacing={0.5} marginTop={1}>
        <Grid
          size={{ xs: 12, sm: 5 }}
          sx={{
            maxWidth: { xs: '100%', sm: '500px' },
            position: isSmallScreen ? 'static' : 'sticky',
            top: isSmallScreen ? 'auto' : '20px',
            marginTop: { xs: 0, sm: 5 },
            alignSelf: 'flex-start',
          }}
        >
          <UserProfileCard />
        </Grid>
        <Grid size={{ xs: 12, sm: 7 }}>
          <Typography variant="h4" mt={{ xs: 2, sm: 0 }} textAlign={{ xs: 'center', sm: 'left' }}>
            UPCOMING BOOKINGS
          </Typography>
          {loading ? <LinearProgress color="secondary" /> : null}
          <UpcomingBookingCard bookings={bookings} onBookingUpdate={fetchBookings} />
        </Grid>
      </Grid>
    </Container>
  );
}
