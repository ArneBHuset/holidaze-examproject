/**
 * Constructs the URL endpoint for venue queries based on given parameters.
 * @param params - The query parameters for venue data.
 * @returns The URL endpoint for venue data.
 */
export const venuesEndpoint = (params) => {
    let venueUrl = `/holidaze/venues`;
    if (!params) {
        return venueUrl;
    }
    const { id, owner, bookings, search, sort, sortOrder } = params;
    const queryParams = new URLSearchParams();
    if (id) {
        return `/holidaze/venues/${id}`;
    }
    if (search) {
        queryParams.append('q', search);
        venueUrl = `/holidaze/venues/search`;
    }
    if (owner !== undefined) {
        queryParams.append('_owner', String(owner));
    }
    if (bookings !== undefined) {
        queryParams.append('_bookings', String(bookings));
    }
    if (sort) {
        queryParams.append('sort', sort);
    }
    if (sortOrder) {
        queryParams.append('sortOrder', sortOrder);
    }
    return queryParams.toString() ? `${venueUrl}?${queryParams.toString()}` : venueUrl;
};
