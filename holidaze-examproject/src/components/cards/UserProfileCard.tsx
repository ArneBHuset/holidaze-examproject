// src/components/ProfileDisplay.tsx

import React, { useEffect, useState } from 'react';
import HostDetails from '../profile/ProfileDisplay.tsx';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { HostData } from '../../services/interfaces/api/profileDisplay';
import MainCard from '../../layout/MainCard.tsx';
import { Container } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import DefaultButton from '../../styles/mui-styles/components/defaultBtn.tsx';

const UserProfileCard: React.FC = () => {
  const [profile, setProfile] = useState<HostData | null>(null);

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
            url: parsedProfile.avatar.url,
            alt: parsedProfile.avatar.alt,
          },
          banner: {
            url: parsedProfile.banner.url,
            alt: parsedProfile.banner.alt,
          },
          // `venueManager` and `_count` are optional and can be omitted
        };
        setProfile(hostData);
      } catch (error) {
        console.error('Error parsing profileData from localStorage:', error);
      }
    } else {
      console.warn('No profileData found in localStorage.');
    }
  }, []);

  if (!profile) {
    return (
      <Typography variant="h5" align="center" sx={{ mt: 4 }}>
        No profile found, please log out and in again
      </Typography>
    );
  }

  return (
      <MainCard>
        <CardContent sx={{marginTop:4}}>
      <HostDetails data={profile} />
        </CardContent>
        <CardContent>
          <DefaultButton>
            hellu
          </DefaultButton>
        </CardContent>

    </MainCard>
  );
};

export default UserProfileCard;
