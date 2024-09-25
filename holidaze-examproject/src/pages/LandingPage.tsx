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
import { LinearProgress } from '@mui/material';
import { ApiError } from '../services/interfaces/error/catchError.ts';

const apiKey = import.meta.env.VITE_NOROFF_API_KEY;

export default function LandingPage() {
  const [venueData, setVenueData] = useState<VenueData[]>([]);
  const [filteredVenueData, setFilteredVenueData] = useState<VenueData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortField, setSortField] = useState<string>('price');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const headers = getValidatedHeader();

  const fetchVenueData = useCallback(
    debounce(async (searchValue: string, sortField: string, sortOrder: string) => {
      try {
        const queryParams = {
          search: searchValue || '',
          sort: sortField,
          sortOrder: sortOrder,
          owner: true,
          bookings: true,
        };
        const endpoint = venuesEndpoint(queryParams);
        console.log(endpoint);
        const response = await baseApiCall({
          url: endpoint,
          method: 'GET',
          headers: { ...headers, 'X-Noroff-Api-Key': apiKey },
        });

        setVenueData(response.data as VenueData[]);
        setFilteredVenueData(response.data as VenueData[]);
      } catch (error) {
        const apiError = error as ApiError;
        snackBarError(apiError.message || 'An error occurred while fetching data.');
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

  if (loading) return <LinearProgress color="secondary"></LinearProgress>;

  return (
    <Container maxWidth="lg">
      <Grid container spacing={1} marginTop={2}>
        <Grid size={{ xs: 12, sm: 4 }} maxWidth={{ xs: '100%', sm: '500px' }}>
          <MainFilterCard onSearch={setSearchTerm} onSortChange={handleSortChange} />
        </Grid>
        <Grid size={{ xs: 12, sm: 8 }}>
          <MainVenueCard venues={filteredVenueData} />
        </Grid>
      </Grid>
    </Container>
  );
}
