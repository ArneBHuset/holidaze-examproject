import VenueQueryParams from '../../../interfaces/api/venueQueryParams.ts';

export const venuesEndpoint = (params?: VenueQueryParams) => {
  let venueUrl = `/holidaze/venues`;

  if (!params) {
    return venueUrl;
  }

  const { id, owner, bookings, search, dateFrom, dateTo, price, country } = params;
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

  // Add new query parameters
  if (dateFrom) {
    queryParams.append('dateFrom', dateFrom);
  }

  if (dateTo) {
    queryParams.append('dateTo', dateTo);
  }

  if (price !== undefined) {
    queryParams.append('price', String(price));
  }

  if (country) {
    queryParams.append('country', country);
  }

  const queryString = queryParams.toString();
  return queryString ? `${venueUrl}?${queryString}` : venueUrl;
};
