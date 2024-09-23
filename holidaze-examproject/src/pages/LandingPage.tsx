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
import { processVenueData } from '../services/filtering/filterLandingPage.ts';
import { snackBarError } from '../services/snackbar/SnackBarError.tsx';
import { LinearProgress } from '@mui/material';
import { ApiError } from '../services/interfaces/error/catchError.ts';

const apiKey = import.meta.env.VITE_NOROFF_API_KEY;
export default function LandingPage() {
  const [venueData, setVenueData] = useState<VenueData[]>([]);
  console.log('VenueData to be used for filtering from landing', venueData);
  const [filteredVenueData, setFilteredVenueData] = useState<VenueData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const headers = getValidatedHeader();

  const fetchVenueData = useCallback(
    debounce(async (searchValue: string) => {
      try {
        setLoading(true);
        const queryParams = { search: searchValue || '', id: '', owner: true, bookings: true };
        const endpoint = venuesEndpoint(queryParams);
        const response = await baseApiCall({
          url: endpoint,
          method: 'GET',
          headers: { ...headers, 'X-Noroff-Api-Key': apiKey },
        });

        sessionStorage.setItem(
          'countries',
          JSON.stringify(
            Array.from(
              new Set(
                (response.data as VenueData[])
                  .map((venue) => venue.location?.country || '')
                  .filter((country) => country && country.trim() !== ''),
              ),
            ),
          ),
        );

        setVenueData(response.data as VenueData[]);
        setFilteredVenueData(response.data as VenueData[]);
        processVenueData(response.data);
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
    fetchVenueData(searchTerm);
  }, [searchTerm]);

  if (loading) return <LinearProgress color="secondary"></LinearProgress>;

  return (
    <Container maxWidth="md" >
      <Grid container spacing={4} marginTop={4}>
        <Grid size={12}>
          <MainFilterCard onSearch={setSearchTerm} />
        </Grid>
        <Grid>
          <MainVenueCard venues={filteredVenueData} />
        </Grid>
      </Grid>
    </Container>
  );
}
