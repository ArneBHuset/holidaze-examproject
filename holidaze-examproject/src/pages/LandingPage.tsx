import { useEffect, useState, useCallback } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import MainFilterCard from '../components/cards/MainFilterCard.tsx';
import MainVenueCard from '../components/cards/MainVenueCard.tsx';
import baseApiCall from '../services/api/apiMain.ts';
import { venuesEndpoint } from '../services/api/variables/endpoints/venueEndpoint.ts';
import { getValidatedHeader } from '../services/api/variables/headers.ts';
import debounce from '../services/utilities/debounce.ts';

const apiKey = import.meta.env.VITE_NOROFF_API_KEY; // Correct access to the env variable

export default function LandingPage() {
  const [venueData, setVenueData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const headers = getValidatedHeader();

  const fetchVenueData = useCallback(
    debounce(async (searchValue) => {
      try {
        setLoading(true);
        const endpoint = venuesEndpoint({
          search: searchValue ? searchValue : '',
          id: '',
          owner: true,
          bookings: true,
        });
        console.log(endpoint);
        const response = await baseApiCall({
          url: endpoint,
          method: 'GET',
          headers: {
            ...headers,
            'X-Noroff-Api-Key': apiKey,
          },
        });

        setVenueData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching venue data:', error);
        setError(error);
        setLoading(false); // Stop loading in case of error
      }
    }, 200),
    [headers]
  );

  // Fetches data when the search term changes
  useEffect(() => {
    fetchVenueData(searchTerm);
  }, [searchTerm]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }


  return (
    <Container maxWidth="sm">
      <Grid container spacing={4} marginTop={4}>
        <Grid xs={12}>
          <MainFilterCard onSearch={setSearchTerm} />
        </Grid>
        <Grid>
          <MainVenueCard venues={venueData} />
        </Grid>
      </Grid>
    </Container>
  );
}
