import baseApiCall from '../apiMain.ts';
import { apiKeyEndpoint } from '../variables/ApiEndpoints.ts';
import { unValidatedHeader } from '../variables/headers.ts';

export async function getApiKey() {
  const apiKeyBody = JSON.stringify({ name: 'Holidaze ApiKey Arne' });

  console.log('used for KEYcall', apiKeyEndpoint, 'POST', unValidatedHeader, apiKeyBody);

  const apiKey = await baseApiCall({
    url: apiKeyEndpoint,
    method: 'POST',
    headers: unValidatedHeader,
    body: apiKeyBody,
  });

  console.log('KEY HAS ARRIVED', apiKey);
}
