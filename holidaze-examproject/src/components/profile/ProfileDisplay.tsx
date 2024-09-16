// src/components/HostDetails.tsx

import React from 'react';
import { Avatar, Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import  Grid  from '@mui/material/Grid2';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { HostDetailsProps } from '../../services/interfaces/api/profileDisplay.ts';

const HostDetails: React.FC<HostDetailsProps> = ({ data }) => {
  return (
    <>
      {data.banner.url && (
        <Grid size={12}>
          <img
            src={data.banner.url || 'https://th.bing.com/th/id/R.1ca9e48aad02c7d87505c37a1d8775ec?rik=83c%2f9USow5x8lA&pid=ImgRaw&r=0'}
            alt={data.banner.alt || 'Owner banner'}
            aria-label={data.banner.alt || 'Owner banner'}
            style={{ width: '100%', borderRadius: '8px', height: '90px', objectFit: 'cover' }}
          />
          <Box
            display="flex"
            alignItems="center"
            gap={{ xs: 2, sm: 4 }}
            sx={{ marginTop: '-45px', marginLeft: '1vw' }}
          >
            {data.avatar.url && (
              <Avatar
                src={data.avatar.url}
                alt={data.avatar.alt || 'Owners avatar'}
                sx={{ width: { xs: '100px' }, height: { xs: '100px' }, border: '3px solid white' }}
              />
            )}
            <Box paddingTop={6}>
              <Typography variant="h4">{data.name}</Typography>
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
                  <Typography variant="body2">Email: {data.email}</Typography>
                  <Typography variant="body2">
                     {data.bio || null}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Box>
        </Grid>
      )}
    </>
  );
};

export default HostDetails;
