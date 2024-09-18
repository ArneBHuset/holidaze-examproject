import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [isVenueManager, setIsVenueManager] = useState(false);

  useEffect(() => {
    const profile = localStorage.getItem('profileData');
    if (profile) {
      const parsedProfile = JSON.parse(profile);
      setIsVenueManager(parsedProfile.venueManager);
    }
  }, []);

  return <UserContext.Provider value={isVenueManager}>{children}</UserContext.Provider>;
};
