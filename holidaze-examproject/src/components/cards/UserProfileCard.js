import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import HostDetails from '../profile/ProfileDisplay.tsx';
import Typography from '@mui/material/Typography';
import MainCard from '../../layout/MainCard.tsx';
import { Box } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import EditProfile from '../forms/UpdateProfile.tsx';
import SecondaryButton from '../../styles/mui-styles/components/SecondaryBtn.tsx';
/**
 * UserProfileCard component displays the user's profile details and allows them to edit their profile.
 * It fetches the user's profile from localStorage, listens for profile updates, and handles editing.
 */
function UserProfileCard() {
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    useEffect(() => {
        const storedProfile = localStorage.getItem('profileData');
        if (storedProfile) {
            try {
                const parsedProfile = JSON.parse(storedProfile);
                const hostData = {
                    name: parsedProfile.name,
                    email: parsedProfile.email,
                    bio: parsedProfile.bio,
                    avatar: {
                        url: parsedProfile.avatar?.url || '',
                        alt: parsedProfile.avatar?.alt || '',
                    },
                    banner: {
                        url: parsedProfile.banner?.url || '',
                        alt: parsedProfile.banner?.alt || '',
                    },
                };
                setProfile(hostData);
            }
            catch (error) {
                console.error('Error parsing profileData from localStorage:', error);
            }
        }
        else {
            console.warn('No profileData found in localStorage.');
        }
    }, []);
    useEffect(() => {
        const handleStorageChange = () => {
            const updatedProfile = localStorage.getItem('profileData');
            if (updatedProfile) {
                setProfile(JSON.parse(updatedProfile));
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);
    const handleEditClick = () => {
        setIsEditing(true);
    };
    const handleFormClose = () => {
        setIsEditing(false);
    };
    const handleProfileUpdate = (updatedProfile) => {
        setProfile((prevProfile) => (prevProfile ? { ...prevProfile, ...updatedProfile } : null));
    };
    if (!profile) {
        return (_jsx(Typography, { variant: "h5", align: "center", sx: { mt: 4 }, children: "No profile found, please log out and log in again." }));
    }
    return (_jsxs(MainCard, { children: [_jsx(CardContent, { sx: { margin: 0, padding: 0 }, children: _jsx(HostDetails, { data: profile }) }), _jsx(CardContent, { sx: { display: 'flex', justifyContent: 'end', my: 2, paddingBottom: 0 }, children: _jsx(SecondaryButton, { children: _jsx(Button, { onClick: handleEditClick, "aria-label": "Edit profile", children: "EDIT PROFILE" }) }) }), isEditing && (_jsx(Box, { sx: { padding: 1, borderTop: '1px solid #e0e0e0' }, children: _jsx(EditProfile, { onClose: handleFormClose, currentProfile: profile, onProfileUpdate: handleProfileUpdate }) }))] }));
}
export default UserProfileCard;
