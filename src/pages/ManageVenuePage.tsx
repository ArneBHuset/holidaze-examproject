import { useEffect, useState } from 'react';
import { Button, Container, LinearProgress, useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Grid2';
import UserProfileCard from '../components/cards/UserProfileCard.tsx';
import ManagedVenuesCard from '../components/cards/ManagedVenuesCard.tsx';
import baseApiCall from '../services/api/apiMain.ts';
import { profileEndpoint } from '../services/api/variables/endpoints/profileEndpoints.ts';
import { snackBarError } from '../services/snackbar/SnackBarError.tsx';
import VenueData from '../services/interfaces/api/venueResponse.ts';
import { getValidatedHeader } from '../services/api/variables/headers.ts';
import theme from '../styles/mui-styles/MuiThemes.ts';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import DefaultButton from '../styles/mui-styles/components/defaultBtn.tsx';

const apiKey = import.meta.env.VITE_NOROFF_API_KEY;

function ManageVenuePage() {
  const [venues, setVenues] = useState<VenueData[]>([]);
  const [loading, setLoading] = useState(true);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const profileData = JSON.parse(localStorage.getItem('profileData') || '{}');
  const { name } = profileData;

  const headers = getValidatedHeader();

  const fetchManagedVenues = async () => {
    setLoading(true);
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

  useEffect(() => {
    if (name) {
      fetchManagedVenues();
    } else {
      setLoading(false);
      snackBarError('Profile data not found in localStorage.');
    }
  }, [name]);

  return (
    <Container maxWidth="md" sx={{ p: 0 }}>
      <Grid container spacing={0.5}>
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
          <Typography variant="h4" mt={{ xs: 2, sm: 0 }} mb={1} textAlign={{ xs: 'center', sm: 'left' }}>
            YOUR VENUES
          </Typography>
          {loading ? (
            <LinearProgress color="secondary" />
          ) : venues && venues.length > 0 ? (
            <ManagedVenuesCard venues={venues} refreshVenues={fetchManagedVenues} />
          ) : (
            <Box textAlign="center" mt={3}>
              <Typography variant="h5" mb={2}>
                No venues found :(
              </Typography>
              <DefaultButton>
                <Button onClick={() => navigate('/newvenue')}>Create your first Venue</Button>
              </DefaultButton>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default ManageVenuePage;
