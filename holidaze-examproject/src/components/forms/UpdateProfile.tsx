import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Button, Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import SubTitle from '../titles/SubTitle';
import { editProfileValidationSchema } from './validation/updateProfileValidation.ts';
import { HostData } from '../../services/interfaces/api/profileDisplay';
import DefaultInput from '../../styles/mui-styles/components/inputs';
import DefaultButton from '../../styles/mui-styles/components/defaultBtn';
import baseApiCall from '../../services/api/apiMain.ts';
import { profileEndpoint } from '../../services/api/variables/endpoints/profileEndpoints.ts';
import { getValidatedHeader } from '../../services/api/variables/headers.ts';
import { EditProfileFormData } from '../../services/interfaces/api/updateProfile.ts';
import { EditProfileProps } from '../../services/interfaces/api/updateProfile.ts';

const apiKey = import.meta.env.VITE_NOROFF_API_KEY;

const EditProfile: React.FC<EditProfileProps> = ({ onClose, currentProfile, onProfileUpdate }) => {
  const headers = getValidatedHeader();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditProfileFormData>({
    resolver: yupResolver(editProfileValidationSchema),
    defaultValues: {
      bio: '',
      avatar: {
        url: '',
        alt: '',
      },
      banner: {
        url: '',
        alt: '',
      },
    },
  });

  React.useEffect(() => {
    reset({
      bio: '',
      avatar: {
        url: '',
        alt: '',
      },
      banner: {
        url: '',
        alt: '',
      },
    });
  }, [currentProfile, reset]);

  const onSubmit = async (data: EditProfileFormData) => {
    const updatedFields: Partial<HostData> = {};

    if (data.bio && data.bio.trim() !== '' && data.bio.trim() !== currentProfile.bio) {
      updatedFields.bio = data.bio.trim();
    }

    if (data.avatar?.url && data.avatar.url.trim() !== '' && data.avatar.url.trim() !== currentProfile.avatar?.url) {
      updatedFields.avatar = {
        url: data.avatar.url.trim(),
        alt: data.avatar.alt?.trim() || currentProfile.avatar?.alt || '',
      };
    }

    if (data.banner?.url && data.banner.url.trim() !== '' && data.banner.url.trim() !== currentProfile.banner?.url) {
      updatedFields.banner = {
        url: data.banner.url.trim(),
        alt: data.banner.alt?.trim() || currentProfile.banner?.alt || '',
      };
    }

    if (Object.keys(updatedFields).length === 0) {
      return;
    }

    try {
      const response = await baseApiCall({
        url: `${profileEndpoint}${currentProfile.name}`,
        method: 'PUT',
        headers: { ...headers, 'X-Noroff-Api-Key': apiKey },
        body: JSON.stringify(updatedFields),
      });

      if (response) {
        const updatedProfile = { ...currentProfile, ...updatedFields };
        localStorage.setItem('profileData', JSON.stringify(updatedProfile));

        onProfileUpdate(updatedProfile);
        onClose();
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%', padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Edit Your Profile
      </Typography>
      <Grid container spacing={2}>
        <Grid size={12}>
          <SubTitle>Bio</SubTitle>
          <Controller
            name="bio"
            control={control}
            render={({ field }) => (
              <DefaultInput>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Why not travel?"
                  variant="standard"
                  {...field}
                  error={!!errors.bio}
                  helperText={errors.bio?.message}
                />
              </DefaultInput>
            )}
          />
        </Grid>

        <Grid size={6}>
          <SubTitle>Avatar Picture URL</SubTitle>
          <Controller
            name="avatar.url"
            control={control}
            render={({ field }) => (
              <DefaultInput>
                <TextField
                  fullWidth
                  type="url"
                  placeholder="Profile picture URL"
                  variant="standard"
                  {...field}
                  error={!!errors.avatar?.url}
                  helperText={errors.avatar?.url?.message}
                />
              </DefaultInput>
            )}
          />
        </Grid>

        <Grid size={6}>
          <SubTitle>Avatar Description</SubTitle>
          <Controller
            name="avatar.alt"
            control={control}
            render={({ field }) => (
              <DefaultInput>
                <TextField
                  fullWidth
                  type="text"
                  placeholder="Me at my 6th birthday"
                  variant="standard"
                  {...field}
                  error={!!errors.avatar?.alt}
                  helperText={errors.avatar?.alt?.message}
                />
              </DefaultInput>
            )}
          />
        </Grid>

        <Grid size={6}>
          <SubTitle>Banner Picture URL</SubTitle>
          <Controller
            name="banner.url"
            control={control}
            render={({ field }) => (
              <DefaultInput>
                <TextField
                  fullWidth
                  type="url"
                  placeholder="Banner picture URL"
                  variant="standard"
                  {...field}
                  error={!!errors.banner?.url}
                  helperText={errors.banner?.url?.message}
                />
              </DefaultInput>
            )}
          />
        </Grid>

        <Grid size={6}>
          <SubTitle>Banner Description</SubTitle>
          <Controller
            name="banner.alt"
            control={control}
            render={({ field }) => (
              <DefaultInput>
                <TextField
                  fullWidth
                  type="text"
                  placeholder="Longings to the ocean"
                  variant="standard"
                  {...field}
                  error={!!errors.banner?.alt}
                  helperText={errors.banner?.alt?.message}
                />
              </DefaultInput>
            )}
          />
        </Grid>

        {errors.formError && (
          <Grid size={12}>
            <Typography variant="body2" color="error">
              {errors.formError.message}
            </Typography>
          </Grid>
        )}

        <Grid size={12} display="flex" justifyContent="flex-end" gap={2}>
          <DefaultButton>
            <Button onClick={onClose} variant="outlined" fullWidth={false}>
              Cancel
            </Button>
          </DefaultButton>
          <DefaultButton>
            <Button type="submit" variant="contained" fullWidth={false}>
              Save Changes
            </Button>
          </DefaultButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditProfile;
