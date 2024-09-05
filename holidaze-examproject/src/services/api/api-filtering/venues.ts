import baseApiCall from '../apiMain.ts';
import { useState } from 'react';
import { apiKeyEndpoint } from '../variables/endpoints/authEndpoint.ts';

export async default function venuesApiCall() {
  const [venueData, setVenueData] = useState('');

  setVenueData(await baseApiCall({
    url: apiKeyEndpoint,
    method: 'POST',
    headers: headers,
    body: apiKeyBody,}));
}