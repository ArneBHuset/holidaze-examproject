import { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  isVenueManager: boolean;
  updateVenueManagerStatus: (status: boolean) => void;
}
const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('error');
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isVenueManager, setIsVenueManager] = useState<boolean>(() => {
    const profileData = localStorage.getItem('profileData');
    if (profileData) {
      const parsedProfile = JSON.parse(profileData);
      return parsedProfile.venueManager || false;
    }
    return false;
  });
  const updateVenueManagerStatus = (venueManagerStatus: boolean) => {
    setIsVenueManager(venueManagerStatus);
  };

  return <UserContext.Provider value={{ isVenueManager, updateVenueManagerStatus }}>{children}</UserContext.Provider>;
};
