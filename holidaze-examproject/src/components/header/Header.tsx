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
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const theme = useTheme();
  const navigate = useNavigate();
  const { isVenueManager } = useUser();
  console.log('current user type', isVenueManager);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
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

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.primary.light,
        borderBottom: `2px solid ${theme.palette.secondary.main}`,
        boxShadow: `0 2px 2px rgba(0, 0, 0, 0.2)`,
      }}
    >
      <Container maxWidth="md">
        <Toolbar disableGutters sx={{ mx: 1 }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography
              variant="h2"
              color={theme.palette.secondary.main}
              noWrap
              sx={{
                mr: 0,
                display: { xs: 'none', md: 'flex' },
              }}
            >
              {isVenueManager ? 'HOLIDAZE m' : 'HOLIDAZE'}
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton aria-label="menu" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu}>
              <MenuIcon sx={{ fontSize: 40, color: theme.palette.background.default }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {menuItems.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="left">
                    <Link to={page.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {page.name}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Link to="/" style={{ textDecoration: 'none', flexGrow: 1 }}>
            <Typography
              variant="h3"
              noWrap
              sx={{ mr: 2, display: { xs: 'flex', md: 'none' }, flexGrow: 1, color: theme.palette.secondary.main }}
            >
              {isVenueManager ? 'HOLIDAZEmanage' : 'HOLIDAZE'}
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 6, gap: 2 }}>
            {menuItems.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: theme.palette.primary.main, display: 'block' }}
              >
                <Link to={page.path} style={{ textDecoration: 'none', color: theme.palette.background.default }}>
                  {page.name}
                </Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  sx={{ width: '50px', height: '50px' }}
                  alt={JSON.parse(localStorage.getItem('profileData')).avatar.alt}
                  src={JSON.parse(localStorage.getItem('profileData')).avatar.url}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '50px', padding: 4 }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                sx={{
                  borderBottom: 0.5,
                  borderColor: theme.palette.secondary.main,
                  pointerEvents: 'none',
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <Typography variant="h4" textAlign="center">
                  {JSON.parse(localStorage.getItem('profileData')).name}
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography width="100%" display="flex" alignItems="center" justifyContent="space-between">
                  Logout
                  <ExitToAppIcon />
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
