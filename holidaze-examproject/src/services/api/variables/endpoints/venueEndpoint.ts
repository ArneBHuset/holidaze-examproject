import VenueQueryParams from '../../../interfaces/api/venueQueryParams.ts';

export const venuesEndpoint = ({ id, owner, bookings, search }: VenueQueryParams) => {
  const baseUrl = `/auth/venues/${id}`;

  const queryParams = new URLSearchParams();

  if (owner !== undefined) {
    queryParams.append('_owner', String(owner));
  }

  if (bookings !== undefined) {
    queryParams.append('_bookings', String(bookings));
  }

  if (search) {
    queryParams.append('q', search);
  }

  const queryString = queryParams.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};
