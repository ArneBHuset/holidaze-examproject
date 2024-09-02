import baseApiCall from '../apiMain';
import { loginEnpoint } from '../variables/ApiEndpoints';
import { unValidatedHeader } from '../variables/headers';
import LoginData from '../../interfaces/LoginForm.ts';

/**
 * Function for login authentication. If successful,
 * the response accessToken will be stored in local storage.
 * @param {LoginData} loginFormData - Validated data for logging in, used in the API call body.
 */
export async function loginApiCall(loginFormData: LoginData): Promise<{ success: boolean; message?: string }> {
  console.log('Used for LOGIN call', loginEnpoint, 'POST', unValidatedHeader, loginFormData);

  try {
    const loginResponse = await baseApiCall({
      url: loginEnpoint,
      method: 'POST',
      headers: unValidatedHeader,
      body: JSON.stringify(loginFormData),
    });

    console.log('Login response:', loginResponse);

    if (loginResponse.data && loginResponse.data.accessToken) {
      localStorage.setItem('accessToken', loginResponse.data.accessToken);
      return { success: true };
    } else {
      const errorMessage = loginResponse.errors?.[0]?.message || 'Wrong password';
      return { success: false, message: errorMessage };
    }
  } catch (error) {
    console.error('API call error:', error);
    return { success: false, message: 'An error occurred. Please try again later.' };
  }
}
