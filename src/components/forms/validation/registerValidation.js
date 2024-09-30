import * as yup from 'yup';
export const registerValidationSchema = yup.object().shape({
  venueManager: yup.boolean().required(),
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[a-zA-Z0-9_]+$/, 'Name should not contain punctuation symbols apart from underscore (_)'),
  email: yup
    .string()
    .required('Valid stud.noroff.no email is required')
    .matches(/^[\w.-]+@stud\.noroff\.no$/, 'Email must be a valid stud.noroff.no email'),
  password: yup
    .string()
    .required('Password must be at least 8 characters long')
    .min(8, 'Password must be at least 8 characters long'),
  bio: yup.string().max(160, 'Bio must be less than 160 characters').optional(),
  avatar: yup
    .object()
    .shape({
      url: yup.string().url('Avatar URL must be a valid URL').optional(),
      alt: yup.string().max(180, 'Avatar alt text must be less than 120 characters').optional(),
    })
    .optional(),
  banner: yup
    .object()
    .shape({
      url: yup.string().url('Banner URL must be a valid URL').optional(),
      alt: yup.string().max(180, 'Banner alt text must be less than 120 characters').optional(),
    })
    .optional(),
});
