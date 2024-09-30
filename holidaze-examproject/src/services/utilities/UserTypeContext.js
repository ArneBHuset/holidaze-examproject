import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from 'react';
const UserContext = createContext(undefined);
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('error');
    }
    return context;
};
export const UserProvider = ({ children }) => {
    const [isVenueManager, setIsVenueManager] = useState(() => {
        const profileData = localStorage.getItem('profileData');
        if (profileData) {
            const parsedProfile = JSON.parse(profileData);
            return parsedProfile.venueManager || false;
        }
        return false;
    });
    const updateVenueManagerStatus = (venueManagerStatus) => {
        setIsVenueManager(venueManagerStatus);
    };
    return _jsx(UserContext.Provider, { value: { isVenueManager, updateVenueManagerStatus }, children: children });
};
