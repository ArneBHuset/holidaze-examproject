import React, { useState } from 'react';
import Calendar from '../calendar/Calendar.tsx';
import {  BookingData, CustomerData } from '../../services/interfaces/api/venueResponse.ts';
import VenueData from '../../services/interfaces/api/venueResponse.ts';
import Grid from '@mui/material/Grid2';
import DefaultSubTitle from '../titles/SubTitle.tsx';
import Typography from '@mui/material/Typography';
import HostDetails from '../profile/ProfileDisplay.tsx';
import CardContent from '@mui/material/CardContent';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import theme from '../../styles/mui-styles/MuiThemes.ts';
import PersonIcon from '@mui/icons-material/Person';
import { alpha } from '@mui/material';

interface BookingsOnVenueCardProps {
  venue: VenueData;
}

const BookingsOnVenueCard: React.FC<BookingsOnVenueCardProps> = ({ venue }) => {
  const [selectedBooking, setSelectedBooking] = useState<{
    customer: CustomerData | null;
    dateFrom: string;
    dateTo: string;
    guests: number;
    created: string;
    updated: string;
  } | null>(null);

  const bookingEvents = venue.bookings?.map((booking: BookingData) => ({
    title: `Booked by ${booking.customer?.name || 'Guest'}`,
    start: booking.dateFrom,
    end: booking.dateTo,
    extendedProps: {
      customer: booking.customer,
      dateFrom: booking.dateFrom,
      dateTo: booking.dateTo,
      guests: booking.guests,
      created: booking.created,
      updated: booking.updated,
    },
  }));
  const handleEventClick = (eventData: any) => {
    setSelectedBooking({
      customer: eventData.extendedProps.customer,
      dateFrom: eventData.extendedProps.dateFrom,
      dateTo: eventData.extendedProps.dateTo,
      guests: eventData.extendedProps.guests,
      created: eventData.extendedProps.created,
      updated: eventData.extendedProps.updated,
    });
  };

  return (
    <CardContent>
      <Grid container spacing={0}>
        <Grid size={12}>
          <Calendar events={bookingEvents || []} onEventClick={handleEventClick} />
        </Grid>
        <Grid size={12} sx={{ mt: 2 }}>
          {selectedBooking ? (
            <Grid container spacing={2}>
              <Grid size={12} width="100%">
                <DefaultSubTitle>Customer Details</DefaultSubTitle>
                <HostDetails
                  data={{
                    name: selectedBooking.customer?.name || 'Guest',
                    email: selectedBooking.customer?.email || 'No email provided',
                    bio: selectedBooking.customer?.bio || 'No bio available',
                    avatar: selectedBooking.customer?.avatar || { url: '', alt: 'Default avatar' },
                    banner: selectedBooking.customer?.banner || { url: '', alt: 'Default banner' },
                  }}
                />

              </Grid>
              <Grid size={12} width='100%' >
                  <Grid size={12} >
                <DefaultSubTitle>Booking Details</DefaultSubTitle>
                  </Grid>
                  <Grid size={12} my={1}  display='flex' alignItems='center'>
                <Typography variant="h6">{new Date(selectedBooking.dateFrom).toLocaleDateString()}</Typography>
                <ArrowForwardIcon sx={{ color: theme.palette.primary.light, fontFamily: theme.typography.h5 }} />
                <Typography variant="h6">{new Date(selectedBooking.dateTo).toLocaleDateString()}</Typography>
                  </Grid>
                  <Grid size={12} my={1}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PersonIcon sx={{ color: theme.palette.primary.light, fontFamily: theme.typography.h5 }} />
                  {selectedBooking.guests}/{venue.maxGuests}
                </Typography>
                  </Grid>
                  <Grid size={12} my={1}>
                <Typography variant="body2" sx={{color:alpha(theme.palette.primary.light,0.7)}}>
                  Last Updated: {selectedBooking.updated ? new Date(selectedBooking.updated).toLocaleDateString() : new Date(selectedBooking.created).toLocaleDateString()}
                </Typography>
                  </Grid>
              </Grid>
            </Grid>
          ) : (
            <Typography variant="h5">Click on an event to view the booking details.</Typography>
          )}
        </Grid>
      </Grid>
    </CardContent>
  );
};

export default BookingsOnVenueCard;
