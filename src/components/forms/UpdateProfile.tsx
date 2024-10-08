import { useEffect } from 'react';
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
import DefaultSubTitle from '../titles/SubTitle';
import SecondaryButton from '../../styles/mui-styles/components/SecondaryBtn.tsx';
import { PriorityHigh } from '@mui/icons-material';
import { snackBarSuccess } from '../../services/snackbar/SnackBarSuccess.tsx';
import { snackBarError } from '../../services/snackbar/SnackBarError.tsx';

const apiKey = import.meta.env.VITE_NOROFF_API_KEY;

/**
 * EditProfile component allows users to edit their profile details such as bio, avatar, and banner.
 * @param {EditProfileProps} props - The props for the EditProfile component.
 * @param {Function} onClose - Function to close the edit modal.
 * @param {HostData} currentProfile - The current profile data.
 * @param {Function} onProfileUpdate - Callback function to update profile data in the parent component.
 */
function EditProfile({ onClose, currentProfile, onProfileUpdate }: EditProfileProps) {
  const headers = getValidatedHeader();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
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

  useEffect(() => {
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

  const avatarUrl = watch('avatar.url');
  const bannerUrl = watch('banner.url');

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
      snackBarError('No changes detected.');
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
        snackBarSuccess('Profile updated successfully!');
        onClose();
      }
    } catch (error) {
      snackBarError('Error updating profile. Please try again.');
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
      <Box textAlign="center" mb={3}>
        <DefaultSubTitle>Edit profile</DefaultSubTitle>
      </Box>
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
                  rows={2}
                  placeholder="Adventurer by heart, love fine dining and..."
                  variant="standard"
                  {...field}
                  error={!!errors.bio}
                  helperText={errors.bio?.message}
                  aria-label="Bio"
                />
              </DefaultInput>
            )}
          />
        </Grid>
        <Grid size={12}>
          <SubTitle>Avatar</SubTitle>
          <Controller
            name="avatar.url"
            control={control}
            render={({ field }) => (
              <DefaultInput>
                <TextField
                  fullWidth
                  type="url"
                  placeholder="Image URL"
                  variant="standard"
                  {...field}
                  error={!!errors.avatar?.url}
                  helperText={errors.avatar?.url?.message}
                  aria-label="Avatar URL"
                />
              </DefaultInput>
            )}
          />
        </Grid>

        {avatarUrl && (
          <Grid size={12}>
            <SubTitle>Avatar description</SubTitle>
            <Controller
              name="avatar.alt"
              control={control}
              render={({ field }) => (
                <DefaultInput>
                  <TextField
                    fullWidth
                    type="text"
                    placeholder="Me at my 24th birthday..."
                    variant="standard"
                    {...field}
                    error={!!errors.avatar?.alt}
                    helperText={errors.avatar?.alt?.message}
                    aria-label="Avatar description"
                  />
                </DefaultInput>
              )}
            />
          </Grid>
        )}

        <Grid size={12}>
          <SubTitle>Banner picture</SubTitle>
          <Controller
            name="banner.url"
            control={control}
            render={({ field }) => (
              <DefaultInput>
                <TextField
                  fullWidth
                  type="url"
                  placeholder="Image URL"
                  variant="standard"
                  {...field}
                  error={!!errors.banner?.url}
                  helperText={errors.banner?.url?.message}
                  aria-label="Banner picture URL"
                />
              </DefaultInput>
            )}
          />
        </Grid>

        {bannerUrl && (
          <Grid size={12}>
            <SubTitle>Banner description</SubTitle>
            <Controller
              name="banner.alt"
              control={control}
              render={({ field }) => (
                <DefaultInput>
                  <TextField
                    fullWidth
                    type="text"
                    placeholder="My favorite view..."
                    variant="standard"
                    {...field}
                    error={!!errors.banner?.alt}
                    helperText={errors.banner?.alt?.message}
                    aria-label="Banner description"
                  />
                </DefaultInput>
              )}
            />
          </Grid>
        )}
        {errors.formError && (
          <Grid size={12}>
            <Typography variant="body1" color="error" display="flex" alignItems="center">
              <PriorityHigh />
              {errors.formError.message}
            </Typography>
          </Grid>
        )}

        <Grid size={12} display="flex" justifyContent="flex-end" gap={2}>
          <SecondaryButton>
            <Button onClick={onClose} aria-label="Cancel changes">
              Cancel
            </Button>
          </SecondaryButton>
          <DefaultButton>
            <Button type="submit" aria-label="Save changes">
              Save Changes
            </Button>
          </DefaultButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EditProfile;
