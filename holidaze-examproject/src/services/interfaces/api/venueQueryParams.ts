export default interface VenueQueryParams {
  id: string;
  owner?: boolean;
  bookings?: boolean;
  search?: string;
  dateFrom?: string;  // ISO string for dateFrom filter
  dateTo?: string;    // ISO string for dateTo filter
  price?: number;     // Number for price filter
  country?: string;   // Country name as string for country filter
}
