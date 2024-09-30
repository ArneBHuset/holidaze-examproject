import * as yup from 'yup';
/**
 * Validates the login form data and updates the `errors`
 * state with appropriate error messages if the validation fails.
 *
 * @param {LoginData} loginFormData - The data from the login form that needs to be validated.
 * @param {any} errors - The current error state, which is an object that stores error messages for each form field.
 * @param {React.Dispatch<React.SetStateAction<LoginData>>} setErrors - The state set function used to update the error state.
 * @returns {boolean} - Returns true if the form data is valid, false if not
 */
export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Please enter email')
    .matches(/^[\w.-]+@stud\.noroff\.no$/, 'Email must be a valid stud.noroff.no email'),
  password: yup
    .string()
    .required('Password must be at least 8 characters long')
    .min(8, 'Password must be at least 8 characters long'),
});
