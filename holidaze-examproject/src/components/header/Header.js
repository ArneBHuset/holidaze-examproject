import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material';
import { useUser } from '../../services/utilities/UserTypeContext.tsx';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const theme = useTheme();
  const navigate = useNavigate();
  const { isVenueManager } = useUser();
  const profileData = localStorage.getItem('profileData') ? JSON.parse(localStorage.getItem('profileData')) : null;
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('profileData');
    navigate('/auth');
    window.location.reload();
  };
  const menuItems = isVenueManager
    ? [
        { name: 'Manage Venues', path: '/manage-venue' },
        { name: 'Add Venue', path: '/newvenue' },
        { name: 'About', path: '/about' },
      ]
    : [
        { name: 'My Bookings', path: '/user-overview' },
        { name: 'About', path: '/about' },
      ];
  return _jsx(AppBar, {
    position: 'static',
    sx: {
      backgroundColor: theme.palette.primary.light,
      borderBottom: `2px solid ${theme.palette.secondary.main}`,
      boxShadow: `0 2px 2px rgba(0, 0, 0, 0.2)`,
    },
    children: _jsx(Container, {
      maxWidth: 'md',
      children: _jsxs(Toolbar, {
        disableGutters: true,
        sx: { mx: 1 },
        children: [
          _jsx(Link, {
            to: '/',
            style: { textDecoration: 'none' },
            children: _jsxs(Box, {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              children: [
                _jsx(Typography, {
                  variant: isVenueManager ? 'h3' : 'h2',
                  color: theme.palette.secondary.main,
                  noWrap: true,
                  sx: {
                    mr: 0,
                    display: { xs: 'none', md: 'flex' },
                  },
                  children: 'HOLIDAZE',
                }),
                isVenueManager &&
                  _jsx(Typography, {
                    variant: 'h5',
                    color: theme.palette.secondary.main,
                    sx: { display: { xs: 'none', md: 'flex' } },
                    children: 'Manage',
                  }),
              ],
            }),
          }),
          _jsxs(Box, {
            sx: { flexGrow: 1, display: { xs: 'flex', md: 'none' } },
            children: [
              _jsx(IconButton, {
                'aria-label': 'menu',
                'aria-controls': 'menu-appbar',
                'aria-haspopup': 'true',
                onClick: handleOpenNavMenu,
                children: _jsx(MenuIcon, { sx: { fontSize: 40, color: theme.palette.background.default } }),
              }),
              _jsx(Menu, {
                id: 'menu-appbar',
                anchorEl: anchorElNav,
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left',
                },
                keepMounted: true,
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'left',
                },
                open: Boolean(anchorElNav),
                onClose: handleCloseNavMenu,
                sx: {
                  display: { xs: 'block', md: 'none' },
                },
                children: menuItems.map((page) =>
                  _jsx(
                    MenuItem,
                    {
                      onClick: handleCloseNavMenu,
                      children: _jsx(Typography, {
                        textAlign: 'left',
                        children: _jsx(Link, {
                          to: page.path,
                          style: { textDecoration: 'none', color: 'inherit' },
                          children: page.name,
                        }),
                      }),
                    },
                    page.name,
                  ),
                ),
              }),
            ],
          }),
          _jsx(Link, {
            to: '/',
            style: { textDecoration: 'none', flexGrow: 1 },
            children: _jsxs(Box, {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              children: [
                _jsx(Typography, {
                  variant: isVenueManager ? 'h3' : 'h3',
                  noWrap: true,
                  sx: { mr: 2, display: { xs: 'flex', md: 'none' }, flexGrow: 1, color: theme.palette.secondary.main },
                  children: 'HOLIDAZE',
                }),
                isVenueManager &&
                  _jsx(Typography, {
                    variant: 'h6',
                    color: theme.palette.secondary.main,
                    sx: { display: { xs: 'flex', md: 'none' } },
                    children: 'Manage',
                  }),
              ],
            }),
          }),
          _jsx(Box, {
            sx: { flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 6, gap: 2 },
            children: menuItems.map((page) =>
              _jsx(
                Button,
                {
                  onClick: handleCloseNavMenu,
                  sx: { my: 2, color: theme.palette.primary.main, display: 'block' },
                  children: _jsx(Link, {
                    to: page.path,
                    style: { textDecoration: 'none', color: theme.palette.background.default },
                    children: page.name,
                  }),
                },
                page.name,
              ),
            ),
          }),
          _jsxs(Box, {
            sx: { flexGrow: 0 },
            children: [
              _jsx(Tooltip, {
                title: 'Open settings',
                children: _jsx(IconButton, {
                  onClick: handleOpenUserMenu,
                  sx: { p: 0 },
                  children: _jsx(Avatar, {
                    sx: { width: '50px', height: '50px' },
                    alt: profileData?.avatar?.alt || 'User avatar',
                    src: profileData?.avatar?.url || '',
                  }),
                }),
              }),
              _jsxs(Menu, {
                sx: { mt: '50px', padding: 4 },
                id: 'menu-appbar',
                anchorEl: anchorElUser,
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right',
                },
                keepMounted: true,
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'right',
                },
                open: Boolean(anchorElUser),
                onClose: handleCloseUserMenu,
                children: [
                  _jsx(MenuItem, {
                    sx: {
                      borderBottom: 0.5,
                      borderColor: theme.palette.secondary.main,
                      pointerEvents: 'none',
                      backgroundColor: theme.palette.background.paper,
                    },
                    children: _jsx(Typography, {
                      variant: 'h4',
                      textAlign: 'center',
                      children: profileData?.name || 'Guest',
                    }),
                  }),
                  _jsx(MenuItem, {
                    onClick: handleLogout,
                    children: _jsxs(Typography, {
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      children: ['Logout', _jsx(ExitToAppIcon, {})],
                    }),
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    }),
  });
}
export default Header;
