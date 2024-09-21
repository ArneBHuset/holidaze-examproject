import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Button, Box, Checkbox, Typography, Rating, ImageList, ImageListItem } from '@mui/material';
import Grid from '@mui/material/Grid2';
import FormControl from '@mui/material/FormControl';
import DefaultInput from '../../styles/mui-styles/components/inputs.tsx';
import SubTitle from '../titles/SubTitle.tsx';
import { venueValidationSchema } from './validation/VenueValidation.ts';
import CardContent from '@mui/material/CardContent';
import MainCard from '../../layout/MainCard.tsx';
import { ManageVenue } from '../../services/interfaces/api/manageVenues.ts';

interface VenueFormProps {
  initialValues?: Partial<ManageVenue>;
  onSubmit: (formData: ManageVenue) => void;
  submitLabel?: string;
}

function VenueForm({ initialValues = {}, onSubmit, submitLabel = 'Submit Venue' }: VenueFormProps) {
  const [imageUrls, setImageUrls] = useState<string[]>(initialValues?.media?.map((item) => item.url) || []);
  const [hoverRating, setHoverRating] = useState<number | null>(initialValues?.rating || 0);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(venueValidationSchema),
    defaultValues: initialValues,
  });

  const handleAddImageUrl = (url: string) => {
    if (url.trim()) {
      setImageUrls([...imageUrls, url]);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const url = event.currentTarget.value;
    if (event.key === 'Enter') {
      handleAddImageUrl(url);
      event.currentTarget.value = '';
      event.preventDefault();
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const url = event.currentTarget.value;
    handleAddImageUrl(url);
    event.currentTarget.value = '';
  };

  const onFormSubmit = (data: ManageVenue) => {
    const venueData: ManageVenue = {
      ...data,
      media: imageUrls.map((url) => ({ url, alt: '' })),
      rating: data.rating || 0,
    };
    onSubmit(venueData);
  };

  return (
    <MainCard>
      <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
        <FormControl component="form" onSubmit={handleSubmit(onFormSubmit)}>
          <Grid container spacing={4} maxWidth="sm">
            <Grid size={{ xs: 12 }}>
              <Box>
                <SubTitle>Venue name</SubTitle>
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
              </Box>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Box>
                <SubTitle>Description</SubTitle>
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
              </Box>
            </Grid>

            <Grid size={{ xs: 6 }}>
              <Box>
                <SubTitle>Address</SubTitle>
                <Controller
                  name="location.address"
                  control={control}
                  render={({ field }) => (
                    <DefaultInput>
                      <TextField
                        fullWidth
                        placeholder="Address"
                        variant="standard"
                        {...field}
                        error={!!errors.location?.address}
                        helperText={errors.location?.address?.message}
                      />
                    </DefaultInput>
                  )}
                />
              </Box>
            </Grid>

            <Grid size={{ xs: 6 }}>
              <Box>
                <SubTitle>City</SubTitle>
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
              </Box>
            </Grid>

            <Grid size={{ xs: 6 }}>
              <Box>
                <SubTitle>Zip Code</SubTitle>
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
              </Box>
            </Grid>

            <Grid size={{ xs: 6 }}>
              <Box>
                <SubTitle>Country</SubTitle>
                <Controller
                  name="location.country"
                  control={control}
                  render={({ field }) => (
                    <DefaultInput>
                      <TextField
                        fullWidth
                        placeholder="Country"
                        variant="standard"
                        {...field}
                        error={!!errors.location?.country}
                        helperText={errors.location?.country?.message}
                      />
                    </DefaultInput>
                  )}
                />
              </Box>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Box>
                <SubTitle>Price per Night</SubTitle>
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
              </Box>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Box>
                <SubTitle>Max Guests</SubTitle>
                <Controller
                  name="maxGuests"
                  control={control}
                  render={({ field }) => (
                    <DefaultInput>
                      <TextField
                        fullWidth
                        placeholder="Max Guests"
                        variant="standard"
                        type="number"
                        {...field}
                        error={!!errors.maxGuests}
                        helperText={errors.maxGuests?.message}
                      />
                    </DefaultInput>
                  )}
                />
              </Box>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Box>
                <SubTitle>Rating</SubTitle>
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
              </Box>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6">Facility Details</Typography>
            </Grid>
            {['wifi', 'parking', 'breakfast', 'pets'].map((metaItem) => (
              <Grid size={6} key={metaItem}>
                <Box display="flex" alignItems="center">
                  <Controller
                    name={`meta.${metaItem}`}
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <Checkbox
                        size="large"
                        {...field}
                        sx={{
                          color: 'primary.main',
                          '&.Mui-checked': { color: 'secondary.main' },
                        }}
                      />
                    )}
                  />
                  <Typography variant="body1" sx={{ color: 'text.primary' }}>
                    {metaItem.charAt(0).toUpperCase() + metaItem.slice(1)}
                  </Typography>
                </Box>
              </Grid>
            ))}
            <Grid size={{ xs: 12 }}>
              <Box>
                <SubTitle>Upload Images</SubTitle>
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
                        onKeyDown={handleKeyDown}
                        onBlur={handleBlur}
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
              </Box>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Button type="submit" variant="contained" fullWidth>
                {submitLabel}
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </CardContent>
    </MainCard>
  );
}

export default VenueForm;
