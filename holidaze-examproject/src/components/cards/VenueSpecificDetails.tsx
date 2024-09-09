import React from 'react';
import MainCard from '../../layout/MainCard.tsx';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2'; // Use Grid2 for layout
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import DefaultSubTitle from '../titles/SubTitle.tsx';

function VenueSpecificDetails({ venue }) {
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
          <Grid size={{ xs: 12, sm: 12 }}>
            <Typography variant="body1">
              <strong>Price:</strong> ${venue.price}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 12 }}>
            <Typography variant="body1">
              <strong>Rating:</strong> {venue.rating || 'No rating available'}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 12 }}>
            <Typography variant="body1">
              <strong>Country:</strong> {venue.location?.country || 'Not available'}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 12 }}>
            <Typography variant="body1">
              <strong>Max Guests:</strong> {venue.maxGuests}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 12 }}>
            <Typography variant="body1">
              <strong>Features:</strong>
              {venue.meta?.wifi && ' WiFi,'}
              {venue.meta?.breakfast && ' Breakfast,'}
              {venue.meta?.pets && ' Pets,'}
              {venue.meta?.parking && ' Parking'}
            </Typography>
          </Grid>

          {venue.bookings?.length > 0 && (
            <Grid size={{ xs: 12, sm: 12 }}>
              <Typography variant="body1">
                <strong>Bookings:</strong>
              </Typography>
              {venue.bookings.map((booking) => (
                <Box key={booking.id} sx={{ marginLeft: 2 }}>
                  <Typography variant="body2">From: {new Date(booking.dateFrom).toLocaleDateString()}</Typography>
                  <Typography variant="body2">To: {new Date(booking.dateTo).toLocaleDateString()}</Typography>
                </Box>
              ))}
            </Grid>
          )}

          <Grid size={{ xs: 12, sm: 12 }}>
            <Typography variant="h6" gutterBottom>
              <strong>Owner Details:</strong>
            </Typography>
          </Grid>

          {venue.owner?.banner?.url && (
            <Grid size={{ xs: 12, sm: 12 }}>
              <img
                src={venue.owner.banner.url}
                alt={venue.owner.banner.alt || 'Owner banner'}
                style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }}
              />
            </Grid>
          )}

          <Grid size={{ xs: 12, sm: 12 }}>
            {venue.owner?.avatar?.url && (
              <Avatar
                src={venue.owner.avatar.url}
                alt={venue.owner.avatar.alt || 'Owner avatar'}
                sx={{ width: 56, height: 56 }}
              />
            )}
          </Grid>
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
