import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Button, Box, Checkbox, Typography, Rating } from '@mui/material';
import  Grid  from '@mui/material/Grid2';
import FormControl from '@mui/material/FormControl';
import DefaultInput from '../../styles/mui-styles/components/inputs.tsx';
import DefaultButton from '../../styles/mui-styles/components/defaultBtn.tsx';
import SecondaryButton from '../../styles/mui-styles/components/SecondaryBtn.tsx';
import { venueValidationSchema } from './validation/NewVenueValidation.ts';
import baseApiCall from '../../services/api/apiMain.ts';
import { getValidatedHeader } from '../../services/api/variables/headers.ts';
import { snackBarSuccess } from '../../services/snackbar/SnackBarSuccess.tsx';
import { snackBarError } from '../../services/snackbar/SnackBarError.tsx';
import { ImageList, ImageListItem } from '@mui/material';

const apiKey = import.meta.env.VITE_NOROFF_API_KEY;

function UpdateVenue({ venue, onCancel }: { venue: any; onCancel: () => void }) {
  const [imageUrls, setImageUrls] = useState<string[]>(venue.media?.map((item: any) => item.url) || []);
  const [hoverRating, setHoverRating] = useState<number | null>(venue.rating || 0);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(venueValidationSchema),
    defaultValues: {
      name: venue.name,
      description: venue.description,
      price: venue.price,
      maxGuests: venue.maxGuests,
      rating: venue.rating,
      meta: venue.meta,
      location: venue.location,
    },
  });

  const handleAddImageUrl = (url: string) => {
    if (url.trim()) {
      setImageUrls([...imageUrls, url]);
    }
  };

  const onFormSubmit = async (data: any) => {
    const venueData = {
      name: data.name,
      description: data.description,
      media: imageUrls.map((url) => ({ url, alt: '' })),
      price: Number(data.price),
      maxGuests: data.maxGuests,
      rating: data.rating || 0,
      meta: {
        wifi: data.meta?.wifi || false,
        parking: data.meta?.parking || false,
        breakfast: data.meta?.breakfast || false,
        pets: data.meta?.pets || false,
      },
      location: {
        address: data.location?.address,
        city: data.location?.city,
        zip: data.location?.zip,
        country: data.location?.country,
      },
    };

    try {
      const headers = getValidatedHeader();
      await baseApiCall({
        url: `/holidaze/venues/${venue.id}`,
        method: 'PUT',
        headers: { ...headers, 'X-Noroff-Api-Key': apiKey },
        body: JSON.stringify(venueData),
      });
      snackBarSuccess('Venue updated successfully!');
      onCancel();
    } catch (error) {
      snackBarError('Failed to update venue. Please try again.');
    }
  };

  return (
    <FormControl component="form" onSubmit={handleSubmit(onFormSubmit)}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <DefaultInput>
                <TextField
                  fullWidth
                  placeholder="Venue Name"
                  variant="standard"
                  {...field}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </DefaultInput>
            )}
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Controller
            name="location.city"
            control={control}
            render={({ field }) => (
              <DefaultInput>
                <TextField
                  fullWidth
                  placeholder="City"
                  variant="standard"
                  {...field}
                  error={!!errors.location?.city}
                  helperText={errors.location?.city?.message}
                />
              </DefaultInput>
            )}
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Controller
            name="location.zip"
            control={control}
            render={({ field }) => (
              <DefaultInput>
                <TextField
                  fullWidth
                  placeholder="Zip Code"
                  variant="standard"
                  {...field}
                  error={!!errors.location?.zip}
                  helperText={errors.location?.zip?.message}
                />
              </DefaultInput>
            )}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <DefaultInput>
                <TextField
                  fullWidth
                  placeholder="Price per Night"
                  variant="standard"
                  type="number"
                  {...field}
                  error={!!errors.price}
                  helperText={errors.price?.message}
                />
              </DefaultInput>
            )}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <DefaultInput>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Description"
                  variant="standard"
                  {...field}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </DefaultInput>
            )}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="rating"
            control={control}
            render={({ field }) => (
              <Box display="flex" alignItems="center" gap={2}>
                <Rating
                  {...field}
                  max={5}
                  value={field.value}
                  onChange={(_, newValue) => {
                    field.onChange(newValue);
                  }}
                  onChangeActive={(_, hoverValue) => {
                    setHoverRating(hoverValue !== -1 ? hoverValue : field.value);
                  }}
                  sx={{ color: 'secondary.main' }}
                />
                <Typography variant="h5">{hoverRating !== null ? hoverRating : field.value}</Typography>
              </Box>
            )}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="imageUpload"
            control={control}
            render={({ field }) => (
              <DefaultInput>
                <TextField
                  {...field}
                  fullWidth
                  placeholder="Paste Image URL"
                  variant="standard"
                  onBlur={(event) => handleAddImageUrl(event.target.value)}
                />
              </DefaultInput>
            )}
          />
          <ImageList cols={3} rowHeight={164}>
            {imageUrls.map((url, index) => (
              <ImageListItem key={index}>
                <img src={url} alt={`Uploaded ${index}`} loading="lazy" />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <SecondaryButton>
            <Button type="submit" fullWidth>
              Save Changes
            </Button>
          </SecondaryButton>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <DefaultButton>
            <Button fullWidth onClick={onCancel}>
              Cancel
            </Button>
          </DefaultButton>
        </Grid>
      </Grid>
    </FormControl>
  );
}

export default UpdateVenue;
