export interface AvatarData {
  url?: string |  null;
  alt?: string | null;
}

export interface BannerData {
  url?: string |  null;
  alt?: string | null;
}

export default interface RegistrationData {
  venueManager: boolean;
  name: string;
  email: string;
  password: string;
  bio?: string;
  avatar?: AvatarData;
  banner?: BannerData;
}
