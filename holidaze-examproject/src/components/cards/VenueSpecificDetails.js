import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
import HostDetails from '../profile/ProfileDisplay.tsx';
import PlaceIcon from '@mui/icons-material/Place';
/**
 * VenueSpecificDetails component displays detailed information about a specific venue,
 * including its location, price, rating, available facilities, and a calendar showing bookings.
 *
 * @param {VenueSpecificDetailsProps} venue - The venue object containing all its details.
 */
function VenueSpecificDetails({ venue }) {
    const theme = useTheme();
    const bookingEvents = venue.bookings?.map((booking) => ({
        title: `Booked by ${booking.customer?.name || 'Guest'}`,
        start: booking.dateFrom,
        end: booking.dateTo,
    }));
    return (_jsx(MainCard, { children: _jsx(Box, { sx: { padding: 1 }, children: _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { size: 12, textAlign: { xs: 'center', sm: 'left' }, mb: 1, children: _jsx(Typography, { variant: "h3", sx: { borderBottom: 1, borderColor: theme.palette.primary.main, paddingY: 1 }, children: venue.name }) }), _jsxs(Grid, { size: { xs: 7, sm: 6 }, children: [_jsxs(Typography, { variant: "h5", sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(EuroIcon, { sx: { color: theme.palette.primary.light } }), venue.price] }), _jsx(Typography, { variant: "h5", sx: { display: 'flex', alignItems: 'center', gap: 1, marginTop: 3 }, children: venue.location?.city && venue.location?.country ? (_jsxs("a", { href: venue.location.lat && venue.location.lng
                                        ? `https://www.google.com/maps?q=${venue.location.lat},${venue.location.lng}`
                                        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${venue.location.city}, ${venue.location.country}`)}`, target: "_blank", rel: "noopener noreferrer", "aria-label": `View ${venue.location.city}, ${venue.location.country} on Google Maps`, style: {
                                        textDecoration: 'none',
                                        color: theme.palette.text.primary,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
                                    }, children: [_jsx(PlaceIcon, { sx: {
                                                color: theme.palette.primary.light,
                                                transition: 'transform 0.2s ease-in-out',
                                                '&:hover': { transform: 'scale(1.2)' },
                                            } }), `${venue.location.city}, ${venue.location.country}`] })) : (_jsxs(Box, { display: "flex", gap: 1, alignItems: "center", children: [_jsx(PlaceIcon, { sx: { color: theme.palette.primary.light } }), "N/A"] })) })] }), _jsxs(Grid, { size: { xs: 3, sm: 5 }, ml: 2, children: [_jsxs(Typography, { variant: "h5", sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(StarIcon, { sx: { color: theme.palette.primary.light } }), venue.rating || 'N/A'] }), _jsxs(Typography, { variant: "h5", sx: { display: 'flex', alignItems: 'center', gap: 1, marginTop: 3 }, children: [_jsx(Person4Icon, { sx: { color: theme.palette.primary.light } }), venue.maxGuests] })] }), _jsxs(Grid, { size: { xs: 12 }, my: 1, children: [_jsx(DefaultSubTitle, { children: "Description" }), _jsx(Typography, { variant: "body1", marginTop: 1, children: venue.description })] }), _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { size: 12, children: _jsx(DefaultSubTitle, { children: "Facilities" }) }), _jsxs(Grid, { size: { xs: 6 }, children: [_jsxs(Typography, { variant: "h5", sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(WifiIcon, {}), venue.meta?.wifi ? 'Wifi available' : 'No wifi'] }), _jsxs(Typography, { variant: "h5", sx: { display: 'flex', alignItems: 'center', gap: 1, marginTop: 3 }, children: [_jsx(FreeBreakfastIcon, {}), venue.meta?.breakfast ? 'Breakfast available' : 'No breakfast'] })] }), _jsxs(Grid, { size: { xs: 6 }, children: [_jsxs(Typography, { variant: "h5", sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(PetsIcon, {}), venue.meta?.pets ? 'Pets allowed' : 'No pets'] }), _jsxs(Typography, { variant: "h5", sx: { display: 'flex', alignItems: 'center', gap: 1, marginTop: 3 }, children: [_jsx(LocalParkingIcon, {}), venue.meta?.parking ? 'Parking is available' : 'No parking'] })] })] }), _jsx(Grid, { size: { xs: 12, sm: 12 }, sx: { marginTop: 2 }, children: _jsx(Calendar, { events: bookingEvents || [] }) }), _jsx(Grid, { size: { xs: 12, sm: 12 }, children: _jsx(DefaultSubTitle, { children: "Meet your host" }) }), _jsx(Grid, { size: { xs: 12, sm: 12 }, children: _jsx(HostDetails, { data: {
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
                            } }) }), _jsx(Grid, { size: { xs: 12 }, sx: { opacity: 0.7 }, children: _jsxs(Typography, { variant: "body2", sx: { marginTop: 4 }, children: [_jsx("strong", { children: "Last Updated:" }), ' ', venue.updated
                                    ? new Date(venue.updated).toLocaleDateString()
                                    : new Date(venue.created).toLocaleDateString()] }) })] }) }) }));
}
export default VenueSpecificDetails;
