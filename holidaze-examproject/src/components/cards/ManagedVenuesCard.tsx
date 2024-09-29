import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import DefaultButton from '../../styles/mui-styles/components/defaultBtn.tsx';
import DefaultSubTitle from '../titles/SubTitle.tsx';
import PersonIcon from '@mui/icons-material/Person';
import GradeIcon from '@mui/icons-material/Grade';
import { useNavigate } from 'react-router-dom';
import EuroIcon from '@mui/icons-material/Euro';
import PlaceIcon from '@mui/icons-material/Place';
import theme from '../../styles/mui-styles/MuiThemes.ts';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EditIcon from '@mui/icons-material/Edit';
import MainCard from '../../layout/MainCard.tsx';
import UpdateVenueForm from '../forms/UpdateVenueForm.tsx';
import SecondaryButton from '../../styles/mui-styles/components/SecondaryBtn.tsx';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import baseApiCall from '../../services/api/apiMain.ts';
import { snackBarSuccess } from '../../services/snackbar/SnackBarSuccess.tsx';
import { snackBarError } from '../../services/snackbar/SnackBarError.tsx';
import { venuesEndpoint } from '../../services/api/variables/endpoints/venueEndpoint.ts';
import { getValidatedHeader } from '../../services/api/variables/headers.ts';
import { VenueData } from '../../services/interfaces/api/bookingsData.ts';
import { VenueCreateUpdate } from '../../services/interfaces/api/VenueCreateUpdate.ts';

interface MainVenueCardProps {
  venues: VenueData[];
  refreshVenues: () => void;
}

/**
 * MainVenueCard component displays a list of venues and allows editing or deleting them.
 * It also allows navigation to the detailed view of a venue.
 * @param {Object} props - The component props.
 * @param {ManageVenue[]} props.venues - An array of venue objects that contain details of each venue.
 * @param {Function} props.refreshVenues - A function to refresh the list of venues after an update or deletion.
 *
 * @returns {JSX.Element} The JSX element for rendering the list of venues with edit and delete functionality.
 */
export default function MainVenueCard({ venues, refreshVenues }: MainVenueCardProps) {
  const [isEditing, setIsEditing] = useState<string | null>(null);

  const apiKey = import.meta.env.VITE_NOROFF_API_KEY;
  const navigate = useNavigate();

  const changeVenue = async (venueId: string, method: 'PUT' | 'DELETE', data?: VenueCreateUpdate) => {
    console.log(data);
    const headers = getValidatedHeader();
    try {
      const response = await baseApiCall({
        url: venuesEndpoint({ id: venueId }),
        method,
        headers: { ...headers, 'X-Noroff-Api-Key': apiKey },
        body: method === 'PUT' && data ? JSON.stringify(data) : undefined,
      });
      console.log(response);
      if (method === 'PUT' && response?.data) {
        snackBarSuccess('Venue updated successfully!');
        refreshVenues();
        setIsEditing(null);
      } else if (method === 'DELETE') {
        snackBarSuccess('Venue deleted successfully!');
        refreshVenues();
        setIsEditing(null);
      }
    } catch (error) {
      snackBarError(
        method === 'DELETE' ? 'Error deleting venue. Please try again.' : 'Error updating venue. Please try again.',
      );
      console.error(`${method} venue error:`, error);
    }
  };
  const handleNavigateToVenue = (venue: VenueData) => {
    navigate(`/venue/${venue.id}`, { state: { venue } });
  };

  return (
    <Grid container spacing={1}>
      {venues.map((venue) => {
        const isEditingVenue = isEditing === venue.id;

        return (
          <Grid key={venue.id} size={{ xs: 12 }}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                width: '100%',
                height: 'auto',
                mb: 1,
                borderBottomLeftRadius: { xs: 0, sm: 3 },
                borderBottomRightRadius: { xs: 0, sm: 3 },
                boxShadow: isEditingVenue
                  ? '8px 8px 6px rgba(73, 190, 248, 0.6)'
                  : '3px 3px 10px rgba(73, 190, 248, 0.25)',
              }}
            >
              {/* Venue Media */}
              <Box padding={{ xs: 0.5, sm: 0.5 }} paddingRight={{ sm: 0 }}>
                <CardMedia
                  component="img"
                  alt={venue.media?.[0]?.alt || 'Venue image'}
                  src={
                    venue.media?.[0]?.url ||
                    'https://th.bing.com/th/id/R.957f5c1b65e9ae5f3c068ac1349d0f1f?rik=pzYV5kEHwRtrgg&pid=ImgRaw&r=0'
                  }
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://th.bing.com/th/id/R.957f5c1b65e9ae5f3c068ac1349d0f1f?rik=pzYV5kEHwRtrgg&pid=ImgRaw&r=0';
                  }}
                  sx={{
                    width: { xs: '100%', sm: 200 },
                    height: { xs: 200, sm: '200px' },
                    maxHeight: { xs: 200, sm: 260 },
                    borderRadius: { xs: '4px', sm: '6px' },
                  }}
                />
              </Box>
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: { xs: 1 },
                }}
                style={{ padding: 0 }}
              >
                <Grid
                  container
                  padding={0.5}
                  spacing={1}
                  sx={{ height: '100%' }}
                  mb={{ xs: 2, sm: 0 }}
                  display="flex"
                  mx="auto"
                  justifyContent="center"
                >
                  <Grid size={{ xs: 12 }} textAlign={{ xs: 'center', sm: 'left' }} maxHeight="40px" overflow="hidden">
                    <DefaultSubTitle>{venue.name}</DefaultSubTitle>
                  </Grid>

                  <Grid size={{ xs: 6, sm: 12 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        pl: { xs: 6, sm: 0 },
                        textAlign: { xs: 'center', sm: 'left' },
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <EuroIcon sx={{ fontFamily: theme.typography.h6, mb: 0.2 }} />
                      {venue.price} / DAY
                    </Typography>
                  </Grid>

                  <Grid size={{ xs: 6, sm: 12 }}>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {venue.location?.city && venue.location?.country ? (
                        <a
                          href={
                            venue.location.lat && venue.location.lng
                              ? `https://www.google.com/maps?q=${venue.location.lat},${venue.location.lng}`
                              : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                  `${venue.location.city}, ${venue.location.country}`,
                                )}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            textDecoration: 'none',
                            color: theme.palette.text.primary,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                          }}
                        >
                          <PlaceIcon
                            sx={{
                              color: theme.palette.primary.light,
                              fontFamily: theme.typography.h6,
                              transition: 'transform 0.2s ease-in-out',
                              '&:hover': { transform: 'scale(1.2)' },
                            }}
                          />
                          {`${venue.location.city}, ${venue.location.country}`}
                        </a>
                      ) : (
                        venue.location?.city || venue.location?.country || 'N/A'
                      )}
                    </Typography>
                  </Grid>

                  <Grid size={{ xs: 6, sm: 3 }} display="flex" alignItems="center">
                    <Typography
                      variant="h6"
                      sx={{ pl: { xs: 6, sm: 0 }, textAlign: 'left', display: 'flex', alignItems: 'center', gap: 0.5 }}
                    >
                      <PersonIcon sx={{ fontFamily: theme.typography.h5, mb: 0.2 }} />
                      {venue.maxGuests}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 9 }} display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center gap', gap: 0.5 }}>
                      <GradeIcon sx={{ fontFamily: theme.typography.h5, mb: 0.2 }} />
                      {venue.rating || 0}
                    </Typography>
                  </Grid>

                  <Grid
                    size={12}
                    sx={{
                      display: { xs: 'none', sm: 'flex' },
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      alignItems: 'stretch',
                      width: '100%',
                      padding: 0,
                    }}
                  >
                    <DefaultButton>
                      <Button
                        onClick={() => handleNavigateToVenue(venue)}
                        sx={{
                          width: '100%',
                          borderBottomLeftRadius: { xs: 0, sm: 4 },
                          borderBottomRightRadius: { xs: 0, sm: 4 },
                          padding: { xs: 1, sm: 1.5 },
                          gap: 4,
                        }}
                      >
                        See details
                        <ArrowForwardIosIcon sx={{ fontFamily: theme.typography.h5 }} />
                      </Button>
                    </DefaultButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {!isEditingVenue && (
              <Card
                sx={{
                  display: 'flex',
                  justifyContent: 'right',
                  gap: 2,
                  width: '100%',
                  height: 'auto',
                  mt: 0.5,
                  p: 1,
                  boxShadow: '3px 3px 10px rgba(73, 190, 248, 0.25)',
                  borderBottomLeftRadius: { xs: 0, sm: 3 },
                  borderBottomRightRadius: { xs: 0, sm: 3 },
                }}
              >
                <SecondaryButton>
                  <Button onClick={() => setIsEditing(venue.id)} sx={{ width: '50%' }}>
                    <EditIcon />
                    Edit
                  </Button>
                </SecondaryButton>
                <SecondaryButton>
                  <Button onClick={() => handleNavigateToVenue(venue)} sx={{ width: '50%' }}>
                    See guests
                    <PersonIcon />
                  </Button>
                </SecondaryButton>
              </Card>
            )}

            {isEditingVenue && (
              <MainCard>
                <Grid container spacing={1}>
                  <Grid size={12} p={1} textAlign="center">
                    <DefaultSubTitle>EDIT VENUE</DefaultSubTitle>
                  </Grid>
                  <Grid size={12}>
                    <UpdateVenueForm
                      initialValues={{
                        ...venue,
                        location: {
                          address: venue.location?.address || '',
                          city: venue.location?.city || '',
                          zip: venue.location?.zip || '',
                          country: venue.location?.country || '',
                        },
                        media: venue.media?.map((item) => ({ url: item.url, alt: item.alt || '' })) || [],
                      }}
                      onDelete={() => changeVenue(venue.id!, 'DELETE')}
                      onSubmit={(data) => changeVenue(venue.id!, 'PUT', data)}
                    />
                  </Grid>
                  <Grid size={12}>
                    <DefaultButton>
                      <Button fullWidth onClick={() => setIsEditing(null)}>
                        Cancel
                        <KeyboardArrowUpIcon />
                      </Button>
                    </DefaultButton>
                  </Grid>
                </Grid>
              </MainCard>
            )}
          </Grid>
        );
      })}
    </Grid>
  );
}
