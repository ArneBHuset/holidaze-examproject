import { useState } from 'react';
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
import { ApiError } from '../../services/interfaces/error/catchError.ts';
import DefaultInput from '../../styles/mui-styles/components/inputs.tsx';
import SecondaryButton from '../../styles/mui-styles/components/SecondaryBtn.tsx';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SaveIcon from '@mui/icons-material/Save';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const apiKey = import.meta.env.VITE_NOROFF_API_KEY;

export default function UpdateBooking({ booking, onCancel }) {
  const { venue } = booking;
  const [success, setSuccess] = useState(false);

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(newBookingValidation(venue.maxGuests)),
    defaultValues: {
      checkInDate: dayjs(booking.dateFrom),
      checkOutDate: dayjs(booking.dateTo),
      guests: booking.guests,
    },
  });

  const checkInDate = watch('checkInDate');

  const makeApiCall = async (method, data = null) => {
    const bookingData = data
      ? {
          dateFrom: data.checkInDate?.toISOString(),
          dateTo: data.checkOutDate?.toISOString(),
          guests: data.guests,
        }
      : null;

    try {
      const headers = getValidatedHeader();
      await baseApiCall({
        url: `/holidaze/bookings/${booking.id}`,
        method,
        headers: { ...headers, 'X-Noroff-Api-Key': apiKey },
        body: bookingData ? JSON.stringify(bookingData) : null,
      });

      if (method === 'DELETE') {
        snackBarSuccess('Booking deleted successfully!');
        onCancel();
      } else {
        snackBarSuccess('Booking updated successfully!');
        setSuccess(true);
      }
    } catch (error) {
      const apiError = error as ApiError;
      const errorMessage = method === 'DELETE' ? 'Error deleting booking' : 'Error updating booking';
      snackBarError(apiError.message || `${errorMessage}. Please try again.`);
    }
  };

  return (
    <FormControl component="fieldset" sx={{ width: '100%' }}>
      <Grid container spacing={2} maxWidth="sm" margin={'auto'} padding={2}>
        <Grid size={6}>
          <DefaultSubTitle>Check-in Date</DefaultSubTitle>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="checkInDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  disablePast
                  onChange={(newDate) => {
                    field.onChange(newDate);
                    setValue('checkOutDate', null);
                  }}
                  slots={{ textField: TextField }}
                  slotProps={{
                    textField: {
                      placeholder: 'Check-in',
                      fullWidth: true,
                      error: !!errors.checkInDate,
                      helperText: errors.checkInDate ? errors.checkInDate.message : '',
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </Grid>

        <Grid size={6}>
          <DefaultSubTitle>Check-out Date</DefaultSubTitle>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="checkOutDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  disablePast
                  minDate={checkInDate ? dayjs(checkInDate).add(1, 'day') : dayjs()}
                  disabled={!checkInDate}
                  slots={{ textField: TextField }}
                  slotProps={{
                    textField: {
                      placeholder: 'Check-out',
                      fullWidth: true,
                      error: !!errors.checkOutDate,
                      helperText: errors.checkOutDate ? errors.checkOutDate.message : '',
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid size={6}>
          <DefaultSubTitle>Guests</DefaultSubTitle>
          <FormControl fullWidth>
            <Controller
              name="guests"
              control={control}
              render={({ field }) => (
                <DefaultInput>
                  <TextField
                    {...field}
                    fullWidth
                    type="number"
                    placeholder="Number of guests"
                    variant="standard"
                    error={!!errors.guests}
                    helperText={errors.guests ? errors.guests.message : ''}
                  />
                </DefaultInput>
              )}
            />
          </FormControl>
        </Grid>

        <Grid size={6}>
          <DefaultSubTitle>Max guests</DefaultSubTitle>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: 2 }}>
            <Person4Icon sx={{ color: 'secondary.main', fontSize: 28 }} />
            {venue.maxGuests}
          </Typography>
        </Grid>
        <Grid size={6}>
          <SecondaryButton>
            <Button fullWidth onClick={() => makeApiCall('DELETE')} sx={{ gap: 1 }}>
              <DeleteOutlineIcon /> Delete booking
            </Button>
          </SecondaryButton>
        </Grid>

        <Grid size={6}>
          <SecondaryButton>
            <Button fullWidth onClick={handleSubmit((data) => makeApiCall('PUT', data))} sx={{ gap: 1 }}>
              <SaveIcon />
              Save Changes
            </Button>
          </SecondaryButton>
        </Grid>
      </Grid>
      <DefaultButton>
        <Button fullWidth onClick={onCancel}>
          Cancel
          <KeyboardArrowUpIcon />
        </Button>
      </DefaultButton>
    </FormControl>
  );
}
