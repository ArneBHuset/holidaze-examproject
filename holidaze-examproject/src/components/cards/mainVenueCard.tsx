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
import PublicIcon from '@mui/icons-material/Public';
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
    <Grid container spacing={2}>
      {venues.map((venue) => (
        <Grid key={venue.id}>
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
            <Box padding={{ xs: 0.5, sm: 1 }} paddingRight={{ sm: 0 }}>
              <CardMedia
                component="img"
                alt={venue.media?.[0]?.alt || 'Venue image'}
                image={
                  venue.media?.[0]?.url ||
                  'https://media.istockphoto.com/vectors/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-vector-id1128826884?k=20&m=1128826884&s=170667a&w=0&h=_cx7HW9R4Uc_OLLxg2PcRXno4KERpYLi5vCz-NEyhi0='
                }
                sx={{
                  width: { xs: '100%', sm: 250 },
                  height: { xs: 200, sm: '100%' },
                  maxHeight: { xs: 200, sm: 260 },
                  borderRadius: { xs: '4px', sm: '8px' },
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
              <Grid container padding={1} spacing={1} sx={{ height: '100%' }}>
                <Grid size={{ xs: 12 }} textAlign={{ xs: 'center', sm: 'left' }}>
                  <DefaultSubTitle>{venue.name}</DefaultSubTitle>
                </Grid>
                <Grid size={{ xs: 6, sm: 12 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      textAlign: { xs: 'center', sm: 'left' },
                      paddingLeft: { xs: '10vw', sm: 0 },
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <EuroIcon sx={{ fontFamily: theme.typography.h4, mb: 0.5 }} />
                    {venue.price} / DAY
                  </Typography>
                </Grid>

                <Grid size={{ xs: 6, sm: 12 }}>
                  <Typography
                    variant="h4"
                    sx={{ paddingRight: { xs: 1, sm: 0 }, display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <PublicIcon />
                    {venue.location?.city && venue.location?.country
                      ? `${venue.location.city}, ${venue.location.country}`
                      : venue.location?.city || venue.location?.country || 'N/A'}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6, sm: 4 }} display="flex" alignItems="center" gap={0.5}>
                  <Typography
                    variant="h4"
                    sx={{ textAlign: { xs: 'start', sm: 'start', display: 'flex', alignItems: 'center', gap: 2 } }}
                  >
                    <PersonIcon />
                    {venue.maxGuests}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6, sm: 8 }} display="flex" alignItems="center" gap={0.5}>
                  <Typography
                    variant="h4"
                    paddingRight={{ xs: 0, sm: 8 }}
                    sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                  >
                    <GradeIcon />
                    {venue.rating || 'No rating'}
                  </Typography>
                </Grid>

                <Grid
                  sx={{
                    display: { xs: 'none', sm: 'flex' },
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'stretch',
                    width: '100%',
                    padding: 0,
                    marginTop: 'auto',
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
                      See more!
                      <ArrowForwardIosIcon />
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
