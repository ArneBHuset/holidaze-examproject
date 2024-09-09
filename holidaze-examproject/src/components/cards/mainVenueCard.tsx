import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2'; // Use Grid2 for layout
import Box from '@mui/material/Box';
import DefaultButton from '../../styles/mui-styles/components/defaultBtn.tsx';
import DefaultSubTitle from '../titles/SubTitle.tsx';
import PersonIcon from '@mui/icons-material/Person';
import GradeIcon from '@mui/icons-material/Grade';
import { useNavigate } from 'react-router-dom';

export default function MainVenueCard({ venues }) {
  const navigate = useNavigate();

  const handleNavigateToVenue = (id) => {
    navigate(`/venue/${id}`);
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
            }}
          >
            <Box padding={{ xs: 0.5, sm: 1 }} paddingRight={{ sm: 0 }}>
              <CardMedia
                component="img"
                alt={venue.media[0]?.alt || 'Venue image'}
                image={
                  venue.media[0]?.url ||
                  'https://media.istockphoto.com/vectors/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-vector-id1128826884?k=20&m=1128826884&s=170667a&w=0&h=_cx7HW9R4Uc_OLLxg2PcRXno4KERpYLi5vCz-NEyhi0='
                }
                sx={{
                  width: { xs: '100%', sm: 250 },
                  height: { xs: 200, sm: '100%' },
                  maxHeight: {xs: 200, sm: 260 },
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
                <Grid size={{ xs: 12 }} >
                  <DefaultSubTitle>
                    <Typography
                      gutterBottom
                      variant="h3"
                      textAlign={{ xs: 'center', sm: 'left' }}
                      maxHeight={75} overflow='hidden'

                      sx={{ marginTop: { xs: 1, sm: 0 }, marginBottom: 0 }}
                      maxWidth={'90%'}
                    >
                      {venue.name}
                    </Typography>
                  </DefaultSubTitle>
                </Grid>
                <Grid size={{ xs: 6, sm: 12 }}>
                  <Typography
                    variant="body1"
                    sx={{ textAlign: { xs: 'start', sm: 'start' }, paddingLeft: { xs: '10vw', sm: 0 } }}
                  >
                    <strong>Price:</strong> ${venue.price}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 6, sm: 12 }}>
                  <Typography variant="body1" sx={{ paddingRight: { xs: 1, sm: 0 } }}>
                    <strong>Country:</strong> {venue.location.country}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6, sm: 4 }} display="flex" alignItems="center" gap={0.5}>
                  <Box sx={{ paddingLeft: { xs: '10vw', sm: 0 } }}>
                    <PersonIcon />
                  </Box>
                  <Typography variant="body1" sx={{ textAlign: { xs: 'start', sm: 'start' } }}>
                    {venue.maxGuests}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6, sm: 8 }} display="flex" alignItems="center" gap={0.5}>
                  <Box>
                    <GradeIcon />
                  </Box>
                  <Typography variant="body1" paddingRight={{ xs: 0, sm: 8 }}>
                    {venue.rating}
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
                      onClick={() => handleNavigateToVenue(venue.id)}
                      sx={{
                        width: '100%',
                        borderBottomLeftRadius: { xs: 0, sm: 4 },
                        borderBottomRightRadius: { xs: 0, sm: 4 },
                        padding: { xs: 1, sm: 1.5 },
                      }}
                    >
                      Review and book!
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
                  onClick={() => handleNavigateToVenue(venue.id)}
                  sx={{
                    width: '100%',
                    borderBottomLeftRadius: { xs: 0, sm: 4 },
                    borderBottomRightRadius: { xs: 0, sm: 4 },
                    padding: { xs: 1, sm: 1.5 },
                  }}
                >
                  Review and book!
                </Button>
              </DefaultButton>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
