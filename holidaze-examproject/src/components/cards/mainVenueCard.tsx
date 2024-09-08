import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2'; // Use Grid2 for layout
import React from 'react';
import Box from '@mui/material/Box';
import DefaultButton from '../../styles/mui-styles/components/defaultBtn.tsx';

export default function MainVenueCard({ venues }) {
  return (
    <Grid container spacing={2}>
      {venues.map((venue) => (
        <Grid key={venue.id} >
          <Card
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              width: '100%',
              height: 'auto',
              borderBottomLeftRadius: { xs: 0, sm: 0 },
              borderBottomRightRadius: { xs: 0, sm: 0 },
            }}
          >
            <Box padding={{ xs: 0.5, sm: 1 }} paddingRight={{sm:0}}>
              <CardMedia
                component="img"
                alt={venue.media[0]?.alt || 'Venue image'}
                image={
                  venue.media[0]?.url ||
                  'https://media.istockphoto.com/vectors/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-vector-id1128826884?k=20&m=1128826884&s=170667a&w=0&h=_cx7HW9R4Uc_OLLxg2PcRXno4KERpYLi5vCz-NEyhi0='
                }
                sx={{
                  width: { xs: '100%', sm: 300 },
                  height: { xs: 200, sm: '100%' },
                  borderRadius: { xs: '4px', sm: '8px' },
                }}
              />
            </Box>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: { xs: '100%', sm: '75%' },
                padding: { xs: 1 },
              }}
              style={{ padding: 0 }}
            >
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <Typography gutterBottom variant="h3" textAlign="center" sx={{marginTop: 1}}>
                    {venue.name}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography
                    variant="body1"
                    sx={{ marginTop: { xs: 0.5, sm: 1 }, textAlign: { xs: 'end', sm: 'start' } }}
                  >
                    <strong>Price:</strong> ${venue.price}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                    <strong>Rating:</strong> {venue.rating}
                  </Typography>
                </Grid>
                <Grid>
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                    <strong>Country:</strong> {venue.location.country}
                  </Typography>
                </Grid>
                <Grid>
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                    <strong>Max Guests:</strong> {venue.maxGuests}
                  </Typography>
                </Grid>
                <Grid sx={{display: {xs: 'none', sm: 'block'}, width:'100%', padding: 1}}>
                <DefaultButton >
                  <Button
                    sx={{
                      width: '100%',
                      borderBottomLeftRadius: { xs: 0, sm: 4 },
                      borderBottomRightRadius: { xs: 0, sm: 4 },
                      padding: { xs: 1, sm: 1.5 },
                      fontSize: { xs: '0.9rem', sm: '1.1rem' },
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
                display: {xs: 'block', sm: 'none'}
              }}
              style={{ padding: 0 }}
            >
              <DefaultButton>
                <Button
                  sx={{
                    width: '100%',
                    borderBottomLeftRadius: { xs: 0, sm: 4 },
                    borderBottomRightRadius: { xs: 0, sm: 4 },
                    padding: { xs: 1, sm: 1.5 },
                    fontSize: { xs: '0.9rem', sm: '1.1rem' },
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
