import React from 'react';
import { Avatar, Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { HostDetailsProps } from '../../services/interfaces/api/profileDisplay.ts';
import { Link } from 'react-router-dom';
import theme from '../../styles/mui-styles/MuiThemes.ts';
import EmailIcon from '@mui/icons-material/Email';
import Tooltip from '@mui/material/Tooltip';

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
            style={{ width: '100%', borderRadius: '4px', height: '120px', objectFit: 'cover' }}
          />
        ) : (
          <img
            src="https://th.bing.com/th/id/R.7c679658c9a587ffd6b0e66c9ab0d0fe?rik=mNvwy15NYRD0KA&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f08%2fFree-black-background-wallpaper.jpg&ehk=ILvp4NQzbBLVX8qQSyjksYYm60Ksy%2fllfcW5aOQo3A8%3d&risl=&pid=ImgRaw&r=0"
            alt="Default banner"
            style={{ width: '100%', borderRadius: '8px', height: '90px', objectFit: 'cover' }}
          />
        )}

        <Box
          display="flex"
          alignItems="center"
          gap={{ xs: 2, sm: 4 }}
          sx={{ marginTop: '-45px', marginLeft: { xs: '1vw', sm: '2vw' } }}
        >
          <Link to={`/hostpage/${data?.name || ''}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Tooltip title={`View ${data?.name}'s profile`}>
              <Avatar
                src={
                  data?.avatar?.url || 'https://th.bing.com/th/id/OIP.6Q7DNPxnE4gnsCMOU_XYXAAAAA?rs=1&pid=ImgDetMain'
                }
                alt={data?.avatar?.alt || 'Avatar description missing'}
                sx={{
                  width: { xs: '110px', sm: '160px' },
                  height: { xs: '110px', sm: '160px' },
                  border: `2px solid ${theme.palette.primary.light}`,
                }}
              />
            </Tooltip>
          </Link>

          <Box paddingTop={'50px'}>
            <Typography variant="h3">
              <Tooltip title={`View ${data?.name}s profile`}>
                <Link to={`/hostpage/${data?.name || ''}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {data?.name || 'Unknown User'}
                </Link>
              </Tooltip>
            </Typography>
            <Accordion sx={{ boxShadow: 'none', border: 'none', width: '100%' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ padding: 0, '& .MuiAccordionSummary-content': { margin: 0 } }}
              >
                <Typography variant="h5" sx={{ display: 'inline' }}>
                  See profile details
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0 }}>
                <Typography variant="body1" display="flex" alignItems="center" gap={1}>
                  <EmailIcon /> {data?.email || 'No email provided'}
                </Typography>
                <Box
                  marginTop={1}
                  padding={1}
                  sx={{ border: `3px solid ${theme.palette.secondary.main}`, borderRadius: '6px' }}
                >
                  <Typography variant="h5" sx={{ borderBottom: '1px solid black', width: '90%' }}>
                    BIO
                  </Typography>
                  <Typography variant="body1">{data?.bio || 'No bio available'}</Typography>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default HostDetails;
