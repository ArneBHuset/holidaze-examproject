export const venuesEndpoint = ({ id, owner, bookings, search }: VenueQueryParams) => {
  let venueUrl = `/holidaze/venues`; // Default endpoint for venues

  const queryParams = new URLSearchParams();

  if (id) {
    return `${venueUrl}/${id}`; // Fetching a single venue by ID
  }

  if (owner !== undefined) {
    queryParams.append('_owner', String(owner));
  }

  if (bookings !== undefined) {
    queryParams.append('_bookings', String(bookings));
  }

  if (search) {
    // Use the /search endpoint when a search term is provided
    venueUrl = `/holidaze/venues/search`;
    queryParams.append('q', search);
  }

  const queryString = queryParams.toString();
  return queryString ? `${venueUrl}?${queryString}` : venueUrl;
};
