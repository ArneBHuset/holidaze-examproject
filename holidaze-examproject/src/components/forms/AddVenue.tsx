import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormControl from '@mui/material/FormControl';
import { TextField, Button, Box, Checkbox, Typography, Rating, ImageList, ImageListItem } from '@mui/material';
import Grid from '@mui/material/Grid2';
import MainCard from '../../layout/MainCard.tsx';
import SubTitle from '../titles/SubTitle.tsx';
import { venueValidationSchema } from './validation/NewVenueValidation.ts';
import DefaultButton from '../../styles/mui-styles/components/defaultBtn.tsx';
import DefaultInput from '../../styles/mui-styles/components/inputs.tsx';
import CardContent from '@mui/material/CardContent';
import DefaultSubTitle from '../titles/SubTitle.tsx';

function AddVenue({ onSubmit }: { onSubmit: (formData: any) => void }) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [hoverRating, setHoverRating] = useState<number | null>(0);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(venueValidationSchema),
  });

  const onFormSubmit = (data: any) => {
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
        address: data.location.address,
        city: data.location.city,
        zip: data.location.zip,
        country: data.location.country,
      },
    };
    onSubmit(venueData);
  };

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

  return (
    <MainCard>
      <CardContent>
        <FormControl component="form" onSubmit={handleSubmit(onFormSubmit)}>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12 }}>
              <Box>
                <SubTitle>Venue name</SubTitle>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <DefaultInput>
                      <TextField
                        fullWidth
                        placeholder="Villa exellence"
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
                <SubTitle>Location</SubTitle>
                <Controller
                  name="location.country"
                  control={control}
                  defaultValue=""
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
            <Grid size={{ xs: 6 }}>
              <Box>
                <Controller
                  name="location.city"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <DefaultInput>
                      <TextField
                        fullWidth
                        placeholder="City"
                        variant="standard"
                        {...field}
                        error={!!errors.location?.city}
                        helperText={errors.location?.city?.message}
                        autoComplete="address-level2"
                      />
                    </DefaultInput>
                  )}
                />
              </Box>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Box>
                <Controller
                  name="location.zip"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <DefaultInput>
                      <TextField
                        fullWidth
                        placeholder="Zip"
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
            <Grid size={{ xs: 12 }}>
              <Box>
                <Controller
                  name="location.address"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <DefaultInput>
                      <TextField
                        fullWidth
                        autoComplete="address-line1"
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
            <Grid size={{ xs: 12 }}>
              <Box>
                <SubTitle>Price per night</SubTitle>
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <DefaultInput>
                      <TextField
                        fullWidth
                        placeholder="Price"
                        variant="standard"
                        type="number"
                        {...field}
                        error={!!errors.price}
                        helperText={errors.price?.message}
                        slotProps={{
                          htmlInput: {
                            min: 0,
                          },
                        }}
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
                  defaultValue={0}
                  render={({ field }) => (
                    <DefaultInput>
                      <TextField
                        fullWidth
                        type="number"
                        placeholder="Max Guests"
                        variant="standard"
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
                <SubTitle>Description</SubTitle>
                <Controller
                  name="description"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <DefaultInput>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        placeholder="Venue Description"
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
            <Grid size={{ xs: 12 }}>
              <DefaultSubTitle>FACILITY DETAILS</DefaultSubTitle>
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
                        size='large'
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
                <SubTitle>Rating</SubTitle>
                <Controller
                  name="rating"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <Box sx={{ display: 'flex', alignItems: 'center', pt: 4, pl: 1, gap: 2 }} justifyContent={{ xs: 'center', sm: 'flex-start' }}>
                      <Rating
                        {...field}
                        max={5}
                        size="large"
                        precision={1}
                        value={field.value}
                        onChange={(_, newValue) => {
                          field.onChange(newValue);
                        }}
                        onChangeActive={(_, hoverValue) => {
                          setHoverRating(hoverValue !== -1 ? hoverValue : field.value);
                        }}
                        sx={{ color: 'secondary.main' }}
                      />
                      <Typography variant="h5" ml={4}>
                        {hoverRating !== null ? hoverRating : field.value}
                      </Typography>
                    </Box>
                  )}
                />
              </Box>
            </Grid>
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
                        placeholder="Paste image URL"
                        variant="standard"
                        onKeyDown={handleKeyDown}
                        onBlur={handleBlur}
                      />
                    </DefaultInput>
                  )}
                />
                <ImageList cols={3} rowHeight={164} sx={{ mt: 2 }}>
                  {imageUrls.map((url, index) => (
                    <ImageListItem key={index}>
                      <img src={url} alt={`Uploaded ${index}`} loading="lazy" />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Box>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <DefaultButton>
                <Button type="submit" fullWidth={true}>
                  Submit Venue
                </Button>
              </DefaultButton>
            </Grid>
          </Grid>
        </FormControl>
      </CardContent>
    </MainCard>
  );
}

export default AddVenue;
