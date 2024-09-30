import * as yup from 'yup';
export const editProfileValidationSchema = yup
    .object()
    .shape({
    bio: yup.string().max(160, 'Bio must be less than 160 characters').optional(),
    avatar: yup
        .object({
        url: yup.string().url('Avatar URL must be a valid URL').optional(),
        alt: yup.string().max(180, 'Avatar alt text must be less than 180 characters').optional(),
    })
        .optional(),
    banner: yup
        .object({
        url: yup.string().url('Banner URL must be a valid URL').optional(),
        alt: yup.string().max(180, 'Banner alt text must be less than 180 characters').optional(),
    })
        .optional(),
})
    .test('at-least-one-field', 'At least one field must be filled', function (value) {
    const { bio, avatar, banner } = value;
    if ((bio && bio.trim() !== '') ||
        (avatar && (avatar.url?.trim() !== '' || avatar.alt?.trim() !== '')) ||
        (banner && (banner.url?.trim() !== '' || banner.alt?.trim() !== ''))) {
        return true;
    }
    return this.createError({
        path: 'formError',
        message: 'No updates found',
    });
});
