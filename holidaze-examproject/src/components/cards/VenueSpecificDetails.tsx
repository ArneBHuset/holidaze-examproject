import MainCard from '../../layout/MainCard.tsx';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import DefaultSubTitle from '../titles/SubTitle.tsx';
import Calendar from '../calendar/Calendar.tsx';
import StarIcon from '@mui/icons-material/Star';
import EuroIcon from '@mui/icons-material/Euro';
import Person4Icon from '@mui/icons-material/Person4';
import WifiIcon from '@mui/icons-material/Wifi';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import PetsIcon from '@mui/icons-material/Pets';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import { useTheme } from '@mui/material/styles';
import { BookingData } from '../../services/interfaces/api/venueResponse.ts';
import { VenueSpecificDetailsProps } from '../../services/interfaces/api/venueResponse.ts';
import HostDetails from '../profile/ProfileDisplay.tsx';
import PlaceIcon from '@mui/icons-material/Place';

/**
 * VenueSpecificDetails component displays detailed information about a specific venue,
 * including its location, price, rating, available facilities, and a calendar showing bookings.
 *
 * @param {VenueSpecificDetailsProps} venue - The venue object containing all its details.
 */
function VenueSpecificDetails({ venue }: VenueSpecificDetailsProps) {
  const theme = useTheme();
  const bookingEvents = venue.bookings?.map((booking: BookingData) => ({
    title: `Booked by ${booking.customer?.name || 'Guest'}`,
    start: booking.dateFrom,
    end: booking.dateTo,
  }));

  return (
    <MainCard>
      <Box sx={{ padding: 1 }}>
        <Grid container spacing={2}>
          <Grid size={12} textAlign={{ xs: 'center', sm: 'left' }} mb={1}>
            <Typography variant="h3" sx={{ borderBottom: 1, borderColor: theme.palette.primary.main, paddingY: 1 }}>
              {venue.name}
            </Typography>
          </Grid>
          <Grid size={{ xs: 7, sm: 6 }}>
            <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EuroIcon sx={{ color: theme.palette.primary.light }} />
              {venue.price}
            </Typography>
            <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: 3 }}>
              {venue.location?.city && venue.location?.country ? (
                <a
                  href={
                    venue.location.lat && venue.location.lng
                      ? `https://www.google.com/maps?q=${venue.location.lat},${venue.location.lng}`
                      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${venue.location.city}, ${venue.location.country}`
                      )}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${venue.location.city}, ${venue.location.country} on Google Maps`}
                  style={{
                    textDecoration: 'none',
                    color: theme.palette.text.primary,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <PlaceIcon
                    sx={{
                      color: theme.palette.primary.light,
                      transition: 'transform 0.2s ease-in-out',
                      '&:hover': { transform: 'scale(1.2)' },
                    }}
                  />
                  {`${venue.location.city}, ${venue.location.country}`}
                </a>
              ) : (
                <Box display="flex" gap={1} alignItems="center">
                  <PlaceIcon sx={{ color: theme.palette.primary.light }} />
                  N/A
                </Box>
              )}
            </Typography>
          </Grid>
          <Grid size={{ xs: 3, sm: 5 }} ml={2}>
            <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <StarIcon sx={{ color: theme.palette.primary.light }} />
              {venue.rating || 'N/A'}
            </Typography>

            <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: 3 }}>
              <Person4Icon sx={{ color: theme.palette.primary.light }} />
              {venue.maxGuests}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12 }} my={1}>
            <DefaultSubTitle>Description</DefaultSubTitle>
            <Typography variant="body1" marginTop={1}>
              {venue.description}
            </Typography>
          </Grid>
          <Grid container spacing={2}>
            <Grid size={12}>
              <DefaultSubTitle>Facilities</DefaultSubTitle>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <WifiIcon />
                {venue.meta?.wifi ? 'Wifi available' : 'No wifi'}
              </Typography>
              <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: 3 }}>
                <FreeBreakfastIcon />
                {venue.meta?.breakfast ? 'Breakfast available' : 'No breakfast'}
              </Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PetsIcon />
                {venue.meta?.pets ? 'Pets allowed' : 'No pets'}
              </Typography>
              <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: 3 }}>
                <LocalParkingIcon />
                {venue.meta?.parking ? 'Parking is available' : 'No parking'}
              </Typography>
            </Grid>
          </Grid>
          <Grid size={{ xs: 12, sm: 12 }} sx={{ marginTop: 2 }}>
            <Calendar events={bookingEvents || []} />
          </Grid>
          <Grid size={{ xs: 12, sm: 12 }}>
            <DefaultSubTitle>Meet your host</DefaultSubTitle>
          </Grid>
          <Grid size={{ xs: 12, sm: 12 }}>
            <HostDetails
              data={{
                name: venue.owner?.name || '',
                email: venue.owner?.email || '',
                bio: venue.owner?.bio || '',
                avatar: {
                  url: venue.owner?.avatar?.url || '',
                  alt: venue.owner?.avatar?.alt || 'Profile avatar',
                },
                banner: {
                  url: venue.owner?.banner?.url || '',
                  alt: venue.owner?.banner?.alt || 'Host banner',
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12 }} sx={{ opacity: 0.7 }}>
            <Typography variant="body2" sx={{ marginTop: 4 }}>
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
