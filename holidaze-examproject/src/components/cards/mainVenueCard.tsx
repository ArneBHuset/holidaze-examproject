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
import VenueData from '../../services/interfaces/api/venueResponse.ts';
import EuroIcon from '@mui/icons-material/Euro';
import PlaceIcon from '@mui/icons-material/Place';
import theme from '../../styles/mui-styles/MuiThemes.ts';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface MainVenueCardProps {
  venues: VenueData[];
}

export default function MainVenueCard({ venues }: MainVenueCardProps) {
  const navigate = useNavigate();

  const handleNavigateToVenue = (venue: VenueData) => {
    navigate(`/venue/${venue.id}`, { state: { venue } });
  };

  return (
    <Grid container spacing={1}>
      {venues.map((venue) => (
        <Grid key={venue.id} size={{xs:12}} >
          <Card
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              width: '100%',
              height: 'auto',
              borderBottomLeftRadius: { xs: 0, sm: 3 },
              borderBottomRightRadius: { xs: 0, sm: 3 },
              boxShadow: '3px 3px 15px rgba(73, 190, 248, 0.25)',
            }}
          >
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
                            : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${venue.location.city}, ${venue.location.country}`)}`
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

            <CardContent
              sx={{
                width: '100%',
                padding: { xs: 0, sm: 1 },
                marginBottom: { xs: 0, sm: 1 },
                paddingBottom: { xs: 0, sm: 1 },
                display: { xs: 'block', sm: 'none' },
              }}
              style={{ padding: 0 }}
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
                  See more!
                  <ArrowForwardIosIcon />
                </Button>
              </DefaultButton>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
