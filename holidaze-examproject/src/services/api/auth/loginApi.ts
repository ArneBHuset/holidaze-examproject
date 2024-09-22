import baseApiCall from '../apiMain';
import { loginEndpoint } from '../variables/endpoints/authEndpoint.ts';
import { unValidatedHeader } from '../variables/headers';
import LoginData from '../../interfaces/LoginForm.ts';
import { snackBarError } from '../../snackbar/SnackBarError.tsx';
import { snackBarSuccess } from '../../snackbar/SnackBarSuccess.tsx';
import { ApiError } from '../../interfaces/error/catchError.ts';

/**
 * Function for login authentication. If successful,
 * the response accessToken and profile data will be stored in local storage.
 * @param {LoginData} loginFormData - Validated data for logging in, used in the API call body.
 * @param updateVenueManagerStatus - Set's venueManager status to true or false in a global context
 * @returns {Promise<{ success: boolean; message?: string }>} - Result of the API call with success status and optional message.
 */
export async function loginApiCall(
  loginFormData: LoginData,
  updateVenueManagerStatus: (status: boolean) => void,
): Promise<{ success: boolean; message?: string }> {
  console.log('Used for LOGIN call', loginEndpoint, 'POST', unValidatedHeader, loginFormData);
  try {
    const loginResponse = await baseApiCall({
      url: loginEndpoint,
      method: 'POST',
      headers: unValidatedHeader,
      body: JSON.stringify(loginFormData),
    });
    if (loginResponse.data && loginResponse.data.accessToken) {
      snackBarSuccess('Welcome back ' + loginResponse.data.name);
      localStorage.setItem('accessToken', loginResponse.data.accessToken);
      localStorage.setItem('profileData', JSON.stringify(loginResponse.data));
      updateVenueManagerStatus(loginResponse.data.venueManager);
      console.log(loginResponse);
      return { success: true };
    } else {
      const errorMessage = loginResponse.errors?.[0]?.message || 'Wrong password';
      return { success: false, message: errorMessage };
    }
  } catch (error) {
    const apiError = error as ApiError;
    snackBarError(apiError.message || 'An error occurred with logging in');
    return { success: false, message: 'An error occurred. Please try again later.' };
  }
}
