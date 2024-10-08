import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, LinearProgress, useMediaQuery } from '@mui/material';
import MainCard from '../layout/MainCard.tsx';
import HostDetails from '../components/profile/ProfileDisplay.tsx';
import baseApiCall from '../services/api/apiMain.ts';
import { profileEndpoint } from '../services/api/variables/endpoints/profileEndpoints.ts';
import { snackBarError } from '../services/snackbar/SnackBarError.tsx';
import VenueData from '../services/interfaces/api/venueResponse.ts';
import Grid from '@mui/material/Grid2';
import MainVenueCard from '../components/cards/mainVenueCard.tsx';
import { getValidatedHeader } from '../services/api/variables/headers.ts';
import theme from '../styles/mui-styles/MuiThemes.ts';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const apiKey = import.meta.env.VITE_NOROFF_API_KEY;

function AllHostsPage() {
  const { name } = useParams();
  const [hostData, setHostData] = useState(null);
  const [venues, setVenues] = useState<VenueData[]>([]);
  const [loading, setLoading] = useState(true);
  const headers = getValidatedHeader();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchHostData = async () => {
      try {
        const response = await baseApiCall({
          url: `${profileEndpoint}${name}`,
          method: 'GET',
          headers: { ...headers, 'X-Noroff-Api-Key': apiKey },
        });

        if (response?.data) {
          setHostData(response.data);
        } else {
          throw new Error('Profile not found');
        }
      } catch (error) {
        console.error('Error fetching host data:', error);
        snackBarError('Error fetching host profile. Please try again later.');
      }
    };

    fetchHostData();
  }, [name]);

  useEffect(() => {
    const fetchHostVenues = async () => {
      try {
        const response = await baseApiCall({
          url: `${profileEndpoint}${name}/venues?_owner=true&_bookings=true`,
          method: 'GET',
          headers: { ...headers, 'X-Noroff-Api-Key': apiKey },
        });

        if (response?.data) {
          setVenues(response.data);
        } else {
          throw new Error('Venues not found');
        }
      } catch (error) {
        console.error('Error fetching venues:', error);
        snackBarError('Error fetching venues. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchHostVenues();
  }, [name]);

  return (
    <Container maxWidth="md">
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
          <MainCard>
            <Box mb={2}>{hostData ? <HostDetails data={hostData} /> : <p>No host data found</p>}</Box>
          </MainCard>
        </Grid>
        <Grid size={{ xs: 12, sm: 7 }}>
          <Typography variant="h4" mt={{ xs: 2, sm: 0 }} mb={1} textAlign={{ xs: 'center', sm: 'left' }}>
            VENUES MANAGED BY HOST
          </Typography>
          {loading ? <LinearProgress color="secondary" /> : null}
          {venues.length > 0 ? (
            venues.map((venue) => (
              <Grid key={venue.id} size={12} mb={1}>
                <MainVenueCard venues={[venue]} />
              </Grid>
            ))
          ) : (
            <Typography variant="h3">No venues managed by this host</Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default AllHostsPage;
