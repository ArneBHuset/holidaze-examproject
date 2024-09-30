import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Button, Box, Checkbox, Typography, Rating, ImageList, ImageListItem } from '@mui/material';
import Grid from '@mui/material/Grid2';
import FormControl from '@mui/material/FormControl';
import DefaultInput from '../../styles/mui-styles/components/inputs.tsx';
import SubTitle from '../titles/SubTitle.tsx';
import { venueValidationSchema } from './validation/VenueValidation.ts';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DefaultButton from '../../styles/mui-styles/components/defaultBtn.tsx';
/**
 * NewVenueForm is a form component used for creating a new venue.
 * @param {Object} props - The props object for NewVenueForm.
 * @param {Partial<VenueCreateUpdate>} props.initialValues - Initial values to populate the form, which include venue details like name, location, media, etc.
 * @param {function} props.onSubmit - A callback function to handle form submission. Receives the new venue data as an argument.
 * @param {string} [props.submitLabel='Submit Venue'] - Label text for the submit button. Defaults to 'Submit Venue'.
 */
function NewVenueForm({ initialValues = {}, onSubmit, submitLabel = 'Post venue' }) {
  const [imageUrl, setImageUrl] = useState(''); // For the input field
  const [imageUrls, setImageUrls] = useState(
    initialValues?.media?.map((item) => ({ url: item.url, alt: item.alt || '' })) || [],
  );
  const [hoverRating, setHoverRating] = useState(initialValues?.rating || 0);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(venueValidationSchema),
    defaultValues: {
      ...initialValues,
      rating: initialValues.rating ?? null,
      media: initialValues.media ?? [],
      meta: {
        wifi: initialValues.meta?.wifi ?? false,
        parking: initialValues.meta?.parking ?? false,
        breakfast: initialValues.meta?.breakfast ?? false,
        pets: initialValues.meta?.pets ?? false,
      },
    },
  });
  const handleAddImageUrl = () => {
    if (imageUrl.trim()) {
      const updatedUrls = [...imageUrls, { url: imageUrl, alt: '' }];
      setImageUrls(updatedUrls);
      setImageUrl('');
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAddImageUrl();
      event.preventDefault();
    }
  };
  const handleBlur = () => {
    handleAddImageUrl();
  };
  const handleDeleteImage = (index) => {
    const updatedImages = imageUrls.filter((_, i) => i !== index);
    setImageUrls(updatedImages);
  };
  const onFormSubmit = (data) => {
    const venueData = {
      ...data,
      name: data.name || '',
      location: {
        address: data.location?.address || '',
        city: data.location?.city || '',
        zip: data.location?.zip || '',
        country: data.location?.country || '',
      },
      description: data.description || '',
      price: data.price || 0,
      maxGuests: data.maxGuests || 1,
      media: imageUrls, // Use the imageUrls state for media
      rating: data.rating || 0,
      meta: {
        wifi: data.meta?.wifi || false,
        parking: data.meta?.parking || false,
        breakfast: data.meta?.breakfast || false,
        pets: data.meta?.pets || false,
      },
    };
    console.log('Submitting form data with media:', venueData); // Debug log to check submission data
    onSubmit(venueData);
  };
  return _jsx(CardContent, {
    sx: { display: 'flex', justifyContent: 'center' },
    children: _jsx(FormControl, {
      component: 'form',
      onSubmit: handleSubmit(onFormSubmit),
      children: _jsxs(Grid, {
        container: true,
        spacing: 4,
        maxWidth: 'sm',
        children: [
          _jsx(Grid, {
            size: { xs: 12 },
            children: _jsxs(Box, {
              children: [
                _jsx(SubTitle, { children: 'Venue name' }),
                _jsx(Controller, {
                  name: 'name',
                  control: control,
                  render: ({ field }) =>
                    _jsx(DefaultInput, {
                      children: _jsx(TextField, {
                        fullWidth: true,
                        placeholder: 'Venue Name',
                        variant: 'standard',
                        ...field,
                        error: !!errors.name,
                        helperText: errors.name?.message,
                      }),
                    }),
                }),
              ],
            }),
          }),
          _jsx(Grid, {
            size: { xs: 12 },
            children: _jsxs(Box, {
              children: [
                _jsx(SubTitle, { children: 'Description' }),
                _jsx(Controller, {
                  name: 'description',
                  control: control,
                  render: ({ field }) =>
                    _jsx(DefaultInput, {
                      children: _jsx(TextField, {
                        fullWidth: true,
                        multiline: true,
                        rows: 4,
                        placeholder: 'Description',
                        variant: 'standard',
                        ...field,
                        error: !!errors.description,
                        helperText: errors.description?.message,
                      }),
                    }),
                }),
              ],
            }),
          }),
          _jsx(Grid, {
            size: { xs: 6 },
            children: _jsxs(Box, {
              children: [
                _jsx(SubTitle, { children: 'Country' }),
                _jsx(Controller, {
                  name: 'location.country',
                  control: control,
                  render: ({ field }) =>
                    _jsx(DefaultInput, {
                      children: _jsx(TextField, {
                        fullWidth: true,
                        placeholder: 'Country',
                        variant: 'standard',
                        ...field,
                        error: !!errors.location?.country,
                        helperText: errors.location?.country?.message,
                      }),
                    }),
                }),
              ],
            }),
          }),
          _jsx(Grid, {
            size: { xs: 6 },
            children: _jsxs(Box, {
              children: [
                _jsx(SubTitle, { children: 'City' }),
                _jsx(Controller, {
                  name: 'location.city',
                  control: control,
                  render: ({ field }) =>
                    _jsx(DefaultInput, {
                      children: _jsx(TextField, {
                        fullWidth: true,
                        placeholder: 'City',
                        variant: 'standard',
                        ...field,
                        error: !!errors.location?.city,
                        helperText: errors.location?.city?.message,
                      }),
                    }),
                }),
              ],
            }),
          }),
          _jsx(Grid, {
            size: { xs: 6 },
            children: _jsxs(Box, {
              children: [
                _jsx(SubTitle, { children: 'Zip Code' }),
                _jsx(Controller, {
                  name: 'location.zip',
                  control: control,
                  render: ({ field }) =>
                    _jsx(DefaultInput, {
                      children: _jsx(TextField, {
                        fullWidth: true,
                        placeholder: 'Zip Code',
                        variant: 'standard',
                        ...field,
                        error: !!errors.location?.zip,
                        helperText: errors.location?.zip?.message,
                      }),
                    }),
                }),
              ],
            }),
          }),
          _jsx(Grid, {
            size: { xs: 6 },
            children: _jsxs(Box, {
              children: [
                _jsx(SubTitle, { children: 'Street' }),
                _jsx(Controller, {
                  name: 'location.address',
                  control: control,
                  render: ({ field }) =>
                    _jsx(DefaultInput, {
                      children: _jsx(TextField, {
                        fullWidth: true,
                        placeholder: 'Address',
                        variant: 'standard',
                        ...field,
                        error: !!errors.location?.address,
                        helperText: errors.location?.address?.message,
                      }),
                    }),
                }),
              ],
            }),
          }),
          _jsx(Grid, {
            size: { xs: 6 },
            children: _jsxs(Box, {
              children: [
                _jsx(SubTitle, { children: 'Price' }),
                _jsx(Controller, {
                  name: 'price',
                  control: control,
                  render: ({ field }) =>
                    _jsx(DefaultInput, {
                      children: _jsx(TextField, {
                        fullWidth: true,
                        placeholder: 'Price per Night',
                        variant: 'standard',
                        type: 'number',
                        ...field,
                        error: !!errors.price,
                        helperText: errors.price?.message,
                      }),
                    }),
                }),
              ],
            }),
          }),
          _jsx(Grid, {
            size: { xs: 6 },
            children: _jsxs(Box, {
              children: [
                _jsx(SubTitle, { children: 'Max Guests' }),
                _jsx(Controller, {
                  name: 'maxGuests',
                  control: control,
                  render: ({ field }) =>
                    _jsx(DefaultInput, {
                      children: _jsx(TextField, {
                        fullWidth: true,
                        placeholder: 'Max Guests',
                        variant: 'standard',
                        type: 'number',
                        ...field,
                        error: !!errors.maxGuests,
                        helperText: errors.maxGuests?.message,
                      }),
                    }),
                }),
              ],
            }),
          }),
          _jsx(Grid, {
            size: { xs: 12 },
            children: _jsxs(Box, {
              children: [
                _jsx(SubTitle, { children: 'Rating' }),
                _jsx(Controller, {
                  name: 'rating',
                  control: control,
                  render: ({ field }) =>
                    _jsxs(Box, {
                      display: 'flex',
                      alignItems: 'center',
                      gap: 3,
                      mt: 2,
                      ml: 1,
                      children: [
                        _jsx(Rating, {
                          ...field,
                          max: 5,
                          size: 'large',
                          value: field.value,
                          onChange: (_, newValue) => {
                            field.onChange(newValue);
                          },
                          onChangeActive: (_, hoverValue) => {
                            setHoverRating(hoverValue !== -1 ? (hoverValue ?? null) : (field.value ?? null));
                          },
                          sx: { color: 'secondary.main' },
                        }),
                        _jsx(Typography, { variant: 'h5', children: hoverRating !== null ? hoverRating : field.value }),
                      ],
                    }),
                }),
              ],
            }),
          }),
          _jsx(Grid, { size: { xs: 12 }, children: _jsx(SubTitle, { children: 'FACILITY DETAILS' }) }),
          ['wifi', 'parking', 'breakfast', 'pets'].map((metaItem) =>
            _jsx(
              Grid,
              {
                size: 6,
                children: _jsxs(Box, {
                  display: 'flex',
                  alignItems: 'center',
                  children: [
                    _jsx(Controller, {
                      name: `meta.${metaItem}`,
                      control: control,
                      render: ({ field }) =>
                        _jsx(Checkbox, {
                          size: 'large',
                          ...field,
                          sx: {
                            color: 'primary.main',
                            '&.Mui-checked': { color: 'secondary.main' },
                          },
                        }),
                    }),
                    _jsx(Typography, {
                      variant: 'body1',
                      sx: { color: 'text.primary' },
                      children: metaItem.charAt(0).toUpperCase() + metaItem.slice(1),
                    }),
                  ],
                }),
              },
              metaItem,
            ),
          ),
          _jsx(Grid, {
            size: { xs: 12 },
            children: _jsxs(Box, {
              children: [
                _jsx(SubTitle, { children: 'Upload Images' }),
                _jsx(DefaultInput, {
                  children: _jsx(TextField, {
                    fullWidth: true,
                    placeholder: 'Paste Image URL',
                    variant: 'standard',
                    value: imageUrl,
                    onChange: (e) => setImageUrl(e.target.value),
                    onKeyDown: handleKeyDown,
                    onBlur: handleBlur,
                  }),
                }),
                _jsx(ImageList, {
                  cols: 3,
                  rowHeight: 164,
                  children: imageUrls.map((image, index) =>
                    _jsxs(
                      ImageListItem,
                      {
                        children: [
                          _jsxs(Box, {
                            position: 'relative',
                            children: [
                              _jsx('img', {
                                src: image.url,
                                alt: image.alt || `Uploaded ${index}`,
                                loading: 'lazy',
                                style: {
                                  width: '100%',
                                  height: 'auto',
                                  maxHeight: '150px',
                                },
                              }),
                              _jsx(IconButton, {
                                size: 'small',
                                onClick: () => handleDeleteImage(index),
                                sx: {
                                  position: 'absolute',
                                  top: 0,
                                  right: 0,
                                  color: 'secondary.main',
                                },
                                children: _jsx(CloseIcon, {}),
                              }),
                            ],
                          }),
                          _jsx(DefaultInput, {
                            children: _jsx(TextField, {
                              fullWidth: true,
                              placeholder: 'Alt Text',
                              variant: 'standard',
                              value: image.alt,
                              onChange: (e) => {
                                const newAlt = e.target.value;
                                const updatedImages = [...imageUrls];
                                updatedImages[index].alt = newAlt;
                                setImageUrls(updatedImages);
                              },
                            }),
                          }),
                        ],
                      },
                      index,
                    ),
                  ),
                }),
              ],
            }),
          }),
          _jsx(Grid, {
            container: true,
            spacing: 2,
            width: '100%',
            children: _jsx(Grid, {
              size: 12,
              mb: 2,
              pb: 2,
              children: _jsx(DefaultButton, {
                children: _jsx(Button, { type: 'submit', fullWidth: true, sx: { gap: 1 }, children: submitLabel }),
              }),
            }),
          }),
        ],
      }),
    }),
  });
}
export default NewVenueForm;
