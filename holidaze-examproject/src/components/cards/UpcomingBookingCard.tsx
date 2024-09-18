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
import SecondaryButton from '../../styles/mui-styles/components/SecondaryBtn.tsx';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useTheme } from '@mui/material/styles';

export default function UpcomingBookingCard({ bookings = [] }) {
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const theme = useTheme()

  return (
    <Grid container spacing={2}>
      {bookings.map((booking) => {
        const { venue } = booking;
        const isUpdating = selectedBookingId === booking.id;

        if (!venue) return null;
        const dateFrom = new Date(booking.dateFrom);
        const dateTo = new Date(booking.dateTo);
        const duration = Math.ceil((dateTo - dateFrom) / (1000 * 60 * 60 * 24));

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
                  ? '8px 8px 6px rgba(73, 190, 248, 0.6)'
                  : '3px 3px 10px rgba(73, 190, 248, 0.25)',
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
                        {venue.name}
                    </DefaultSubTitle>
                  </Grid>

                  <Grid size={{xs:12, md:7}} display="flex" gap={2} alignItems='center' justifyContent='center'  marginTop={2} >
                    <Typography variant="h4">
                    {new Date(booking.dateFrom).toLocaleDateString()}
                    </Typography>
                    <ArrowCircleRightIcon sx={{color: theme.palette.secondary.main, fontSize:'2rem'}}/>
                    <Typography variant="h4">
                      {new Date(booking.dateTo).toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid size={{xs:12, md:4}} sx={{display:'flex', justifyContent:'center', alignItems:'center', pt:{xs:1, md:2}}}>
                    <Box >
                    <Typography variant="h4" >
                      {duration} {duration === 1 ? 'day' : 'days'}
                    </Typography>
                    </Box>
                  </Grid>


                  <Grid size={12} display="flex" justifyContent="space-between" marginTop={2}>
                    <Typography variant="body2">
                      <strong>Last Updated:</strong> {new Date(booking.updated).toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid size={6}>

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
                  </Grid>
                  {!isUpdating && (
                    <Grid size={6}>

                      <DefaultButton>
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
