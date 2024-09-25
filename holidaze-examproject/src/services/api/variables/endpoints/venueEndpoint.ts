import VenueQueryParams from '../../../interfaces/api/venueQueryParams.ts';

export const venuesEndpoint = (params?: VenueQueryParams) => {
  let venueUrl = `/holidaze/venues`;

  if (!params) {
    return venueUrl;
  }

  const { id, owner, bookings, search, dateFrom, dateTo, country, sort, sortOrder } = params;
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
  return queryString ? `${venueUrl}?${queryString}` : venueUrl;
};
