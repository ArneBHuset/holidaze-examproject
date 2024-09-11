import baseApiCall from '../apiMain.ts';
import { registerEndpoint } from '../variables/endpoints/authEndpoint.ts';
import { unValidatedHeader } from '../variables/headers.ts';
import RegistrationData from '../../interfaces/registrationForm.ts';
import { snackBarError } from '../../snackbar/SnackBarError.tsx';
import { snackBarSuccess } from '../../snackbar/SnackBarSuccess.tsx';

/**
 * Function for user registration
 * @param {object} registrationFormData - Validated data for registering, used in api call body
 * @param {function} setIsRegistering - Function to switch to the login component after registration
 */
export async function registrationApiCall(
  registrationFormData: RegistrationData,
  setIsRegistering: React.Dispatch<React.SetStateAction<boolean>>
) {
  try {
    const registrationResponse = await baseApiCall({
      url: registerEndpoint,
      method: 'POST',
      headers: unValidatedHeader,
      body: JSON.stringify(registrationFormData),
    });

    if (registrationResponse && registrationResponse.success) {
      snackBarSuccess('Registration successful! Please log in.');
      setIsRegistering(true);
    } else {
      const errorMessage = registrationResponse?.errors?.[0]?.message || 'Registration failed. Please try again.';
      snackBarError(errorMessage);
    }
  } catch (error: any) {
    snackBarError(error.message || 'An error occurred with registering');
  }
}
