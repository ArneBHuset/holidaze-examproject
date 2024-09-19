// src/components/HostDetails.tsx

import React from 'react';
import { Avatar, Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { HostDetailsProps } from '../../services/interfaces/api/profileDisplay.ts';
import { Link } from 'react-router-dom';

const HostDetails: React.FC<HostDetailsProps> = ({ data }) => {
  if (!data) {
    return <Typography variant="body1">Profile data is loading...</Typography>;
  }

  return (
    <>
      <Grid size={12}>
        {data?.banner?.url ? (
          <img
            src={data.banner.url}
            alt={data.banner.alt || 'Owner banner'}
            aria-label={data.banner.alt || 'Owner banner'}
            style={{ width: '100%', borderRadius: '8px', height: '90px', objectFit: 'cover' }}
          />
        ) : (
          <img
            src="https://th.bing.com/th/id/R.7c679658c9a587ffd6b0e66c9ab0d0fe?rik=mNvwy15NYRD0KA&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f08%2fFree-black-background-wallpaper.jpg&ehk=ILvp4NQzbBLVX8qQSyjksYYm60Ksy%2fllfcW5aOQo3A8%3d&risl=&pid=ImgRaw&r=0"
            alt="Default banner"
            style={{ width: '100%', borderRadius: '8px', height: '90px', objectFit: 'cover' }}
          />
        )}

        <Box display="flex" alignItems="center" gap={{ xs: 2, sm: 4 }} sx={{ marginTop: '-45px', marginLeft: '1vw' }}>
          <Link to={`/hostpage/${data?.name || ''}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            {data?.avatar?.url ? (
              <Avatar
                src={data.avatar.url}
                alt={data.avatar.alt || 'Owner avatar'}
                sx={{ width: { xs: '100px' }, height: { xs: '100px' }, border: '3px solid white' }}
              />
            ) : (
              <Avatar
                alt="Default avatar"
                sx={{ width: { xs: '100px' }, height: { xs: '100px' }, border: '3px solid white' }}
              />
            )}
          </Link>
          <Box paddingTop={6}>
            <Typography variant="h4">
              <Link to={`/hostpage/${data?.name || ''}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {data?.name || 'Unknown User'}
              </Link>
            </Typography>
            <Accordion sx={{ boxShadow: 'none', border: 'none' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ padding: 0, '& .MuiAccordionSummary-content': { margin: 0 } }}
              >
                <Typography variant="h6" sx={{ display: 'inline' }}>
                  See profile details
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0 }}>
                <Typography variant="body2">Email: {data?.email || 'No email provided'}</Typography>
                <Typography variant="body2">{data?.bio || 'No bio available'}</Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default HostDetails;
