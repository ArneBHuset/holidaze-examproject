export interface MediaData {
  url?: string;
  alt?: string;
}

export interface MetaData {
  wifi?: boolean;
  parking?: boolean;
  breakfast?: boolean;
  pets?: boolean;
}

export interface LocationData {
  address?: string;
  city?: string;
  zip?: string;
  country?: string;
  continent?: string;
  lat?: number;
  lng?: number;
}

export interface OwnerData {
  name: string;
  email: string;
  bio?: string;
  avatar?: MediaData;
  banner?: MediaData;
}

export interface CustomerData {
  name: string;
  email: string;
  bio?: string;
  avatar?: MediaData;
  banner?: MediaData;
}

export interface BookingData {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  customer?: CustomerData;
  venue?: VenueData;
}

export interface VenueSpecificDetailsProps {
  venue: VenueData;
}

export default interface VenueData {
  id: string;
  name: string;
  description: string;
  media?: MediaData[];
  price: number;
  maxGuests: number;
  rating?: number;
  created: string;
  updated: string;
  meta?: MetaData;
  location?: LocationData;
  owner?: OwnerData;
  bookings?: BookingData[];
}
