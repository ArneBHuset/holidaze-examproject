import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VenueForm from '../components/forms/VenueForm.tsx';
import baseApiCall from '../services/api/apiMain.ts';
import { venuesEndpoint } from '../services/api/variables/endpoints/venueEndpoint.ts';
import { getValidatedHeader } from '../services/api/variables/headers.ts';
import { snackBarSuccess } from '../services/snackbar/SnackBarSuccess.tsx';
import { snackBarError } from '../services/snackbar/SnackBarError.tsx';
import MainCard from '../layout/MainCard.tsx';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DefaultButton from '../styles/mui-styles/components/defaultBtn.tsx';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import { ManageVenue } from '../services/interfaces/api/manageVenues.ts';

const apiKey = import.meta.env.VITE_NOROFF_API_KEY;

function NewVenuePage() {
  const navigate = useNavigate();

  const createVenue = async (venueData: ManageVenue) => {
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
      snackBarError('Failed to create venue. Please try again.');
    }
  };

  const seeManagedVenues = () => {
    navigate('/manage-venue');
  };

  return (
    <Container maxWidth="sm">
      <Grid>
        <Grid size={12} my={3}>
          <MainCard>
            <CardContent sx={{ mb: 0, pb: 0 }}>
              <Typography variant="h3" width="100%" textAlign="center">
                ADD A NEW VENUE!
              </Typography>
              <Box display="flex" justifyContent="end" mt={4} mb={-5} mr={-1}>
                <DefaultButton>
                  <Button onClick={seeManagedVenues}>See all your venues</Button>
                </DefaultButton>
              </Box>
            </CardContent>
          </MainCard>
        </Grid>
        <Grid size={12}>
          <VenueForm onSubmit={createVenue} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default NewVenuePage;
