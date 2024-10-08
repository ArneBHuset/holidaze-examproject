import { useEffect, useState, useCallback } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import MainFilterCard from '../components/cards/MainFilterCard.tsx';
import MainVenueCard from '../components/cards/mainVenueCard.tsx';
import baseApiCall from '../services/api/apiMain.ts';
import { venuesEndpoint } from '../services/api/variables/endpoints/venueEndpoint.ts';
import { getValidatedHeader } from '../services/api/variables/headers.ts';
import debounce from '../services/utilities/debounce.ts';
import VenueData from '../services/interfaces/api/venueResponse.ts';
import { snackBarError } from '../services/snackbar/SnackBarError.tsx';
import { LinearProgress, Typography, useMediaQuery } from '@mui/material';
import { ApiError } from '../services/interfaces/error/catchError.ts';
import { useTheme } from '@mui/material/styles';

const apiKey = import.meta.env.VITE_NOROFF_API_KEY;

/**
 * LandingPage that fetches and displays venue data based on search and filter options.
 */
export default function LandingPage() {
  const [filteredVenueData, setFilteredVenueData] = useState<VenueData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortField, setSortField] = useState<string>('created');
  const [sortOrder, setSortOrder] = useState<string>('desc');
  const headers = getValidatedHeader();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  /**
   * Fetches venue data based on search term, sort field, and sort order.
   * @param searchValue - The search term to filter venues.
   * @param sortField - The field to sort by (e.g., price, rating).
   * @param sortOrder - The order to sort by (asc/desc).
   */
  const fetchVenueData = useCallback(
    debounce(async (searchValue: string, sortField: string, sortOrder: string) => {
      try {
        setLoading(true);
        const queryParams = {
          search: searchValue || '',
          sort: sortField,
          sortOrder: sortOrder,
          owner: true,
          bookings: true,
        };
        const endpoint = venuesEndpoint(queryParams);
        const response = await baseApiCall({
          url: endpoint,
          method: 'GET',
          headers: { ...headers, 'X-Noroff-Api-Key': apiKey },
        });

        setFilteredVenueData(response.data as VenueData[]);
        setLoading(false);
      } catch (error) {
        const apiError = error as ApiError;
        snackBarError(apiError.message || 'An error occurred while fetching data.');
        setLoading(false);
      }
    }, 150),
    [headers],
  );

  useEffect(() => {
    fetchVenueData(searchTerm, sortField, sortOrder);
  }, [searchTerm, sortField, sortOrder]);

  const handleSortChange = useCallback((field: string, order: string) => {
    setSortField(field);
    setSortOrder(order);
  }, []);

  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  return (
    <Container maxWidth="md" sx={{ padding: 0 }}>
      <Grid container spacing={1} marginTop={2}>
        <Grid
          size={{ xs: 12, sm: 4 }}
          sx={{
            maxWidth: { xs: '100%', sm: '500px' },
            position: isSmallScreen ? 'static' : 'sticky',
            top: isSmallScreen ? 'auto' : '20px',
            alignSelf: 'flex-start',
          }}
        >
          <MainFilterCard onSearch={handleSearchChange} onSortChange={handleSortChange} />
        </Grid>
        <Grid size={{ xs: 12, sm: 8 }}>
          {loading ? <LinearProgress color="secondary" /> : null}
          {filteredVenueData.length === 0 && !loading ? (
            <Typography variant="h3" marginY={10} width="100%" align="center" color="primary.light">
              No venues found
            </Typography>
          ) : (
            <MainVenueCard venues={filteredVenueData} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
