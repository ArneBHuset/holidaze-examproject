import baseApiCall from '../apiMain.ts';
import { registerEndpoint } from '../variables/endpoints/authEndpoint.ts';
import { unValidatedHeader } from '../variables/headers.ts';
import RegistrationData from '../../interfaces/registrationForm.ts';

/**
 * Function for user registration
 * @param {object} registrationFormData - Validated data for registering, used in api call body
 */
export async function registrationApiCall(registrationFormData: RegistrationData) {
  try {
    console.log('Making registration call', registerEndpoint, 'POST', unValidatedHeader, registrationFormData);

    const registration = await baseApiCall({
      url: registerEndpoint,
      method: 'POST',
      headers: unValidatedHeader,
      body: JSON.stringify(registrationFormData),
    });

    console.log('Registration response:', registration);
    return registration;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
}
