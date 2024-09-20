import VenueQueryParams from '../../../interfaces/api/venueQueryParams.ts';

export const venuesEndpoint = ({ id, owner, bookings, search }: VenueQueryParams) => {
  let venueUrl = `/holidaze/venues`;

  const queryParams = new URLSearchParams();

  if (search) {
    venueUrl = `/holidaze/venues/search`;
    queryParams.append('q', search);
  }

  if (id) {
    venueUrl = `/holidaze/venues/${id}`;
  }
  if (owner !== undefined) {
    queryParams.append('_owner', String(owner));
  }

  if (bookings !== undefined) {
    queryParams.append('_bookings', String(bookings));
  }

  const queryString = queryParams.toString();
  return queryString ? `${venueUrl}?${queryString}` : venueUrl;
};
