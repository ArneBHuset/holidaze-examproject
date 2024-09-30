export interface VenueCreateUpdate {
  name: string;
  location: {
    address: string;
    city: string;
    zip: string;
    country: string;
  };
  description: string;
  price: number;
  maxGuests: number;
  rating?: number | null;
  media?: {
    url: string;
    alt?: string;
  }[];
  meta?: {
    wifi?: boolean;
    parking?: boolean;
    breakfast?: boolean;
    pets?: boolean;
  };
}
