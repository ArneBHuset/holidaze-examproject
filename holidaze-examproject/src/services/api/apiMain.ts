import { baseUrl } from './variables/ApiEndpoints.ts';
import ApiParameters from '../interfaces/apiParameters.ts'

async function baseApiCall({ url, method, headers, body }: ApiParameters){
  try {
    const fetchData = {
      method: method,
      headers: headers,
      body: body,
    };
    console.log('fetchdata here', fetchData)
    console.log('This is the url', url)
    const response = await fetch(`${baseUrl}${url}`,fetchData)
    const json = await response.json();
  console.log('response found here', response)
    console.log(json);
  return json;
  }
  catch (error) {
    console.log('API error', error);
  }
}

export default baseApiCall;