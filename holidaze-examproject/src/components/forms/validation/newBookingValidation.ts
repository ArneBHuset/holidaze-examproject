import * as yup from 'yup';

export const newBookingValidation = yup.object({
  checkInDate: yup.date().nullable().required('Check-in date is required'),
  checkOutDate: yup
    .date()
    .nullable()
    .required('Check-out date is required')
    .min(yup.ref('checkInDate'), 'Check-out date cannot be before check-in date'),
  guests: yup.number().min(1, 'At least 1 guest is required').required('Number of guests is required'),
});
