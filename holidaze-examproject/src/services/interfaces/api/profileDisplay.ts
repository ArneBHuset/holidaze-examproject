export interface AvatarData {
  url: string;
  alt: string;
}

export interface CountData {
  venues: number;
  bookings: number;
}

export interface HostData {
  name: string;
  email: string;
  bio: string;
  avatar: AvatarData;
  banner: AvatarData;
  venueManager?: boolean;
  _count?: CountData;
}

export interface HostDetailsProps {
  data: HostData;
}
