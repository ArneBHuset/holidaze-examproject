import VenueQueryParams from '../../../interfaces/api/venueQueryParams.ts';

export const venuesEndpoint = (params?: VenueQueryParams) => {
  let venueUrl = `/holidaze/venues`;

  if (!params) {
    return venueUrl;
  }

  const { id, owner, bookings, search, dateFrom, dateTo, country, sort, sortOrder } = params;
  const queryParams = new URLSearchParams();

  if (id) {
    return `/holidaze/venues/${id}`; // Direct venue URL if an ID is provided
  }

  if (search) {
    queryParams.append('q', search); // Search URL is used when a search term is present
    venueUrl = `/holidaze/venues/search`;
  }

  if (owner !== undefined) {
    queryParams.append('_owner', String(owner));
  }

  if (bookings !== undefined) {
    queryParams.append('_bookings', String(bookings));
  }

  if (dateFrom) {
    queryParams.append('dateFrom', dateFrom);
  }

  if (dateTo) {
    queryParams.append('dateTo', dateTo);
  }

  if (country) {
    queryParams.append('country', country);
  }

  if (sort) {
    queryParams.append('sort', sort);
  }

  if (sortOrder) {
    queryParams.append('sortOrder', sortOrder);
  }

  const queryString = queryParams.toString();

  const finalUrl = queryString ? `${venueUrl}?${queryString}` : venueUrl;

  console.log('Constructed URL:', finalUrl); // Log the URL for debugging

  return finalUrl;
};
