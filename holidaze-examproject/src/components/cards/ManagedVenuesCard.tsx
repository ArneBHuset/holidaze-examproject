import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import DefaultButton from '../../styles/mui-styles/components/defaultBtn.tsx';
import SecondaryButton from '../../styles/mui-styles/components/SecondaryBtn.tsx';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EditIcon from '@mui/icons-material/Edit';
import VenueData from '../../services/interfaces/api/venueResponse.ts';
import VenueForm from '../forms/VenueForm.tsx';
import baseApiCall from '../../services/api/apiMain.ts';
import { getValidatedHeader } from '../../services/api/variables/headers.ts';
import { snackBarSuccess } from '../../services/snackbar/SnackBarSuccess.tsx';
import { snackBarError } from '../../services/snackbar/SnackBarError.tsx';

const apiKey = import.meta.env.VITE_NOROFF_API_KEY;

interface ManagedVenuesCardProps {
  venues: VenueData[];
}

export default function ManagedVenuesCard({ venues }: ManagedVenuesCardProps) {
  const navigate = useNavigate();
  const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null);

  const handleEditVenue = (venueId: string) => {
    setSelectedVenueId(venueId);
  };

  const handleCancelUpdate = () => {
    setSelectedVenueId(null);
  };

  const updateVenue = async (venueData: any, venueId: string) => {
    try {
      const headers = getValidatedHeader();
      await baseApiCall({
        url: `/holidaze/venues/${venueId}`,
        method: 'PUT',
        headers: { ...headers, 'X-Noroff-Api-Key': apiKey },
        body: JSON.stringify(venueData),
      });
      snackBarSuccess('Venue updated successfully!');
      setSelectedVenueId(null);
    } catch (error) {
      snackBarError('Failed to update venue. Please try again.');
    }
  };

  const deleteVenue = async (venueId: string) => {
    try {
      const headers = getValidatedHeader();
      await baseApiCall({
        url: `/holidaze/venues/${venueId}`,
        method: 'DELETE',
        headers: { ...headers, 'X-Noroff-Api-Key': apiKey },
      });
      snackBarSuccess('Venue deleted successfully!');
      setSelectedVenueId(null);
    } catch (error) {
      snackBarError('Failed to delete venue. Please try again.');
    }
  };

  return (
    <Grid container spacing={2}>
      {venues.map((venue) => {
        const isEditing = selectedVenueId === venue.id;

        return (
          <Grid key={venue.id} size={12}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                width: '100%',
                height: 'auto',
                boxShadow: isEditing ? '8px 8px 6px rgba(73, 190, 248, 0.6)' : '3px 3px 10px rgba(73, 190, 248, 0.25)',
              }}
            >
              <Box padding={{ xs: 0.5, sm: 1 }} paddingRight={{ sm: 0 }}>
                <CardMedia
                  component="img"
                  alt={venue.media?.[0]?.alt || 'Venue image'}
                  image={venue.media?.[0]?.url || 'https://via.placeholder.com/250'}
                  sx={{
                    width: { xs: '100%', sm: 250 },
                    height: { xs: 200, sm: '100%' },
                    maxHeight: { xs: 200, sm: 260 },
                    borderRadius: { xs: '4px', sm: '8px' },
                  }}
                />
              </Box>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', padding: { xs: 1 } }}>
                <Typography variant="h5">{venue.name}</Typography>
                <Typography variant="body1">
                  <strong>Price:</strong> ${venue.price}
                </Typography>
                <Typography variant="body1">
                  <strong>Country:</strong> {venue.location?.country || 'N/A'}
                </Typography>

                <Grid container spacing={2} paddingTop={2}>
                  <Grid size={6}>
                    <SecondaryButton>
                      <Button
                        onClick={() => handleEditVenue(venue.id)}
                        sx={{
                          width: '100%',
                        }}
                      >
                        <EditIcon sx={{ fontSize: '1.2rem', marginRight: 1 }} />
                        Edit
                      </Button>
                    </SecondaryButton>
                  </Grid>
                  <Grid size={6}>
                    <DefaultButton>
                      <Button
                        onClick={() => navigate(`/venue/${venue.id}`)}
                        sx={{
                          width: '100%',
                        }}
                      >
                        Venue Details <ArrowForwardIosIcon />
                      </Button>
                    </DefaultButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {isEditing && (
              <Box mt={2}>
                <VenueForm
                  initialValues={venue}
                  onSubmit={(data) => updateVenue(data, venue.id)}
                  submitLabel="Save Changes"
                />
                <Button variant="outlined" color="error" fullWidth sx={{ mt: 2 }} onClick={() => deleteVenue(venue.id)}>
                  Delete Venue
                </Button>
                <Button fullWidth sx={{ mt: 2 }} onClick={handleCancelUpdate}>
                  Cancel
                </Button>
              </Box>
            )}
          </Grid>
        );
      })}
    </Grid>
  );
}
