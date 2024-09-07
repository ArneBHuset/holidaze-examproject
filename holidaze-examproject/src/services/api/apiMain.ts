import { baseUrl } from './variables/endpoints/baseUrl.ts';
import ApiParameters from '../interfaces/api/apiParameters.ts';

/**
 * Main API call function, taking 4 parameters to make a specific API call.
 *
 * @param {string} url - The endpoint URL to which the API call is made.
 * @param {string} method - The HTTP method to be used in the API call (e.g., 'GET', 'POST', etc.).
 * @param {Record<string, string>} headers - An object representing the headers to be included in the API call.
 * @param {string} body - An optional stringified body to be sent with the API call (typically used with POST or PUT requests).
 */
async function baseApiCall({ url, method, headers, body }: ApiParameters) {
  try {
    const fetchData = {
      method: method,
      headers: headers,
      body: body,
    };
    const response = await fetch(`${baseUrl}${url}`, fetchData);
    const json = await response.json();
    //console.log('response found here', response);
    //console.log('jsondata found here:', json);
    return json;
  } catch (error) {
    console.log('API error', error);
  }
}

export default baseApiCall;
