import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import Calendar from '../calendar/Calendar.tsx';
import Grid from '@mui/material/Grid2';
import DefaultSubTitle from '../titles/SubTitle.tsx';
import Typography from '@mui/material/Typography';
import HostDetails from '../profile/ProfileDisplay.tsx';
import CardContent from '@mui/material/CardContent';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import theme from '../../styles/mui-styles/MuiThemes.ts';
import PersonIcon from '@mui/icons-material/Person';
import { alpha } from '@mui/material';
const BookingsOnVenueCard = ({ venue }) => {
    const [selectedBooking, setSelectedBooking] = useState(null);
    const bookingEvents = venue.bookings?.map((booking) => ({
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
    const handleEventClick = (eventData) => {
        setSelectedBooking({
            customer: eventData.extendedProps.customer,
            dateFrom: eventData.extendedProps.dateFrom,
            dateTo: eventData.extendedProps.dateTo,
            guests: eventData.extendedProps.guests,
            created: eventData.extendedProps.created,
            updated: eventData.extendedProps.updated,
        });
    };
    return (_jsx(CardContent, { children: _jsxs(Grid, { container: true, spacing: 0, children: [_jsx(Grid, { size: 12, children: _jsx(Calendar, { events: bookingEvents || [], onEventClick: handleEventClick }) }), _jsx(Grid, { size: 12, sx: { mt: 2 }, children: selectedBooking ? (_jsxs(Grid, { container: true, spacing: 2, children: [_jsxs(Grid, { size: 12, width: "100%", children: [_jsx(DefaultSubTitle, { children: "Customer Details" }), _jsx(HostDetails, { data: {
                                            name: selectedBooking.customer?.name || 'Guest',
                                            email: selectedBooking.customer?.email || 'No email provided',
                                            bio: selectedBooking.customer?.bio || 'No bio available',
                                            avatar: {
                                                url: selectedBooking.customer?.avatar?.url || '',
                                                alt: selectedBooking.customer?.avatar?.alt || 'Default avatar',
                                            },
                                            banner: {
                                                url: selectedBooking.customer?.banner?.url || '',
                                                alt: selectedBooking.customer?.banner?.alt || 'Default banner',
                                            },
                                        } })] }), _jsxs(Grid, { size: 12, width: "100%", children: [_jsx(Grid, { size: 12, children: _jsx(DefaultSubTitle, { children: "Booking Details" }) }), _jsxs(Grid, { size: 12, my: 1, display: "flex", alignItems: "center", children: [_jsx(Typography, { variant: "h6", children: new Date(selectedBooking.dateFrom).toLocaleDateString() }), _jsx(ArrowForwardIcon, { sx: { color: theme.palette.primary.light, fontFamily: theme.typography.h5 } }), _jsx(Typography, { variant: "h6", children: new Date(selectedBooking.dateTo).toLocaleDateString() })] }), _jsx(Grid, { size: 12, my: 1, children: _jsxs(Typography, { variant: "h6", sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(PersonIcon, { sx: { color: theme.palette.primary.light, fontFamily: theme.typography.h5 } }), selectedBooking.guests, "/", venue.maxGuests] }) }), _jsx(Grid, { size: 12, my: 1, children: _jsxs(Typography, { variant: "body2", sx: { color: alpha(theme.palette.primary.light, 0.7) }, children: ["Last Updated:", ' ', selectedBooking.updated
                                                    ? new Date(selectedBooking.updated).toLocaleDateString()
                                                    : new Date(selectedBooking.created).toLocaleDateString()] }) })] })] })) : (_jsx(Typography, { variant: "h5", children: "Click on an event to view the booking details." })) })] }) }));
};
export default BookingsOnVenueCard;
