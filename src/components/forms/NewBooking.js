import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid2';
import DefaultSubTitle from '../titles/SubTitle.tsx';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField, Typography } from '@mui/material';
import DefaultButton from '../../styles/mui-styles/components/defaultBtn.tsx';
import FormControl from '@mui/material/FormControl';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { getValidatedHeader } from '../../services/api/variables/headers.ts';
import { bookingEndpoint } from '../../services/api/variables/endpoints/bookingEndpoint.ts';
import baseApiCall from '../../services/api/apiMain.ts';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { yupResolver } from '@hookform/resolvers/yup';
import { newBookingValidation } from './validation/newBookingValidation.ts';
import { snackBarError } from '../../services/snackbar/SnackBarError.tsx';
import Person4Icon from '@mui/icons-material/Person4';
import { useNavigate } from 'react-router-dom';
import DefaultInput from '../../styles/mui-styles/components/inputs.tsx';
import { snackBarSuccess } from '../../services/snackbar/SnackBarSuccess.tsx';
dayjs.extend(isBetween);
const apiKey = import.meta.env.VITE_NOROFF_API_KEY;
/**
 * BookVenueDrawer component allows users to book a venue with check-in, check-out, and guest amount data
 * @param {DrawerComponentProps} props - The props for the drawer including venue data and state management.
 */
function BookVenueDrawer({ open, toggleDrawer, venue }) {
  const [success, setSuccess] = useState(false);
  const anchor = 'bottom';
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(newBookingValidation(venue.maxGuests)),
    defaultValues: {
      checkInDate: null,
      checkOutDate: null,
      guests: 1,
    },
  });
  const checkInDate = watch('checkInDate');
  const isDateUnavailable = (date) => {
    return venue.bookings
      ? venue.bookings.some((booking) => dayjs(date).isBetween(booking.dateFrom, booking.dateTo, null, '[]'))
      : false;
  };
  const onSubmit = async (data) => {
    const bookingData = {
      dateFrom: data.checkInDate?.toISOString(),
      dateTo: data.checkOutDate?.toISOString(),
      guests: data.guests,
      venueId: venue.id,
    };
    try {
      const headers = getValidatedHeader();
      await baseApiCall({
        url: bookingEndpoint,
        method: 'POST',
        headers: { ...headers, 'X-Noroff-Api-Key': apiKey },
        body: JSON.stringify(bookingData),
      });
      snackBarSuccess('Booking successful!');
      setSuccess(true);
    } catch (error) {
      const apiError = error;
      snackBarError(apiError.message || 'Error creating booking. Please try again.');
    }
  };
  const handleViewBookings = () => {
    navigate('/user-overview');
  };
  return _jsx(Drawer, {
    anchor: anchor,
    open: open,
    onClose: toggleDrawer(anchor, false),
    ModalProps: {
      keepMounted: true,
    },
    role: 'dialog',
    'aria-labelledby': 'booking-form-title',
    children: _jsx(Box, {
      sx: { width: 'auto' },
      role: 'presentation',
      display: 'flex',
      justifyContent: 'center',
      padding: 4,
      children: _jsx(FormControl, {
        component: 'form',
        onSubmit: handleSubmit(onSubmit),
        'aria-labelledby': 'booking-form-title',
        children: _jsxs(Grid, {
          container: true,
          spacing: 3,
          maxWidth: 'sm',
          justifyContent: 'center',
          children: [
            _jsx(Grid, {
              size: 12,
              textAlign: 'center',
              children: _jsx(DefaultSubTitle, { children: 'Place booking' }),
            }),
            _jsxs(Grid, {
              size: 6,
              children: [
                _jsx(Box, { mb: 1, children: _jsx(DefaultSubTitle, { children: 'Check-in' }) }),
                _jsxs(LocalizationProvider, {
                  dateAdapter: AdapterDayjs,
                  children: [
                    _jsx(Controller, {
                      name: 'checkInDate',
                      control: control,
                      render: ({ field }) =>
                        _jsx(DatePicker, {
                          ...field,
                          disablePast: true,
                          shouldDisableDate: isDateUnavailable,
                          onChange: (newDate) => {
                            field.onChange(newDate);
                            setValue('checkOutDate', null);
                          },
                          slots: { textField: TextField },
                          slotProps: {
                            textField: {
                              placeholder: 'Check-in',
                              fullWidth: true,
                              error: !!errors.checkInDate,
                              helperText: errors.checkInDate ? errors.checkInDate.message : '',
                              inputProps: {
                                'aria-invalid': !!errors.checkInDate,
                                'aria-describedby': errors.checkInDate ? 'check-in-error' : undefined,
                              },
                            },
                          },
                        }),
                    }),
                    errors.checkInDate &&
                      _jsx(Typography, {
                        id: 'check-in-error',
                        color: 'error',
                        variant: 'caption',
                        children: errors.checkInDate.message,
                      }),
                  ],
                }),
              ],
            }),
            _jsxs(Grid, {
              size: 6,
              children: [
                _jsx(Box, { mb: 1, children: _jsx(DefaultSubTitle, { children: 'Check-out' }) }),
                _jsxs(LocalizationProvider, {
                  dateAdapter: AdapterDayjs,
                  children: [
                    _jsx(Controller, {
                      name: 'checkOutDate',
                      control: control,
                      render: ({ field }) =>
                        _jsx(DatePicker, {
                          ...field,
                          disablePast: true,
                          minDate: checkInDate ? dayjs(checkInDate).add(1, 'day') : dayjs(),
                          shouldDisableDate: isDateUnavailable,
                          disabled: !checkInDate,
                          slots: { textField: TextField },
                          slotProps: {
                            textField: {
                              placeholder: 'Check-out',
                              fullWidth: true,
                              error: !!errors.checkOutDate,
                              helperText: errors.checkOutDate ? errors.checkOutDate.message : '',
                              inputProps: {
                                'aria-invalid': !!errors.checkOutDate,
                                'aria-describedby': errors.checkOutDate ? 'check-out-error' : undefined,
                              },
                            },
                          },
                        }),
                    }),
                    errors.checkOutDate &&
                      _jsx(Typography, {
                        id: 'check-out-error',
                        color: 'error',
                        variant: 'caption',
                        children: errors.checkOutDate.message,
                      }),
                  ],
                }),
              ],
            }),
            _jsxs(Grid, {
              size: 6,
              children: [
                _jsx(DefaultSubTitle, { children: 'Guests' }),
                _jsxs(DefaultInput, {
                  children: [
                    _jsx(Controller, {
                      name: 'guests',
                      control: control,
                      defaultValue: 1,
                      render: ({ field }) =>
                        _jsx(TextField, {
                          ...field,
                          fullWidth: true,
                          type: 'number',
                          placeholder: 'Number of guests',
                          variant: 'standard',
                          error: !!errors.guests,
                          helperText: errors.guests ? errors.guests.message : '',
                        }),
                    }),
                    errors.guests &&
                      _jsx(Typography, {
                        id: 'guests-error',
                        color: 'error',
                        variant: 'caption',
                        children: errors.guests.message,
                      }),
                  ],
                }),
              ],
            }),
            _jsxs(Grid, {
              size: 6,
              children: [
                _jsx(DefaultSubTitle, { children: 'Max guests' }),
                _jsxs(Typography, {
                  variant: 'h6',
                  sx: { display: 'flex', alignItems: 'center', gap: 1, marginTop: 2 },
                  children: [_jsx(Person4Icon, { sx: { color: 'secondary.main', fontSize: 28 } }), venue.maxGuests],
                }),
              ],
            }),
            _jsx(Grid, {
              size: success ? 8 : 12,
              children: _jsx(DefaultButton, {
                children: _jsx(Button, {
                  fullWidth: true,
                  onClick: handleSubmit(onSubmit),
                  'aria-label': 'Book venue',
                  children: 'BOOK',
                }),
              }),
            }),
            success &&
              _jsx(Grid, {
                size: 4,
                children: _jsx(DefaultButton, {
                  children: _jsx(Button, {
                    fullWidth: true,
                    onClick: handleViewBookings,
                    'aria-label': 'View your bookings',
                    children: 'VIEW BOOKINGS',
                  }),
                }),
              }),
          ],
        }),
      }),
    }),
  });
}
export default BookVenueDrawer;
