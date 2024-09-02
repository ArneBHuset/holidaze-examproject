export interface AvatarData {
  url: string;
  alt?: string;
}

export interface BannerData {
  url: string;
  alt?: string;
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
