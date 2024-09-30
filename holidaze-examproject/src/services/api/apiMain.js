import { baseUrl } from './variables/endpoints/baseUrl.ts';
import { snackBarError } from '../snackbar/SnackBarError.tsx';
/**
 * Main API call function, taking 4 parameters to make a specific API call.
 *
 * @param {string} url - The endpoint URL to which the API call is made.
 * @param {string} method - The HTTP method to be used in the API call (e.g., 'GET', 'POST', etc.).
 * @param {Record<string, string>} headers - An object representing the headers to be included in the API call.
 * @param {string} body - An optional stringified body to be sent with the API call (typically used with POST or PUT requests).
 */
async function baseApiCall({ url, method, headers, body }) {
    try {
        const fetchData = {
            method: method,
            headers: headers,
            body: body,
        };
        const response = await fetch(`${baseUrl}${url}`, fetchData);
        if (!response.ok) {
            const errorResponse = await response.json();
            const errorMessage = errorResponse.message ||
                (errorResponse.errors ? errorResponse.errors.map((e) => e.message).join(', ') : 'Failed to fetch data');
            snackBarError(errorMessage);
            return undefined;
        }
        if (response.status === 204 || response.headers.get('content-length') === '0') {
            return null;
        }
        return await response.json();
    }
    catch (error) {
        const apiError = error;
        const errorMessage = apiError.message || 'An unknown error occurred';
        console.log('api error from main', apiError);
        snackBarError(errorMessage);
        return undefined;
    }
}
export default baseApiCall;
