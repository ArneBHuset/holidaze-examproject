import MainCard from '../../layout/MainCard.tsx';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2'; // Use Grid2 for layout
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import DefaultSubTitle from '../titles/SubTitle.tsx';
import Calendar from '../calendar/Calendar.tsx';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PublicIcon from '@mui/icons-material/Public';
import StarIcon from '@mui/icons-material/Star';
import EuroIcon from '@mui/icons-material/Euro';
import Person4Icon from '@mui/icons-material/Person4';
import WifiIcon from '@mui/icons-material/Wifi';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import PetsIcon from '@mui/icons-material/Pets';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import { useTheme } from '@mui/material/styles';

function VenueSpecificDetails({ venue }) {
  const theme = useTheme();
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
          {/* Price */}
          <Grid size={{ xs: 7, sm: 4, md: 6 }} marginLeft={{ xs: '20px', sm: '100px', md: '80px' }}>
            <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EuroIcon sx={{ color: theme.palette.secondary.main, fontSize: 32 }} />
              {venue.price}
            </Typography>

            <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: 3 }}>
              <PublicIcon sx={{ color: theme.palette.secondary.main, fontSize: 32 }} />
              {venue.location?.country || 'Not available'}
            </Typography>
          </Grid>
          <Grid size={{ xs: 3, sm: 4, md: 3 }}>
            <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <StarIcon sx={{ color: theme.palette.secondary.main, fontSize: 32 }} />
              {venue.rating || 'No rating available'}
            </Typography>

            <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: 3 }}>
              <Person4Icon sx={{ color: theme.palette.secondary.main, fontSize: 32 }} />
              {venue.maxGuests}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12 }} my={2}>
            <DefaultSubTitle>Description</DefaultSubTitle>
            <Typography variant="body1" marginTop={2}>
              {venue.description}
            </Typography>
          </Grid>
          <Grid container spacing={2}>
            <Grid size={12}>
              <DefaultSubTitle>Facilities</DefaultSubTitle>
            </Grid>
            <Grid size={{ xs: 7, sm: 6, md: 7 }} marginLeft={{ xs: '20px', sm: '30px', md: '30px' }}>
              <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <WifiIcon />
                {venue.meta?.wifi ? 'Wifi available' : 'No wifi'}
              </Typography>

              <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: 3 }}>
                <FreeBreakfastIcon />
                {venue.meta?.breakfast ? 'Breakfast available' : 'No breakfast'}
              </Typography>
            </Grid>

            <Grid size={{ xs: 3, sm: 4, md: 4 }}>
              <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PetsIcon /> {venue.meta?.pets ? 'Pets allowed' : 'No pets'}
              </Typography>

              <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: 3 }}>
                <LocalParkingIcon />
                {venue.meta?.parking ? 'Parking is available' : 'No parking'}
              </Typography>
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
              <Box
                display={'flex'}
                alignItems={'center'}
                gap={{ xs: 2, sm: 4 }}
                sx={{ marginTop: '-45px', marginLeft: '1vw' }}
              >
                {venue.owner?.avatar?.url && (
                  <Avatar
                    src={venue.owner.avatar.url}
                    alt={venue.owner.avatar.alt || 'Owner avatar'}
                    sx={{ width: { xs: '100px' }, height: { xs: '100px' } }}
                  />
                )}
                <Box paddingTop={6}>
                  <Typography variant="h4">{venue.owner?.name}</Typography>
                  <Accordion sx={{ boxShadow: 'none', border: 'none' }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      sx={{ padding: 0, '& .MuiAccordionSummary-content': { margin: 0 } }} // Remove padding and space between icon and text
                    >
                      <Typography variant="h6" sx={{ display: 'inline' }}>
                        See host details
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ padding: 0 }}>
                      <Typography variant="body2">Email: {venue.owner?.email}</Typography>
                      <Typography variant="body2">
                        <strong>Bio:</strong> {venue.owner?.bio || 'No bio available'}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </Box>
            </Grid>
          )}
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
