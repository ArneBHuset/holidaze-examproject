export default interface VenueQueryParams {
  id?: string;
  owner?: boolean;
  bookings?: boolean;
  search?: string;
  price?: number;
  sort?: string;
  sortOrder?: string;
}
