import { HostData } from './profileDisplay.ts';

export interface EditProfileFormData {
  bio?: string;
  avatar?: {
    url?: string;
    alt?: string;
  };
  banner?: {
    url?: string;
    alt?: string;
  };
  formError?: string;
}

export interface EditProfileProps {
  onClose: () => void;
  currentProfile: HostData;
  onProfileUpdate: (updatedProfile: Partial<HostData>) => void;
}