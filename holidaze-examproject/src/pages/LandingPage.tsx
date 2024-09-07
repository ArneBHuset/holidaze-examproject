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

const apiKey = import.meta.env.VITE_NOROFF_API_KEY;
export default function LandingPage() {
  const [venueData, setVenueData] = useState<VenueData[]>([]);
  const [filteredVenueData, setFilteredVenueData] = useState<VenueData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const headers = getValidatedHeader();

  const fetchVenueData = useCallback(
    debounce(async (searchValue: string) => {
      try {
        setLoading(true);
        const queryParams = { search: searchValue || '', id: '', owner: true, bookings: true };
        const endpoint = venuesEndpoint(queryParams);
        const response = await baseApiCall({ url: endpoint, method: 'GET', headers: { ...headers, 'X-Noroff-Api-Key': apiKey } });

        sessionStorage.setItem('countries', JSON.stringify(
          Array.from(new Set((response.data as VenueData[])
            .map(venue => venue.location?.country || '')
            .filter(country => country && country.trim() !== '')))
        ));

        setVenueData(response.data as VenueData[]);
        setFilteredVenueData(response.data as VenueData[]);
        processVenueData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      }
    }, 200),
    [headers]
  );

  useEffect(() => {
    fetchVenueData(searchTerm);
  }, [searchTerm]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;
  return (
    <Container maxWidth="sm">
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
