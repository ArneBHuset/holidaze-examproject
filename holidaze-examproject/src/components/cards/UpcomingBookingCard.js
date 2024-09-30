import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
/**
 * UpcomingBookingCard component that renders a list of upcoming and past venue bookings.
 *
 * The component displays each booking with relevant details like the venue name, booking dates,
 * number of guests, and total cost. It also provides the option to edit a booking or view
 * venue details. Past bookings are visually distinguished with reduced opacity and are
 * listed after upcoming bookings.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {BookingData[]} props.bookings - An array of booking data containing information about venue bookings.
 * @returns {JSX.Element} A React component that displays a list of bookings with their details.
 *
 */
export default function UpcomingBookingCard({ bookings = [], onBookingUpdate }) {
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const theme = useTheme();
    const navigate = useNavigate();
    const sortedBookings = bookings.sort((a, b) => {
        const isPastA = dayjs(a.dateFrom).diff(dayjs(), 'day') < 0;
        const isPastB = dayjs(b.dateFrom).diff(dayjs(), 'day') < 0;
        return Number(isPastA) - Number(isPastB);
    });
    return (_jsx(Grid, { container: true, spacing: 2, children: sortedBookings.map((booking) => {
            const { venue } = booking;
            const isUpdating = selectedBookingId === booking.id;
            if (!venue)
                return null;
            const dateFrom = dayjs(booking.dateFrom);
            const dateTo = dayjs(booking.dateTo);
            const duration = dateTo.diff(dateFrom, 'day');
            const daysUntilCheckIn = dateFrom.diff(dayjs(), 'day');
            const totalCost = venue.price * duration;
            const isPastBooking = daysUntilCheckIn < 0;
            return (_jsxs(Grid, { container: true, spacing: 0, size: 12, mt: 2, sx: { width: '100%' }, children: [_jsxs(Card, { sx: {
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            width: '100%',
                            height: 'auto',
                            borderBottomLeftRadius: { xs: 0, sm: 3 },
                            borderBottomRightRadius: { xs: 0, sm: 3 },
                            boxShadow: isUpdating ? '8px 8px 6px rgba(73, 190, 248, 0.6)' : '3px 3px 10px rgba(73, 190, 248, 0.25)',
                            opacity: isPastBooking ? 0.6 : 1,
                        }, children: [_jsx(Box, { padding: { xs: 0.5, sm: 0.5 }, paddingRight: { sm: 0 }, children: _jsx(CardMedia, { component: "img", alt: venue.media?.[0]?.alt || 'Venue image', image: venue.media?.[0]?.url ||
                                        'https://th.bing.com/th/id/R.957f5c1b65e9ae5f3c068ac1349d0f1f?rik=pzYV5kEHwRtrgg&pid=ImgRaw&r=0', onError: (e) => {
                                        e.currentTarget.src =
                                            'https://th.bing.com/th/id/R.957f5c1b65e9ae5f3c068ac1349d0f1f?rik=pzYV5kEHwRtrgg&pid=ImgRaw&r=0';
                                    }, sx: {
                                        width: { xs: '100%', sm: 200 },
                                        height: { xs: 200, sm: '200px' },
                                        maxHeight: { xs: 200, sm: 260 },
                                        borderRadius: { xs: '4px', sm: '6px' },
                                    } }) }), _jsx(CardContent, { sx: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    padding: { xs: 1 },
                                }, style: { padding: 0 }, children: _jsxs(Grid, { container: true, padding: 0.5, spacing: 1, sx: { height: '100%' }, mb: { xs: 2, sm: 0 }, display: "flex", mx: "auto", justifyContent: "center", children: [_jsx(Grid, { size: { xs: 12 }, textAlign: { xs: 'center', sm: 'left' }, maxHeight: "40px", overflow: "hidden", children: _jsx(DefaultSubTitle, { children: venue.name }) }), _jsx(Grid, { size: 12, textAlign: { xs: 'center', sm: 'left' }, children: isPastBooking ? (_jsx(Typography, { variant: "body1", color: "error", children: "This booking has passed" })) : (_jsxs(Typography, { variant: "body2", display: "flex", alignItems: "center", children: [`Your booking in ${venue.location?.city || 'N/A'}, ${venue.location?.country || 'N/A'} is `, `${daysUntilCheckIn} ${daysUntilCheckIn === 1 ? 'day' : 'days'}`, ` away`] })) }), _jsxs(Grid, { size: 12, display: "flex", gap: 1, alignItems: "center", justifyContent: { xs: 'center', sm: 'left' }, children: [_jsx(Typography, { variant: "h6", children: dateFrom.format('DD/MM/YYYY') }), _jsx(ArrowForwardIcon, { sx: { color: theme.palette.primary.light, fontFamily: theme.typography.h5 } }), _jsx(Typography, { variant: "h6", children: dateTo.format('DD/MM/YYYY') }), _jsxs(Typography, { variant: "h6", sx: { display: 'flex', alignItems: 'center', ml: 1 }, children: [_jsx(AccessTimeIcon, { sx: { color: theme.palette.primary.light, fontFamily: theme.typography.h5 } }), duration] })] }), _jsxs(Grid, { size: 12, justifyContent: { xs: 'center', sm: 'left' }, gap: { xs: 6, sm: 4 }, sx: { display: 'flex', alignItems: 'center', pt: { xs: 1, sm: 0 } }, children: [_jsxs(Typography, { variant: "h6", sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(PersonIcon, { sx: { color: theme.palette.primary.light, fontFamily: theme.typography.h5 } }), booking.guests, "/", venue.maxGuests] }), _jsxs(Typography, { textAlign: { xs: 'center', sm: 'left' }, variant: "h6", children: ["Total Cost: \u20AC", totalCost.toFixed(2)] })] }), _jsx(Grid, { size: 12, display: "flex", alignItems: "end", children: _jsxs(Typography, { variant: "body2", style: { opacity: 0.65 }, display: { xs: 'none', sm: 'block', width: '100%' }, children: ["Last updated: ", dayjs(booking.updated).format('DD/MM/YYYY')] }) })] }) })] }), !isUpdating && (_jsxs(Card, { sx: {
                            display: 'flex',
                            justifyContent: 'right',
                            gap: 2,
                            width: '100%',
                            height: 'auto',
                            mt: 0.5,
                            p: 1,
                            boxShadow: '3px 3px 10px rgba(73, 190, 248, 0.25)',
                            borderBottomLeftRadius: { xs: 0, sm: 3 },
                            borderBottomRightRadius: { xs: 0, sm: 3 },
                            opacity: isPastBooking ? 0.6 : 1,
                        }, children: [_jsx(SecondaryButton, { children: _jsxs(Button, { onClick: () => setSelectedBookingId(booking.id), sx: { width: '40%' }, children: [_jsx(EditIcon, { sx: { fontSize: '1rem' } }), " Edit"] }) }), _jsx(DefaultButton, { children: _jsxs(Button, { onClick: () => navigate(`/venue/${venue.id}`), sx: { width: '60%' }, children: ["Venue details ", _jsx(ArrowForwardIosIcon, {})] }) })] })), isUpdating && (_jsx(Card, { sx: {
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            width: '100%',
                            height: 'auto',
                            borderBottomLeftRadius: { xs: 0, sm: 3 },
                            borderBottomRightRadius: { xs: 0, sm: 3 },
                            boxShadow: '6px 6px 30px rgba(73, 190, 248, 0.4)',
                            marginTop: 1,
                        }, children: booking.venue ? (_jsx(UpdateBooking, { booking: booking, onCancel: () => setSelectedBookingId(null), onUpdate: onBookingUpdate })) : (_jsx(Typography, { color: "error", children: "Venue information is missing." })) }))] }));
        }) }));
}
