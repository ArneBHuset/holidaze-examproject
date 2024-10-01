import * as yup from 'yup';

export const newBookingValidation = (maxGuests: number) =>
  yup.object({
    checkInDate: yup.date().nullable().required('Check-in date is required'),
    checkOutDate: yup
      .date()
      .nullable()
      .required('Check-out date is required')
      .min(yup.ref('checkInDate'), 'Check-out date cannot be before check-in date'),
    guests: yup
      .number()
      .nullable()
      .min(1, 'At least 1 guest is required')
      .max(maxGuests, `Maximum guests allowed is ${maxGuests}`)
      .required('Number of guests is required'),
  });
