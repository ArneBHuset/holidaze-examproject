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
import { VenueCreateUpdate } from '../../services/interfaces/api/VenueCreateUpdate.ts';
import SecondaryButton from '../../styles/mui-styles/components/SecondaryBtn.tsx';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface VenueFormProps {
  initialValues?: Partial<VenueCreateUpdate>;
  onSubmit: (formData: VenueCreateUpdate) => void;
  onDelete: () => void;
  submitLabel?: string;
}

function UpdateVenueForm({ initialValues = {}, onSubmit, onDelete, submitLabel = 'Save' }: VenueFormProps) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageUrls, setImageUrls] = useState<{ url: string; alt: string }[]>(
    initialValues?.media?.map((item) => ({ url: item.url, alt: item.alt || '' })) || [],
  );
  const [hoverRating, setHoverRating] = useState<number | null>(initialValues?.rating || 0);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VenueCreateUpdate>({
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddImageUrl();
      event.preventDefault();
    }
  };

  const handleBlur = () => {
    handleAddImageUrl();
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = imageUrls.filter((_, i) => i !== index);
    setImageUrls(updatedImages);
  };

  const handleAltTextChange = (index: number, newAlt: string) => {
    const updatedImages = [...imageUrls];
    updatedImages[index].alt = newAlt;
    setImageUrls(updatedImages);
  };

  const onFormSubmit = (data: Partial<VenueCreateUpdate>) => {
    const venueData: VenueCreateUpdate = {
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
      media: imageUrls,
      rating: data.rating || 0,
      meta: {
        wifi: data.meta?.wifi || false,
        parking: data.meta?.parking || false,
        breakfast: data.meta?.breakfast || false,
        pets: data.meta?.pets || false,
      },
    };
    onSubmit(venueData);
  };

  return (
    <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
      <FormControl component="form" onSubmit={handleSubmit(onFormSubmit)}>
        <Grid container spacing={4} maxWidth="sm">
          {/* Venue Name */}
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
              <SubTitle>Street</SubTitle>
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
              <SubTitle>Price</SubTitle>
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
          <Grid size={{ xs: 6 }}>
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
                  <Box display="flex" alignItems="center" gap={3} mt={2} ml={1}>
                    <Rating
                      {...field}
                      max={5}
                      size="large"
                      value={field.value}
                      onChange={(_, newValue) => {
                        field.onChange(newValue);
                      }}
                      onChangeActive={(_, hoverValue) => {
                        setHoverRating(hoverValue !== -1 ? (hoverValue ?? null) : (field.value ?? null));
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
            <SubTitle>FACILITY DETAILS</SubTitle>
          </Grid>
          {['wifi', 'parking', 'breakfast', 'pets'].map((metaItem) => (
            <Grid size={6} key={metaItem}>
              <Box display="flex" alignItems="center">
                <Controller
                  //@ts-expect-error //Unknown
                  name={`meta.${metaItem}`}
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      size="large"
                      checked={!!field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
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
              <DefaultInput>
                <TextField
                  fullWidth
                  placeholder="Paste Image URL"
                  variant="standard"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={handleBlur}
                />
              </DefaultInput>
              <ImageList cols={3} rowHeight={164}>
                {imageUrls.map((image, index) => (
                  <ImageListItem key={index}>
                    <Box position="relative">
                      <img
                        src={image.url}
                        alt={image.alt || `Uploaded ${index}`}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: 'auto',
                          maxHeight: '150px',
                        }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteImage(index)}
                        sx={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          color: 'secondary.main',
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                    <DefaultInput>
                      <TextField
                        fullWidth
                        placeholder="Alt Text"
                        variant="standard"
                        value={image.alt}
                        onChange={(e) => handleAltTextChange(index, e.target.value)}
                      />
                    </DefaultInput>
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          </Grid>
          <Grid container spacing={2} width="100%">
            <Grid size={6}>
              <SecondaryButton>
                <Button fullWidth onClick={onDelete} sx={{ gap: 1 }}>
                  Delete <DeleteOutlineIcon />
                </Button>
              </SecondaryButton>
            </Grid>
            <Grid size={6}>
              <SecondaryButton>
                <Button type="submit" fullWidth sx={{ gap: 1 }}>
                  {submitLabel} <SaveIcon />
                </Button>
              </SecondaryButton>
            </Grid>
          </Grid>
        </Grid>
      </FormControl>
    </CardContent>
  );
}

export default UpdateVenueForm;
