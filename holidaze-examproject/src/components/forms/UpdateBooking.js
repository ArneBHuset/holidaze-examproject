import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
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
import baseApiCall from '../../services/api/apiMain.ts';
import dayjs from 'dayjs';
import { yupResolver } from '@hookform/resolvers/yup';
import { newBookingValidation } from './validation/newBookingValidation.ts';
import Person4Icon from '@mui/icons-material/Person4';
import { snackBarError } from '../../services/snackbar/SnackBarError.tsx';
import { snackBarSuccess } from '../../services/snackbar/SnackBarSuccess.tsx';
import DefaultInput from '../../styles/mui-styles/components/inputs.tsx';
import SecondaryButton from '../../styles/mui-styles/components/SecondaryBtn.tsx';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SaveIcon from '@mui/icons-material/Save';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Box from '@mui/material/Box';
const apiKey = import.meta.env.VITE_NOROFF_API_KEY;
/**
 * UpdateBooking component handles updating a booking, allowing users to modify check-in/check-out dates,
 * the number of guests, and also provides an option to delete the booking.
 *
 * @param {Object} props - The properties passed to the UpdateBooking component.
 * @param {BookingData} props.booking - The booking object containing information such as check-in, check-out dates, number of guests, and the venue.
 * @param {function} props.onCancel - A callback function that is called when the user cancels the booking update.
 * @param {function} props.onUpdate - A callback function that is triggered when a booking is successfully updated or deleted, signaling the parent component to refresh the booking list.
 *
 * @returns {JSX.Element} The rendered UpdateBooking component which includes forms to update booking details and buttons for saving or deleting the booking.
 */
export default function UpdateBooking({ booking, onCancel, onUpdate }) {
  const { venue } = booking;
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(newBookingValidation(venue?.maxGuests || 1)),
    defaultValues: {
      checkInDate: booking.dateFrom ? dayjs(booking.dateFrom) : undefined,
      checkOutDate: booking.dateTo ? dayjs(booking.dateTo) : undefined,
      guests: booking.guests,
    },
  });
  const checkInDate = watch('checkInDate');
  const makeApiCall = async (method, data = null) => {
    const bookingData = data
      ? {
          dateFrom: data.dateFrom,
          dateTo: data.dateTo,
          guests: data.guests,
        }
      : null;
    try {
      const headers = getValidatedHeader();
      await baseApiCall({
        url: `/holidaze/bookings/${booking.id}`,
        method,
        headers: { ...headers, 'X-Noroff-Api-Key': apiKey },
        body: bookingData ? JSON.stringify(bookingData) : undefined,
      });
      if (method === 'DELETE') {
        snackBarSuccess('Booking deleted successfully!');
        onUpdate();
        onCancel();
      } else {
        snackBarSuccess('Booking updated successfully!');
        onUpdate();
      }
    } catch (error) {
      const apiError = error;
      const errorMessage = method === 'DELETE' ? 'Error deleting booking' : 'Error updating booking';
      snackBarError(apiError.message || `${errorMessage}. Please try again.`);
    }
  };
  return _jsxs(FormControl, {
    component: 'fieldset',
    sx: { width: '100%' },
    children: [
      _jsxs(Grid, {
        container: true,
        spacing: 1,
        maxWidth: 'sm',
        margin: 'auto',
        padding: 2,
        children: [
          _jsx(Grid, {
            size: 12,
            mb: 1,
            textAlign: 'center',
            children: _jsx(DefaultSubTitle, { children: 'EDIT BOOKING' }),
          }),
          _jsxs(Grid, {
            size: 6,
            children: [
              _jsx(Box, { mb: 1, children: _jsx(DefaultSubTitle, { children: 'Check-in' }) }),
              _jsx(LocalizationProvider, {
                dateAdapter: AdapterDayjs,
                children: _jsx(Controller, {
                  name: 'checkInDate',
                  control: control,
                  render: ({ field }) =>
                    _jsx(DatePicker, {
                      ...field,
                      disablePast: true,
                      onChange: (newDate) => {
                        field.onChange(newDate);
                        setValue('checkOutDate', null);
                      },
                      value: field.value || null,
                      slots: { textField: TextField },
                      slotProps: {
                        textField: {
                          placeholder: 'Check-in',
                          fullWidth: true,
                          error: !!errors.checkInDate,
                          helperText: errors.checkInDate ? errors.checkInDate.message : '',
                        },
                      },
                    }),
                }),
              }),
            ],
          }),
          _jsxs(Grid, {
            size: 6,
            children: [
              _jsx(Box, { mb: 1, children: _jsx(DefaultSubTitle, { children: 'Check-out' }) }),
              _jsx(LocalizationProvider, {
                dateAdapter: AdapterDayjs,
                children: _jsx(Controller, {
                  name: 'checkOutDate',
                  control: control,
                  render: ({ field }) =>
                    _jsx(DatePicker, {
                      ...field,
                      disablePast: true,
                      minDate: checkInDate ? checkInDate.add(1, 'day') : dayjs(),
                      disabled: !checkInDate,
                      value: field.value || null,
                      slots: { textField: TextField },
                      slotProps: {
                        textField: {
                          placeholder: 'Check-out',
                          fullWidth: true,
                          error: !!errors.checkOutDate,
                          helperText: errors.checkOutDate ? errors.checkOutDate.message : '',
                        },
                      },
                    }),
                }),
              }),
            ],
          }),
          _jsxs(Grid, {
            size: 6,
            children: [
              _jsx(DefaultSubTitle, { children: 'Guests' }),
              _jsx(FormControl, {
                fullWidth: true,
                children: _jsx(Controller, {
                  name: 'guests',
                  control: control,
                  render: ({ field }) =>
                    _jsx(DefaultInput, {
                      children: _jsx(TextField, {
                        ...field,
                        fullWidth: true,
                        type: 'number',
                        placeholder: 'Number of guests',
                        variant: 'standard',
                        error: !!errors.guests,
                        helperText: errors.guests ? errors.guests.message : '',
                      }),
                    }),
                }),
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
                children: [_jsx(Person4Icon, { sx: { color: 'secondary.main', fontSize: 28 } }), venue?.maxGuests || 0],
              }),
            ],
          }),
          _jsx(Grid, {
            size: 6,
            children: _jsx(SecondaryButton, {
              children: _jsxs(Button, {
                fullWidth: true,
                onClick: () => makeApiCall('DELETE'),
                sx: { gap: 1 },
                children: [_jsx(DeleteOutlineIcon, {}), ' Delete'],
              }),
            }),
          }),
          _jsx(Grid, {
            size: 6,
            children: _jsx(SecondaryButton, {
              children: _jsxs(Button, {
                fullWidth: true,
                onClick: handleSubmit((data) => {
                  const updateData = {
                    dateFrom: data.checkInDate?.toISOString(),
                    dateTo: data.checkOutDate?.toISOString(),
                    guests: data.guests,
                  };
                  makeApiCall('PUT', updateData);
                }),
                sx: { gap: 1 },
                children: [_jsx(SaveIcon, {}), 'Save'],
              }),
            }),
          }),
        ],
      }),
      _jsx(DefaultButton, {
        children: _jsxs(Button, {
          fullWidth: true,
          onClick: onCancel,
          children: ['Cancel', _jsx(KeyboardArrowUpIcon, {})],
        }),
      }),
    ],
  });
}
