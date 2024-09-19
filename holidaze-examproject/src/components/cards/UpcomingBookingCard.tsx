import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs'; // Import dayjs
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
import SecondaryButton from '../../styles/mui-styles/components/SecondaryBtn.tsx';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useTheme } from '@mui/material/styles';

export default function UpcomingBookingCard({ bookings = [] }) {
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Grid container spacing={2}>
      {bookings.map((booking) => {
        const { venue } = booking;
        const isUpdating = selectedBookingId === booking.id;

        if (!venue) return null;

        const dateFrom = dayjs(booking.dateFrom);
        const dateTo = dayjs(booking.dateTo);
        const duration = dateTo.diff(dateFrom, 'day'); // Calculate duration in days
        const daysUntilCheckIn = dateFrom.diff(dayjs(), 'day'); // Days until check-in
        const totalCost = venue.price * duration; // Calculate total cost

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
                boxShadow: isUpdating ? '8px 8px 6px rgba(73, 190, 248, 0.6)' : '3px 3px 10px rgba(73, 190, 248, 0.25)',
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
                    <DefaultSubTitle>{venue.name}</DefaultSubTitle>
                  </Grid>

                  {/* Days Until Check-in */}
                  <Grid size={12}>
                    <Typography>{`Your booking at ${venue.location?.city || 'N/A'}, ${
                      venue.location?.country || 'N/A'
                    } is only ${daysUntilCheckIn} ${daysUntilCheckIn === 1 ? 'day' : 'days'} away.`}</Typography>
                  </Grid>

                  <Grid
                    size={{ xs: 12, md: 7 }}
                    display="flex"
                    gap={2}
                    alignItems="center"
                    justifyContent="center"
                    marginTop={2}
                  >
                    <Typography variant="h4">{dateFrom.format('DD/MM/YYYY')}</Typography>
                    <ArrowForwardIcon sx={{ color: theme.palette.primary.light, fontSize: '1.8rem' }} />
                    <Typography variant="h4">{dateTo.format('DD/MM/YYYY')}</Typography>
                  </Grid>

                  <Grid
                    size={{ xs: 12, md: 4 }}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: { xs: 1, md: 2 } }}
                  >
                    <Box>
                      <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AccessTimeIcon sx={{ fontSize: '2rem', color: theme.palette.secondary.main, pb: 0.5 }} />
                        {duration} {duration === 1 ? 'day' : 'days'}
                      </Typography>
                      <Typography variant="h5" sx={{ marginTop: 1 }}>
                        <strong>Total Cost:</strong> ${totalCost.toFixed(2)}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid size={6}>
                    {!isUpdating && (
                      <SecondaryButton>
                        <Button
                          onClick={() => setSelectedBookingId(booking.id)}
                          sx={{
                            borderBottomLeftRadius: { xs: 0, sm: 4 },
                            borderBottomRightRadius: { xs: 0, sm: 4 },
                            padding: { xs: 1, sm: 1.5 },
                          }}
                        >
                          Update booking
                        </Button>
                      </SecondaryButton>
                    )}
                  </Grid>

                  <Grid size={6}>
                    <DefaultButton>
                      <Button
                        onClick={() => navigate(`/venue/${venue.id}`)}
                        sx={{
                          borderBottomLeftRadius: { xs: 0, sm: 4 },
                          borderBottomRightRadius: { xs: 0, sm: 4 },
                          padding: { xs: 1, sm: 1.5 },
                        }}
                      >
                        See booking details
                      </Button>
                    </DefaultButton>
                  </Grid>

                  <Grid size={12} display="flex" justifyContent="space-between" marginTop={2}>
                    <Typography variant="body2">
                      <strong>Last Updated:</strong> {dayjs(booking.updated).format('DD/MM/YYYY, h:mm A')}
                    </Typography>
                  </Grid>
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
                  boxShadow: '6px 6px 30px rgba(73, 190, 248, 0.4)',
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
