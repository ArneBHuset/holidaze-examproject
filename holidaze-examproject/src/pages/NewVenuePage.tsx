import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddVenue from '../components/forms/AddVenue.tsx';
import baseApiCall from '../services/api/apiMain.ts';
import { venuesEndpoint } from '../services/api/variables/endpoints/venueEndpoint.ts';
import { getValidatedHeader } from '../services/api/variables/headers.ts';
import { snackBarSuccess } from '../services/snackbar/SnackBarSuccess.tsx';
import { snackBarError } from '../services/snackbar/SnackBarError.tsx';

const apiKey = import.meta.env.VITE_NOROFF_API_KEY;

function NewVenuePage() {
  const navigate = useNavigate();
  const createVenue = async (venueData: any) => {
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

  const handleVenueSubmit = (formData: any) => {
    createVenue(formData);
  };

  return (
    <Container maxWidth="sm">
      <AddVenue onSubmit={handleVenueSubmit} />
    </Container>
  );
}

export default NewVenuePage;
