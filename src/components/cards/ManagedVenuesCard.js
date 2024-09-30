import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import DefaultButton from '../../styles/mui-styles/components/defaultBtn.tsx';
import DefaultSubTitle from '../titles/SubTitle.tsx';
import PersonIcon from '@mui/icons-material/Person';
import GradeIcon from '@mui/icons-material/Grade';
import { useNavigate } from 'react-router-dom';
import EuroIcon from '@mui/icons-material/Euro';
import PlaceIcon from '@mui/icons-material/Place';
import theme from '../../styles/mui-styles/MuiThemes.ts';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EditIcon from '@mui/icons-material/Edit';
import MainCard from '../../layout/MainCard.tsx';
import UpdateVenueForm from '../forms/UpdateVenueForm.tsx';
import SecondaryButton from '../../styles/mui-styles/components/SecondaryBtn.tsx';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import baseApiCall from '../../services/api/apiMain.ts';
import { snackBarSuccess } from '../../services/snackbar/SnackBarSuccess.tsx';
import { snackBarError } from '../../services/snackbar/SnackBarError.tsx';
import { venuesEndpoint } from '../../services/api/variables/endpoints/venueEndpoint.ts';
import { getValidatedHeader } from '../../services/api/variables/headers.ts';
import BookingsOnVenueCard from './BookingsOnVenueCard.tsx';
/**
 * MainVenueCard component displays a list of venues and allows editing or deleting them.
 * It also allows navigation to the detailed view of a venue.
 * @param {Object} props - The component props.
 * @param {ManageVenue[]} props.venues - An array of venue objects that contain details of each venue.
 * @param {Function} props.refreshVenues - A function to refresh the list of venues after an update or deletion.
 *
 * @returns {JSX.Element} The JSX element for rendering the list of venues with edit and delete functionality.
 */
export default function MainVenueCard({ venues, refreshVenues }) {
  const [isEditing, setIsEditing] = useState(null);
  const [isViewingGuests, setIsViewingGuests] = useState(null);
  const apiKey = import.meta.env.VITE_NOROFF_API_KEY;
  const navigate = useNavigate();
  const changeVenue = async (venueId, method, data) => {
    console.log(data);
    const headers = getValidatedHeader();
    try {
      const response = await baseApiCall({
        url: venuesEndpoint({ id: venueId }),
        method,
        headers: { ...headers, 'X-Noroff-Api-Key': apiKey },
        body: method === 'PUT' && data ? JSON.stringify(data) : undefined,
      });
      console.log(response);
      if (method === 'PUT' && response?.data) {
        snackBarSuccess('Venue updated successfully!');
        refreshVenues();
        setIsEditing(null);
      } else if (method === 'DELETE') {
        snackBarSuccess('Venue deleted successfully!');
        refreshVenues();
        setIsEditing(null);
      }
    } catch (error) {
      snackBarError(
        method === 'DELETE' ? 'Error deleting venue. Please try again.' : 'Error updating venue. Please try again.',
      );
      console.error(`${method} venue error:`, error);
    }
  };
  const handleNavigateToVenue = (venue) => {
    navigate(`/venue/${venue.id}`, { state: { venue } });
  };
  return _jsx(Grid, {
    container: true,
    spacing: 1,
    children: venues.map((venue) => {
      const isEditingVenue = isEditing === venue.id;
      return _jsxs(
        Grid,
        {
          size: { xs: 12 },
          children: [
            _jsxs(Card, {
              sx: {
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                width: '100%',
                height: 'auto',
                mb: 1,
                borderBottomLeftRadius: { xs: 0, sm: 3 },
                borderBottomRightRadius: { xs: 0, sm: 3 },
                boxShadow: isEditingVenue
                  ? '8px 8px 6px rgba(73, 190, 248, 0.6)'
                  : '3px 3px 10px rgba(73, 190, 248, 0.25)',
              },
              children: [
                _jsx(Box, {
                  padding: { xs: 0.5, sm: 0.5 },
                  paddingRight: { sm: 0 },
                  children: _jsx(CardMedia, {
                    component: 'img',
                    alt: venue.media?.[0]?.alt || 'Venue image',
                    src:
                      venue.media?.[0]?.url ||
                      'https://th.bing.com/th/id/R.957f5c1b65e9ae5f3c068ac1349d0f1f?rik=pzYV5kEHwRtrgg&pid=ImgRaw&r=0',
                    onError: (e) => {
                      e.currentTarget.src =
                        'https://th.bing.com/th/id/R.957f5c1b65e9ae5f3c068ac1349d0f1f?rik=pzYV5kEHwRtrgg&pid=ImgRaw&r=0';
                    },
                    sx: {
                      width: { xs: '100%', sm: 200 },
                      height: { xs: 200, sm: '200px' },
                      maxHeight: { xs: 200, sm: 260 },
                      borderRadius: { xs: '4px', sm: '6px' },
                    },
                  }),
                }),
                _jsx(CardContent, {
                  sx: {
                    display: 'flex',
                    flexDirection: 'column',
                    padding: { xs: 1 },
                  },
                  style: { padding: 0 },
                  children: _jsxs(Grid, {
                    container: true,
                    padding: 0.5,
                    spacing: 1,
                    sx: { height: '100%' },
                    mb: { xs: 2, sm: 0 },
                    display: 'flex',
                    mx: 'auto',
                    justifyContent: 'center',
                    children: [
                      _jsx(Grid, {
                        size: { xs: 12 },
                        textAlign: { xs: 'center', sm: 'left' },
                        maxHeight: '40px',
                        overflow: 'hidden',
                        children: _jsx(DefaultSubTitle, { children: venue.name }),
                      }),
                      _jsx(Grid, {
                        size: { xs: 6, sm: 12 },
                        children: _jsxs(Typography, {
                          variant: 'h6',
                          sx: {
                            pl: { xs: 6, sm: 0 },
                            textAlign: { xs: 'center', sm: 'left' },
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                          },
                          children: [
                            _jsx(EuroIcon, { sx: { fontFamily: theme.typography.h6, mb: 0.2 } }),
                            venue.price,
                            ' / DAY',
                          ],
                        }),
                      }),
                      _jsx(Grid, {
                        size: { xs: 6, sm: 12 },
                        children: _jsx(Typography, {
                          variant: 'h6',
                          sx: { display: 'flex', alignItems: 'center', gap: 1 },
                          children:
                            venue.location?.city && venue.location?.country
                              ? _jsxs('a', {
                                  href:
                                    venue.location.lat && venue.location.lng
                                      ? `https://www.google.com/maps?q=${venue.location.lat},${venue.location.lng}`
                                      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${venue.location.city}, ${venue.location.country}`)}`,
                                  target: '_blank',
                                  rel: 'noopener noreferrer',
                                  style: {
                                    textDecoration: 'none',
                                    color: theme.palette.text.primary,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                  },
                                  children: [
                                    _jsx(PlaceIcon, {
                                      sx: {
                                        color: theme.palette.primary.light,
                                        fontFamily: theme.typography.h6,
                                        transition: 'transform 0.2s ease-in-out',
                                        '&:hover': { transform: 'scale(1.2)' },
                                      },
                                    }),
                                    `${venue.location.city}, ${venue.location.country}`,
                                  ],
                                })
                              : venue.location?.city || venue.location?.country || 'N/A',
                        }),
                      }),
                      _jsx(Grid, {
                        size: { xs: 6, sm: 3 },
                        display: 'flex',
                        alignItems: 'center',
                        children: _jsxs(Typography, {
                          variant: 'h6',
                          sx: {
                            pl: { xs: 6, sm: 0 },
                            textAlign: 'left',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                          },
                          children: [
                            _jsx(PersonIcon, { sx: { fontFamily: theme.typography.h5, mb: 0.2 } }),
                            venue.maxGuests,
                          ],
                        }),
                      }),
                      _jsx(Grid, {
                        size: { xs: 6, sm: 9 },
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        children: _jsxs(Typography, {
                          variant: 'h6',
                          sx: { display: 'flex', alignItems: 'center gap', gap: 0.5 },
                          children: [
                            _jsx(GradeIcon, { sx: { fontFamily: theme.typography.h5, mb: 0.2 } }),
                            venue.rating || 0,
                          ],
                        }),
                      }),
                      _jsx(Grid, {
                        size: 12,
                        sx: {
                          display: { xs: 'none', sm: 'flex' },
                          flexDirection: 'column',
                          justifyContent: 'flex-end',
                          alignItems: 'stretch',
                          width: '100%',
                          padding: 0,
                        },
                        children: _jsx(DefaultButton, {
                          children: _jsxs(Button, {
                            onClick: () => handleNavigateToVenue(venue),
                            sx: {
                              width: '100%',
                              borderBottomLeftRadius: { xs: 0, sm: 4 },
                              borderBottomRightRadius: { xs: 0, sm: 4 },
                              padding: { xs: 1, sm: 1.5 },
                              gap: 4,
                            },
                            children: [
                              'See details',
                              _jsx(ArrowForwardIosIcon, { sx: { fontFamily: theme.typography.h5 } }),
                            ],
                          }),
                        }),
                      }),
                    ],
                  }),
                }),
              ],
            }),
            _jsxs(Card, {
              sx: {
                display: 'flex',
                justifyContent: 'right',
                gap: 2,
                width: '100%',
                height: 'auto',
                my: 0.5,
                p: 1,
                boxShadow: '3px 3px 10px rgba(73, 190, 248, 0.25)',
                borderBottomLeftRadius: { xs: 0, sm: 3 },
                borderBottomRightRadius: { xs: 0, sm: 3 },
              },
              children: [
                _jsx(SecondaryButton, {
                  children: _jsxs(Button, {
                    onClick: () => setIsEditing(venue.id),
                    sx: { width: '50%' },
                    children: [_jsx(EditIcon, {}), 'Edit'],
                  }),
                }),
                _jsx(SecondaryButton, {
                  children: _jsxs(Button, {
                    onClick: () => setIsViewingGuests(venue.id),
                    sx: { width: '50%' },
                    children: ['See guests', _jsx(PersonIcon, {})],
                  }),
                }),
              ],
            }),
            isEditingVenue &&
              _jsx(MainCard, {
                children: _jsxs(Grid, {
                  container: true,
                  spacing: 1,
                  children: [
                    _jsx(Grid, {
                      size: 12,
                      p: 1,
                      textAlign: 'center',
                      children: _jsx(DefaultSubTitle, { children: 'EDIT VENUE' }),
                    }),
                    _jsx(Grid, {
                      size: 12,
                      children: _jsx(UpdateVenueForm, {
                        initialValues: {
                          ...venue,
                          location: {
                            address: venue.location?.address || '',
                            city: venue.location?.city || '',
                            zip: venue.location?.zip || '',
                            country: venue.location?.country || '',
                          },
                          media: venue.media?.map((item) => ({ url: item.url, alt: item.alt || '' })) || [],
                        },
                        onDelete: () => changeVenue(venue.id, 'DELETE'),
                        onSubmit: (data) => changeVenue(venue.id, 'PUT', data),
                      }),
                    }),
                    _jsx(Grid, {
                      size: 12,
                      children: _jsx(DefaultButton, {
                        children: _jsxs(Button, {
                          fullWidth: true,
                          onClick: () => setIsEditing(null),
                          children: ['Cancel', _jsx(KeyboardArrowUpIcon, {})],
                        }),
                      }),
                    }),
                  ],
                }),
              }),
            isViewingGuests === venue.id &&
              _jsx(MainCard, {
                children: _jsxs(Grid, {
                  container: true,
                  spacing: 1,
                  children: [
                    _jsx(Grid, {
                      size: 12,
                      p: 1,
                      textAlign: 'center',
                      children: _jsxs(DefaultSubTitle, { children: ['Bookings for ', venue.name] }),
                    }),
                    _jsx(Grid, { size: 12, children: _jsx(BookingsOnVenueCard, { venue: venue }) }),
                    _jsx(Grid, {
                      size: 12,
                      children: _jsx(DefaultButton, {
                        children: _jsxs(Button, {
                          fullWidth: true,
                          onClick: () => setIsViewingGuests(null),
                          children: ['Cancel', _jsx(KeyboardArrowUpIcon, {})],
                        }),
                      }),
                    }),
                  ],
                }),
              }),
          ],
        },
        venue.id,
      );
    }),
  });
}
