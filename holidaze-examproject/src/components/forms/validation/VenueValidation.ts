import * as yup from 'yup';

export const venueValidationSchema = yup.object().shape({
  name: yup.string().required('Venue name is required'),
  location: yup.object().shape({
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    zip: yup.string().required('Zip code is required'),
    country: yup.string().required('Country is required'),
  }),
  description: yup.string().required('Description is required'),
  price: yup.number().min(0, 'Price must be a positive number').required('Price is required'),
  maxGuests: yup.number().min(1, 'At least 1 guest is required').required('Max guests is required'),
  rating: yup.number().min(0).max(5).nullable(), // Optional, can be null
  media: yup
    .array()
    .of(
      yup.object().shape({
        url: yup.string().url('Must be a valid URL').required('Image URL is required'),
        alt: yup.string().optional(),
      }),
    )
    .optional(), // Optional media array
  meta: yup
    .object()
    .shape({
      wifi: yup.boolean(),
      parking: yup.boolean(),
      breakfast: yup.boolean(),
      pets: yup.boolean(),
    })
    .optional(), // Optional meta object
});
