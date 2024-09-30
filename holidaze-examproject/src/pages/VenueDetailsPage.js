import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useLocation, useParams } from 'react-router-dom';
import VenueSpecificDetails from '../components/cards/VenueSpecificDetails.tsx';
import ImageDisplayCard from '../components/cards/ImageDisplayCard.tsx';
import Grid from '@mui/material/Grid2';
import { Container, Typography, Button, LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import DefaultBottomNavigation from '../styles/mui-styles/components/BottomNavigation.tsx';
import BookVenueDrawer from '../components/forms/NewBooking.tsx';
import baseApiCall from '../services/api/apiMain.ts';
import { venuesEndpoint } from '../services/api/variables/endpoints/venueEndpoint.ts';
import { snackBarError } from '../services/snackbar/SnackBarError.tsx';
import { getValidatedHeader } from '../services/api/variables/headers.ts';
import { useUser } from '../services/utilities/UserTypeContext.tsx';
const apiKey = import.meta.env.VITE_NOROFF_API_KEY;
/**
 * VenueDetailsPage component renders details about a venue including images, specific details, and booking options.
 * @returns JSX.Element
 */
export default function VenueDetailsPage() {
  const location = useLocation();
  const { state } = location;
  const { id } = useParams();
  const [venue, setVenue] = useState(state?.venue || null);
  const [loading, setLoading] = useState(false);
  const headers = getValidatedHeader();
  const { isVenueManager } = useUser();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (_anchor, open) => (event) => {
    if (event.type === 'keydown' && 'key' in event && (event.key === 'Tab' || event.key === 'Shift')) {
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
            snackBarError('Unknown error occurred');
          }
        } catch (error) {
          const apiError = error;
          snackBarError(apiError.message || 'Unknown error');
        } finally {
          setLoading(false);
        }
      };
      fetchVenueData();
    }
  }, [venue, id]);
  if (loading) return _jsx(LinearProgress, { color: 'secondary', 'aria-label': 'Loading venue details' });
  if (!venue) {
    return _jsx(Typography, { variant: 'h6', color: 'error', children: 'Error: Venue details could not be loaded.' });
  }
  return _jsxs(Container, {
    maxWidth: 'md',
    children: [
      _jsxs(Grid, {
        container: true,
        spacing: 1,
        mt: 2,
        mb: 8,
        children: [
          _jsx(Grid, {
            size: { xs: 12, sm: 4 },
            marginBottom: 2,
            children: _jsx(ImageDisplayCard, { venueMedia: venue.media ?? [] }),
          }),
          _jsx(Grid, { size: { xs: 12, sm: 8 }, children: _jsx(VenueSpecificDetails, { venue: venue }) }),
        ],
      }),
      !isVenueManager &&
        _jsx(DefaultBottomNavigation, {
          children: _jsx(Button, {
            sx: { width: '100%' },
            onClick: toggleDrawer('bottom', true),
            'aria-label': 'Book venue drawer',
            children: 'BOOK VENUE',
          }),
        }),
      _jsx(BookVenueDrawer, { open: drawerOpen, toggleDrawer: toggleDrawer, venue: venue }),
    ],
  });
}
