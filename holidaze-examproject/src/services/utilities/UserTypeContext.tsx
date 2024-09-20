import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  isVenueManager: boolean;
  updateVenueManagerStatus: (status: boolean) => void;
}

// Provide default context value to avoid null
const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isVenueManager, setIsVenueManager] = useState(false);

  const updateVenueManagerStatus = (venueManagerStatus: boolean) => {
    setIsVenueManager(venueManagerStatus);
  };

  return <UserContext.Provider value={{ isVenueManager, updateVenueManagerStatus }}>{children}</UserContext.Provider>;
};
