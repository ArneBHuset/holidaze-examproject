import React from 'react';
import MainCard from '../../layout/MainCard.tsx';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2'; // Use Grid2 for layout
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import DefaultSubTitle from '../titles/SubTitle.tsx';
import Calendar from '../calendar/Calendar.tsx';
import { List, ListItem, ListItemText } from '@mui/material';

function VenueSpecificDetails({ venue }) {
  const bookingEvents = venue.bookings?.map((booking) => ({
    title: `Booked by ${booking.customer?.name || 'Guest'}`,
    start: booking.dateFrom,
    end: booking.dateTo,
  }));
  return (
    <MainCard>
      <Box sx={{ padding: 1 }}>
        <Grid container spacing={2}>
          <Grid size={12} textAlign="center">
            <DefaultSubTitle>
              <Typography variant="h4" gutterBottom>
                {venue.name}
              </Typography>
            </DefaultSubTitle>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography variant="body1">
              <strong>Price:</strong> ${venue.price}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography variant="body1">
              <strong>Rating:</strong> {venue.rating || 'No rating available'}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
              <Typography variant="body1">
                <strong>Country:</strong>
              </Typography>
            <Typography variant="body1">{venue.location?.country || 'Not available'}</Typography>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Typography variant="body1">
              <strong>Max Guests:</strong> {venue.maxGuests}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <DefaultSubTitle>
              <Typography>Facility</Typography>
            </DefaultSubTitle>
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography>WiFi: {venue.meta?.wifi ? 'Yes' : 'No'}</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography>Breakfast: {venue.meta?.breakfast ? 'Yes' : 'No'}</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography>Pets Allowed: {venue.meta?.pets ? 'Yes' : 'No'}</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography>Parking Available: {venue.meta?.parking ? 'Yes' : 'No'}</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid size={{ xs: 12, sm: 12 }} sx={{ marginTop: 4 }}>
            <Calendar events={bookingEvents || []} />
          </Grid>
          <Grid size={{ xs: 12, sm: 12 }}>
            <DefaultSubTitle>
            <Typography variant="h6" gutterBottom>
              Meet your host
            </Typography>
            </DefaultSubTitle>
          </Grid>

          {venue.owner?.banner?.url && (
            <Grid size={{ xs: 12, sm: 12 }}>
              <img
                src={venue.owner.banner.url}
                alt={venue.owner.banner.alt || 'Owner banner'}
                aria-label={venue.owner.banner.alt}
                style={{ width: '100%', borderRadius: '8px', height: '90px' }}
              />
              <Box display={'flex'} alignItems={'center'} gap={{xs:2, sm:4}} sx={{marginTop: '-45px', marginLeft: '30px'}}>
              {venue.owner?.avatar?.url && (
                <Avatar
                  src={venue.owner.avatar.url}
                  alt={venue.owner.avatar.alt || 'Owner avatar'}
                  sx={{ width: {xs:'100px' }, height:{xs:'100px' }  }}
                />
              )}
              <Typography variant='h5' sx={{paddingTop:2}}>
                {venue.owner?.name}
              </Typography>
               unstyled button here named 'See host details'
              </Box>
            </Grid>
          )}

          <Grid size={{ xs: 12, sm: 12 }}>
            <Typography variant="body1">
              <strong>Name:</strong> {venue.owner?.name}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {venue.owner?.email}
            </Typography>
            <Typography variant="body2">
              <strong>Bio:</strong> {venue.owner?.bio || 'No bio available'}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 12 }}>
            <Typography variant="body2" sx={{ marginTop: 2 }}>
              <strong>Last Updated:</strong>{' '}
              {venue.updated
                ? new Date(venue.updated).toLocaleDateString()
                : new Date(venue.created).toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
}

export default VenueSpecificDetails;
