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
import UpdateBooking from '../forms/UpdateBooking.tsx';

export default function UpcomingBookingCard({ bookings = [] }) {
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  return (
    <Grid container spacing={2}>
      {bookings.map((booking) => {
        const { venue } = booking;
        const isUpdating = selectedBookingId === booking.id;

        if (!venue) return null;

        return (
          <Grid key={venue.id} size={12}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                width: '100%',
                height: 'auto',
                borderBottomLeftRadius: { xs: 0, sm: 3 },
                borderBottomRightRadius: { xs: 0, sm: 3 },
                boxShadow: isUpdating
                  ? '10px 10px 35px rgba(73, 190, 248, 0.5)'
                  : '3px 3px 15px rgba(73, 190, 248, 0.25)',
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
                  <Grid size={12}>
                    <DefaultSubTitle>
                      <Typography
                        gutterBottom
                        textAlign={{ xs: 'center', sm: 'left' }}
                        maxHeight={75}
                        overflow="hidden"
                        sx={{ marginTop: { xs: 1, sm: 0 }, marginBottom: 0 }}
                        maxWidth={'90%'}
                      >
                        {venue.name}
                      </Typography>
                    </DefaultSubTitle>
                  </Grid>

                  <Grid size={12} display="flex" justifyContent="space-between" marginTop={2}>
                    <Typography variant="body2">
                      <strong>Date From:</strong> {new Date(booking.dateFrom).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Date To:</strong> {new Date(booking.dateTo).toLocaleDateString()}
                    </Typography>
                  </Grid>

                  <Grid size={12} display="flex" justifyContent="space-between" marginTop={2}>
                    <Typography variant="body2">
                      <strong>Last Updated:</strong> {new Date(booking.updated).toLocaleString()}
                    </Typography>
                  </Grid>

                  {!isUpdating && (
                    <Grid size={12}>
                      <DefaultButton>
                        <Button
                          fullWidth
                          onClick={() => setSelectedBookingId(booking.id)}
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
                  )}
                </Grid>
              </CardContent>
            </Card>
            {isUpdating && (
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  width: '100%',
                  height: 'auto',
                  borderBottomLeftRadius: { xs: 0, sm: 3 },
                  borderBottomRightRadius: { xs: 0, sm: 3 },
                  boxShadow: '6px 6px 30px rgba(73, 190, 248, 0.4)', // Increase box shadow for the update form card
                  marginTop: 2,
                }}
              >
                <UpdateBooking booking={booking} onCancel={() => setSelectedBookingId(null)} />
              </Card>
            )}
          </Grid>
        );
      })}
    </Grid>
  );
}
