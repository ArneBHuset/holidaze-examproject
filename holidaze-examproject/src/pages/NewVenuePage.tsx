import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NewVenueForm from '../components/forms/NewVenueForm.tsx';
import baseApiCall from '../services/api/apiMain.ts';
import { venuesEndpoint } from '../services/api/variables/endpoints/venueEndpoint.ts';
import { getValidatedHeader } from '../services/api/variables/headers.ts';
import { snackBarSuccess } from '../services/snackbar/SnackBarSuccess.tsx';
import { snackBarError } from '../services/snackbar/SnackBarError.tsx';
import MainCard from '../layout/MainCard.tsx';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import { VenueCreateUpdate } from '../services/interfaces/api/VenueCreateUpdate.ts';
import { ApiError } from '../services/interfaces/error/catchError.ts';

const apiKey = import.meta.env.VITE_NOROFF_API_KEY;

/**
 * NewVenuePage is a page component for creating a new venue.
 * It includes a form for adding a new venue and submits the form data to the API.
 */
function NewVenuePage() {
  const navigate = useNavigate();
  const createVenue = async (venueData: VenueCreateUpdate) => {
    const headers = getValidatedHeader();
    try {
      const response = await baseApiCall({
        url: venuesEndpoint(),
        method: 'POST',
        headers: { ...headers, 'X-Noroff-Api-Key': apiKey },
        body: JSON.stringify(venueData),
      });

      if (response?.data) {
        snackBarSuccess('Success! Welcome to your new Venue');
        const venueId = response.data.id;
        navigate(`/venue/${venueId}`);
      }
    } catch (error) {
      const apiError = error as ApiError;
      const errorMessage = apiError.message || 'An unknown error occurred';
      snackBarError(errorMessage);
    }
  };
  return (
    <Container maxWidth="md">
      <Grid container>
        <Grid size={12} my={2}>
          <MainCard>
            <CardContent sx={{ margin: 2 }}>
              <Typography variant="h3" width="100%" textAlign="center">
                POST A NEW VENUE!
              </Typography>
            </CardContent>
          </MainCard>
        </Grid>
        <Grid size={12} mb={4}>
          <MainCard>
            <NewVenueForm onSubmit={createVenue} />
          </MainCard>
        </Grid>
      </Grid>
    </Container>
  );
}

export default NewVenuePage;
