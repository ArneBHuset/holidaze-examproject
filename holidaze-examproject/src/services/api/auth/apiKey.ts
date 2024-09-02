import baseApiCall from '../apiMain.ts';
import { apiKeyEndpoint } from '../variables/ApiEndpoints.ts';
import { getValidatedHeader } from '../variables/headers.ts';

/**
 * Function only to be used when new API key is needed
 */
export async function getApiKey() {
  const apiKeyBody = JSON.stringify({ name: 'Holidaze ApiKey Arne' });
  const headers = getValidatedHeader()

  const apiKey = await baseApiCall({
    url: apiKeyEndpoint,
    method: 'POST',
    headers: headers,
    body: apiKeyBody,
  });

  console.log('Apikey response', apiKey);
}
