import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid2';
import DefaultSubTitle from '../titles/SubTitle.tsx';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import DefaultButton from '../../styles/mui-styles/components/defaultBtn.tsx';
import FormControl from '@mui/material/FormControl';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { getValidatedHeader } from '../../services/api/variables/headers.ts';
import { bookingEndpoint } from '../../services/api/variables/endpoints/bookingEndpoint.ts';
import baseApiCall from '../../services/api/apiMain.ts';
import VenueData from '../../services/interfaces/api/venueResponse.ts';
import dayjs, { Dayjs } from 'dayjs';
import { yupResolver } from '@hookform/resolvers/yup';
import { newBookingValidation } from './validation/newBookingValidation.ts';
const apiKey = import.meta.env.VITE_NOROFF_API_KEY;

type Anchor = 'top' | 'left' | 'bottom' | 'right';

interface FormValues {
  checkInDate: Dayjs | null;
  checkOutDate: Dayjs | null;
  guests: number;
}

interface DrawerComponentProps {
  open: boolean;
  toggleDrawer: (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  venue: VenueData;
}

const BookVenueDrawer: React.FC<DrawerComponentProps> = ({ open, toggleDrawer, venue }) => {
  const anchor: Anchor = 'bottom';

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(newBookingValidation),
    defaultValues: {
      checkInDate: null,
      checkOutDate: null,
      guests: 1,
    },
  });

  const checkInDate = watch('checkInDate');
  const checkOutDate = watch('checkOutDate');

  const isDateUnavailable = (date: Dayjs) => {
    return venue.bookings?.some((booking) => dayjs(date).isBetween(booking.dateFrom, booking.dateTo, null, '[]'));
  };

  const onSubmit = async (data: FormValues) => {
    const bookingData = {
      dateFrom: data.checkInDate?.toISOString(),
      dateTo: data.checkOutDate?.toISOString(),
      guests: data.guests,
      venueId: venue.id,
    };

    try {
      const headers = getValidatedHeader();
      console.log(apiKey);
      const response = await baseApiCall({
        url: bookingEndpoint,
        method: 'POST',
        headers: { ...headers, 'X-Noroff-Api-Key': apiKey },
        body: JSON.stringify(bookingData),
      });
      console.log('Booking successful:', response);
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={toggleDrawer(anchor, false)}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300 }}
        role="presentation"
        display="flex"
        justifyContent="center"
      >
        <FormControl component="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4} maxWidth="sm" justifyContent="center">
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
                      shouldDisableDate={isDateUnavailable}
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

            <Grid size={12}>
              <DefaultSubTitle>Guests</DefaultSubTitle>
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
            </Grid>

            <Grid size={12}>
              <DefaultButton>
                <Button fullWidth={true} onClick={handleSubmit(onSubmit)}>
                  BOOK
                </Button>
              </DefaultButton>
            </Grid>
          </Grid>
        </FormControl>
      </Box>
    </Drawer>
  );
};

export default BookVenueDrawer;
