import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
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
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useTheme } from '@mui/material/styles';
import { BookingData } from '../../services/interfaces/api/bookingsData.ts';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';

export default function UpcomingBookingCard({ bookings = [] }: { bookings: BookingData[] }) {
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
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
        const duration = dateTo.diff(dateFrom, 'day');
        const daysUntilCheckIn = dateFrom.diff(dayjs(), 'day');
        const totalCost = venue.price * duration;

        return (
          <Grid container spacing={0} key={venue.id} size={12}>
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
                    width: { xs: '100%', sm: 300, md: 350 },
                    height: { xs: 200, sm: '100%' },
                    maxHeight: { xs: 200, sm: 350 },
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
                <Grid container padding={1} spacing={0} sx={{ height: '100%' }}>
                  <Grid size={12} textAlign={{ xs: 'center', sm: 'left' }}>
                    <DefaultSubTitle>{venue.name}</DefaultSubTitle>
                  </Grid>

                  {/* Days Until Check-in */}
                  <Grid size={12} textAlign={{ xs: 'center', sm: 'left' }} marginTop={2}>
                    <Typography variant="subtitle2">
                      {`Your booking in ${venue.location?.city || 'N/A'}, ${venue.location?.country || 'N/A'} is only `}
                      <span style={{ color: theme.palette.secondary.main }}>
                        {`${daysUntilCheckIn} ${daysUntilCheckIn === 1 ? 'day' : 'days'}`}
                      </span>
                      {` away!`}
                    </Typography>
                  </Grid>

                  <Grid
                    size={12}
                    display="flex"
                    gap={2}
                    alignItems="center"
                    justifyContent={{ xs: 'center', sm: 'left' }}
                    marginTop={2}
                  >
                    <Typography variant="h5">{dateFrom.format('DD/MM/YYYY')}</Typography>
                    <ArrowForwardIcon sx={{ color: theme.palette.primary.light, fontSize: '1.8rem' }} />
                    <Typography variant="h5">{dateTo.format('DD/MM/YYYY')}</Typography>
                  </Grid>

                  <Grid
                    size={12}
                    justifyContent={{ xs: 'center', sm: 'left' }}
                    gap={{ xs: 6, sm: 8 }}
                    sx={{ display: 'flex', alignItems: 'center', pt: { xs: 1, md: 2 } }}
                  >
                    <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AccessTimeIcon sx={{ fontSize: '2rem', color: theme.palette.secondary.main, pb: 0.5 }} />
                      {duration} {duration === 1 ? 'day' : 'days'}
                    </Typography>
                    <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PersonIcon sx={{ fontSize: '2rem', color: theme.palette.secondary.main, pb: 0.5 }} />
                      {booking.guests}/{venue.maxGuests}
                    </Typography>
                  </Grid>
                  <Grid size={12} mb={4}>
                    <Typography
                      textAlign={{ xs: 'center', sm: 'left' }}
                      variant="h4"
                      sx={{ marginTop: 1, textDecoration: 'underline' }}
                    >
                      Total Cost: ${totalCost.toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 0, sm: 3 }} display="flex" alignItems="end">
                    <Typography
                      variant="body2"
                      style={{ opacity: 0.7 }}
                      display={{ xs: 'none', sm: 'block', width: '100%' }}
                    >
                      Updated: {dayjs(booking.updated).format('DD/MM/YYYY')}
                    </Typography>
                  </Grid>
                  <Grid size={4}>
                    {!isUpdating && (
                      <SecondaryButton>
                        <Button
                          onClick={() => setSelectedBookingId(booking.id)}
                          sx={{
                            borderBottomLeftRadius: { xs: 0, sm: 4 },
                            borderBottomRightRadius: { xs: 0, sm: 4 },
                            padding: { xs: 1, sm: 1.5 },
                            gap: 2,
                            alignItems: 'center',
                            width: '100%',
                          }}
                        >
                          <EditIcon sx={{ fontSize: '1.2rem' }} /> Edit
                        </Button>
                      </SecondaryButton>
                    )}
                  </Grid>

                  <Grid size={5}>
                    <DefaultButton>
                      <Button
                        onClick={() => navigate(`/venue/${venue.id}`)}
                        sx={{
                          borderBottomLeftRadius: { xs: 0, sm: 4 },
                          borderBottomRightRadius: { xs: 0, sm: 4 },
                          padding: { xs: 1, sm: 1.5 },
                          width: '100%',
                        }}
                      >
                        Venue details <ArrowForwardIosIcon />
                      </Button>
                    </DefaultButton>
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
