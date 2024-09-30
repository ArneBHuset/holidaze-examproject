import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from 'react/jsx-runtime';
import { Avatar, Box, Typography, Accordion, AccordionSummary, AccordionDetails, LinearProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
function HostDetails({ data }) {
  if (!data) {
    return _jsx(LinearProgress, { color: 'secondary' });
  }
  return _jsx(_Fragment, {
    children: _jsxs(Grid, {
      size: 12,
      children: [
        data?.banner?.url
          ? _jsx('img', {
              src: data.banner.url,
              alt: data.banner.alt || 'Owner banner',
              'aria-label': data.banner.alt || 'Owner banner',
              style: { width: '100%', borderRadius: '4px', height: '100px', objectFit: 'cover' },
            })
          : _jsx('img', {
              src: 'https://th.bing.com/th/id/R.7c679658c9a587ffd6b0e66c9ab0d0fe?rik=mNvwy15NYRD0KA&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f08%2fFree-black-background-wallpaper.jpg&ehk=ILvp4NQzbBLVX8qQSyjksYYm60Ksy%2fllfcW5aOQo3A8%3d&risl=&pid=ImgRaw&r=0',
              alt: 'Default banner',
              style: { width: '100%', borderRadius: '8px', height: '90px', objectFit: 'cover' },
            }),
        _jsxs(Box, {
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 2, sm: 1 },
          sx: {
            marginTop: '-65px',
            marginLeft: { xs: '1vw', sm: '0.5vw' },
            maxWidth: { xs: '95%', sm: '80%', md: '95%', lg: '95%' },
          },
          children: [
            _jsx(Link, {
              to: `/hostpage/${data?.name || ''}`,
              style: { textDecoration: 'none', color: 'inherit' },
              children: _jsx(Tooltip, {
                title: `View ${data?.name}'s profile`,
                children: _jsx(Avatar, {
                  src:
                    data?.avatar?.url || 'https://th.bing.com/th/id/OIP.6Q7DNPxnE4gnsCMOU_XYXAAAAA?rs=1&pid=ImgDetMain',
                  alt: data?.avatar?.alt || 'Avatar description missing',
                  sx: {
                    width: { xs: '110px', sm: '80px' },
                    height: { xs: '110px', sm: '80px' },
                    border: `1.5px solid ${theme.palette.secondary.main}`,
                  },
                }),
              }),
            }),
            _jsxs(Box, {
              paddingTop: '60px',
              sx: { maxWidth: '80%' },
              children: [
                _jsx(Typography, {
                  variant: 'h4',
                  sx: { wordWrap: 'break-word', overflow: 'hidden', textOverflow: 'ellipsis' },
                  children: _jsx(Tooltip, {
                    title: `View ${data?.name}s profile`,
                    children: _jsx(Link, {
                      to: `/hostpage/${data?.name || ''}`,
                      style: { textDecoration: 'none', color: 'inherit' },
                      children: data?.name || 'Unknown User',
                    }),
                  }),
                }),
                _jsxs(Accordion, {
                  sx: { boxShadow: 'none', border: 'none', maxWidth: '100%' },
                  children: [
                    _jsx(AccordionSummary, {
                      expandIcon: _jsx(ExpandMoreIcon, {}),
                      sx: { padding: 0, '& .MuiAccordionSummary-content': { margin: 0 } },
                      children: _jsx(Typography, {
                        variant: 'h6',
                        sx: { display: 'inline' },
                        children: 'See profile details',
                      }),
                    }),
                    _jsxs(AccordionDetails, {
                      sx: { padding: 0 },
                      children: [
                        _jsxs(Typography, {
                          variant: 'body1',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          sx: {
                            wordBreak: 'break-word',
                            width: '100%',
                          },
                          children: [
                            _jsx(EmailIcon, { sx: { color: theme.palette.primary.light } }),
                            data?.email || 'No email provided',
                          ],
                        }),
                        _jsxs(Box, {
                          marginTop: 1,
                          padding: 1,
                          sx: { border: `1.5px solid ${theme.palette.secondary.main}`, borderRadius: '4px' },
                          children: [
                            _jsx(Typography, {
                              variant: 'h6',
                              sx: { borderBottom: '1px solid black', width: '90%' },
                              children: 'BIO',
                            }),
                            _jsx(Typography, { variant: 'body2', children: data?.bio || 'No bio available' }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
export default HostDetails;
