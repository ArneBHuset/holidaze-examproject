import React, { useEffect, useState } from 'react';
import HostDetails from '../profile/ProfileDisplay.tsx';
import Typography from '@mui/material/Typography';
import { HostData } from '../../services/interfaces/api/profileDisplay';
import MainCard from '../../layout/MainCard.tsx';
import { Box } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import DefaultButton from '../../styles/mui-styles/components/defaultBtn';
import Button from '@mui/material/Button';
import EditProfile from '../forms/UpdateProfile.tsx';

const UserProfileCard: React.FC = () => {
  const [profile, setProfile] = useState<HostData | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const storedProfile = localStorage.getItem('profileData');
    if (storedProfile) {
      try {
        const parsedProfile = JSON.parse(storedProfile);
        const hostData: HostData = {
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
      } catch (error) {
        console.error('Error parsing profileData from localStorage:', error);
      }
    } else {
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

  const handleProfileUpdate = (updatedProfile: HostData) => {
    setProfile(updatedProfile);
  };

  if (!profile) {
    return (
      <Typography variant="h5" align="center" sx={{ mt: 4 }}>
        No profile found, please log out and log in again.
      </Typography>
    );
  }

  return (
    <MainCard>
      <CardContent sx={{ marginTop: 4 }}>
        <HostDetails data={profile} />
      </CardContent>
      <CardContent sx={{ display: 'flex', justifyContent: 'end', marginTop: 4 }}>
        <DefaultButton>
          <Button variant="contained" onClick={handleEditClick}>
            EDIT PROFILE
          </Button>
        </DefaultButton>
      </CardContent>

      {isEditing && (
        <Box sx={{ padding: 4, borderTop: '1px solid #e0e0e0' }}>
          <EditProfile onClose={handleFormClose} currentProfile={profile} onProfileUpdate={handleProfileUpdate} />
        </Box>
      )}
    </MainCard>
  );
};

export default UserProfileCard;
