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
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { yupResolver } from '@hookform/resolvers/yup';
import { newBookingValidation } from './validation/newBookingValidation.ts';
import { FormValues } from '../../services/interfaces/newBookingForm.ts';
import { DrawerComponentProps } from '../../services/interfaces/newBookingForm.ts';
import { snackBarError } from '../../services/snackbar/SnackBarError.tsx';
import Person4Icon from '@mui/icons-material/Person4';
import { useNavigate } from 'react-router-dom';
import DefaultInput from '../../styles/mui-styles/components/inputs.tsx';
import { snackBarSuccess } from '../../services/snackbar/SnackBarSuccess.tsx';
import { ApiError } from '../../services/interfaces/error/catchError.ts';

dayjs.extend(isBetween);
const apiKey = import.meta.env.VITE_NOROFF_API_KEY;

/**
 * BookVenueDrawer component allows users to book a venue with check-in, check-out, and guest amount data
 * @param {DrawerComponentProps} props - The props for the drawer including venue data and state management.
 */
function BookVenueDrawer({ open, toggleDrawer, venue }: DrawerComponentProps) {
  const [success, setSuccess] = useState(false);
  const anchor = 'bottom' as const;
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(newBookingValidation(venue.maxGuests)),
    defaultValues: {
      checkInDate: null,
      checkOutDate: null,
      guests: 1,
    },
  });
  const checkInDate = watch('checkInDate');
  const isDateUnavailable = (date: Dayjs) => {
    return venue.bookings
      ? venue.bookings.some((booking) => dayjs(date).isBetween(booking.dateFrom, booking.dateTo, null, '[]'))
      : false;
  };

  const onSubmit = async (data: FormValues) => {

    const bookingData = {
      dateFrom: data.checkInDate?.toISOString(),
      dateTo: data.checkOutDate?.toISOString(),
      guests: data.guests,
      venueId: venue.id,
    };
  console.log(bookingData)
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
      const apiError = error as ApiError;
      snackBarError(apiError.message || 'Error creating booking. Please try again.');
    }
  };
  const handleViewBookings = () => {
    navigate('/user-overview');
  };
  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={toggleDrawer(anchor, false)}
      ModalProps={{
        keepMounted: true,
      }}
      role="dialog"
      aria-labelledby="booking-form-title"
    >
      <Box sx={{ width: 'auto' }} role="presentation" display="flex" justifyContent="center" padding={4}>
        <FormControl component="form" onSubmit={handleSubmit(onSubmit)} aria-labelledby="booking-form-title">
          <Grid container spacing={3} maxWidth="sm" justifyContent="center">
            <Grid size={12} textAlign="center">
              <DefaultSubTitle>Place booking</DefaultSubTitle>
            </Grid>
            <Grid size={6}>
              <Box mb={1}>
                <DefaultSubTitle>Check-in</DefaultSubTitle>
              </Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="checkInDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      disablePast
                      shouldDisableDate={isDateUnavailable}
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
                          inputProps: {
                            'aria-invalid': !!errors.checkInDate,
                            'aria-describedby': errors.checkInDate ? 'check-in-error' : undefined,
                          },
                        },
                      }}
                    />
                  )}
                />
                {errors.checkInDate && (
                  <Typography id="check-in-error" color="error" variant="caption">
                    {errors.checkInDate.message}
                  </Typography>
                )}
              </LocalizationProvider>
            </Grid>
            <Grid size={6}>
              <Box mb={1}>
                <DefaultSubTitle>Check-out</DefaultSubTitle>
              </Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="checkOutDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      disablePast
                      minDate={checkInDate ? dayjs(checkInDate).add(1, 'day') : dayjs()}
                      shouldDisableDate={isDateUnavailable}
                      disabled={!checkInDate}
                      slots={{ textField: TextField }}
                      slotProps={{
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
                      }}
                    />
                  )}
                />
                {errors.checkOutDate && (
                  <Typography id="check-out-error" color="error" variant="caption">
                    {errors.checkOutDate.message}
                  </Typography>
                )}
              </LocalizationProvider>
            </Grid>
            <Grid size={6}>
              <DefaultSubTitle>Guests</DefaultSubTitle>
              <DefaultInput>
                <Controller
                  name="guests"
                  control={control}
                  defaultValue={1}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="number"
                      placeholder="Number of guests"
                      variant="standard"
                      error={!!errors.guests}
                      helperText={errors.guests ? errors.guests.message : ''}
                    />
                  )}
                />
                {errors.guests && (
                  <Typography id="guests-error" color="error" variant="caption">
                    {errors.guests.message}
                  </Typography>
                )}
              </DefaultInput>
            </Grid>
            <Grid size={6}>
              <DefaultSubTitle>Max guests</DefaultSubTitle>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: 2 }}>
                <Person4Icon sx={{ color: 'secondary.main', fontSize: 28 }} />
                {venue.maxGuests}
              </Typography>
            </Grid>
            <Grid size={success ? 8 : 12}>
              <DefaultButton>
                <Button fullWidth onClick={handleSubmit(onSubmit)} aria-label="Book venue">
                  BOOK
                </Button>
              </DefaultButton>
            </Grid>
            {success && (
              <Grid size={4}>
                <DefaultButton>
                  <Button fullWidth onClick={handleViewBookings} aria-label="View your bookings">
                    VIEW BOOKINGS
                  </Button>
                </DefaultButton>
              </Grid>
            )}
          </Grid>
        </FormControl>
      </Box>
    </Drawer>
  );
}

export default BookVenueDrawer;
