import { Avatar, Box, Typography, Accordion, AccordionSummary, AccordionDetails, LinearProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { HostDetailsProps } from '../../services/interfaces/api/profileDisplay.ts';
import { Link } from 'react-router-dom';
import theme from '../../styles/mui-styles/MuiThemes.ts';
import EmailIcon from '@mui/icons-material/Email';
import Tooltip from '@mui/material/Tooltip';

/**
 * HostDetails component renders the profile details of a host, including a banner, avatar, name, email, and bio.
 * It includes an accordion to expand and view the profile's detailed information.
 *
 * @param {HostDetailsProps} props - Props object containing the data for the host.
 */
function HostDetails({ data }: HostDetailsProps) {
  if (!data) {
    return <LinearProgress color="secondary"></LinearProgress>;
  }
  const isLinkDisabled = location.pathname === '/user-overview' || location.pathname === '/manage-venue';
  const placeholderBanner = 'https://th.bing.com/th/id/OIP.AqA-8X4rujwaNbV11Yp3jgHaEo?rs=1&pid=ImgDetMain';

  const placeholderAvatar = 'https://th.bing.com/th/id/OIP.6Q7DNPxnE4gnsCMOU_XYXAAAAA?rs=1&pid=ImgDetMain';

  return (
    <>
      <Grid size={12}>
        <img
          src={data?.banner?.url || placeholderBanner}
          alt={data?.banner?.alt || 'Owner banner'}
          aria-label={data?.banner?.alt || 'Owner banner'}
          style={{ width: '100%', borderRadius: '4px', height: '100px', objectFit: 'cover' }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = placeholderBanner;
          }}
        />

        <Box
          display="flex"
          alignItems="center"
          gap={{ xs: 2, sm: 1 }}
          sx={{
            marginTop: '-65px',
            marginLeft: { xs: '1vw', sm: '0.5vw' },
            maxWidth: { xs: '95%', sm: '80%', md: '95%', lg: '95%' },
          }}
        >
          {isLinkDisabled ? (
            <Tooltip title="View profile">
              <Avatar
                src={data?.avatar?.url || placeholderAvatar}
                alt={data?.avatar?.alt || 'Avatar description missing'}
                sx={{
                  width: { xs: '110px', sm: '80px' },
                  height: { xs: '110px', sm: '80px' },
                  border: `1.5px solid ${theme.palette.secondary.main}`,
                }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = placeholderAvatar;
                }}
              />
            </Tooltip>
          ) : (
            <Link to={`/hostpage/${data?.name || ''}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Tooltip title={`View ${data?.name}'s profile`}>
                <Avatar
                  src={data?.avatar?.url || placeholderAvatar}
                  alt={data?.avatar?.alt || 'Avatar description missing'}
                  sx={{
                    width: { xs: '110px', sm: '80px' },
                    height: { xs: '110px', sm: '80px' },
                    border: `1.5px solid ${theme.palette.secondary.main}`,
                  }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = placeholderAvatar;
                  }}
                />
              </Tooltip>
            </Link>
          )}

          <Box paddingTop={'60px'} sx={{ maxWidth: '80%' }}>
            <Typography variant="h4" sx={{ wordWrap: 'break-word', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              <Tooltip title={`View ${data?.name}s profile`}>
                {isLinkDisabled ? (
                  <span>{data?.name || 'Unknown User'}</span>
                ) : (
                  <Link to={`/hostpage/${data?.name || ''}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {data?.name || 'Unknown User'}
                  </Link>
                )}
              </Tooltip>
            </Typography>

            <Accordion sx={{ boxShadow: 'none', border: 'none', maxWidth: '100%' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ padding: 0, '& .MuiAccordionSummary-content': { margin: 0 } }}
              >
                <Typography variant="h6" sx={{ display: 'inline' }}>
                  See profile details
                </Typography>
              </AccordionSummary>

              <AccordionDetails sx={{ padding: 0 }}>
                <Typography
                  variant="body1"
                  display="flex"
                  alignItems="center"
                  gap={0.5}
                  sx={{
                    wordBreak: 'break-word',
                    width: '100%',
                  }}
                >
                  <EmailIcon sx={{ color: theme.palette.primary.light }} />
                  {data?.email || 'No email provided'}
                </Typography>
                <Box
                  marginTop={1}
                  padding={1}
                  sx={{ border: `1.5px solid ${theme.palette.secondary.main}`, borderRadius: '4px' }}
                >
                  <Typography variant="h6" sx={{ borderBottom: '1px solid black', width: '90%' }}>
                    BIO
                  </Typography>
                  <Typography variant="body2">{data?.bio || 'No bio available'}</Typography>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Grid>
    </>
  );
}

export default HostDetails;
