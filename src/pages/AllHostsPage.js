import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, LinearProgress, useMediaQuery } from '@mui/material';
import MainCard from '../layout/MainCard.tsx';
import HostDetails from '../components/profile/ProfileDisplay.tsx';
import baseApiCall from '../services/api/apiMain.ts';
import { profileEndpoint } from '../services/api/variables/endpoints/profileEndpoints.ts';
import { snackBarError } from '../services/snackbar/SnackBarError.tsx';
import Grid from '@mui/material/Grid2';
import MainVenueCard from '../components/cards/mainVenueCard.tsx';
import { getValidatedHeader } from '../services/api/variables/headers.ts';
import theme from '../styles/mui-styles/MuiThemes.ts';
import Box from '@mui/material/Box';
const apiKey = import.meta.env.VITE_NOROFF_API_KEY;
function AllHostsPage() {
  const { name } = useParams();
  const [hostData, setHostData] = useState(null);
  const [venues, setVenues] = useState([]);
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
  if (loading) {
    return _jsx(LinearProgress, { color: 'secondary' });
  }
  return _jsx(Container, {
    maxWidth: 'md',
    children: _jsxs(Grid, {
      container: true,
      spacing: 0.5,
      marginTop: 2,
      children: [
        _jsx(Grid, {
          size: { xs: 12, sm: 5 },
          sx: {
            maxWidth: { xs: '100%', sm: '500px' },
            position: isSmallScreen ? 'static' : 'sticky',
            top: isSmallScreen ? 'auto' : '20px',
            alignSelf: 'flex-start',
          },
          children: _jsx(MainCard, {
            children: _jsx(Box, {
              mb: 2,
              children: hostData
                ? _jsx(HostDetails, { data: hostData })
                : _jsx('p', { children: 'No host data found' }),
            }),
          }),
        }),
        _jsx(Grid, {
          size: { xs: 12, sm: 7 },
          children:
            venues.length > 0
              ? venues.map((venue) =>
                  _jsx(Grid, { size: 12, children: _jsx(MainVenueCard, { venues: [venue] }) }, venue.id),
                )
              : _jsx('p', { children: 'No venues found for this host.' }),
        }),
      ],
    }),
  });
}
export default AllHostsPage;
