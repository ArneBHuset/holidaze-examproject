import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import RegisterLoginPage from './pages/RegisterLoginPage.tsx';
import MainLayout from './layout/MainLayout.tsx';
import AuthLayout from './layout/AuthLayout.tsx';
import LandingPage from './pages/LandingPage.tsx';
import ManageVenuePage from './pages/ManageVenuePage.tsx';
import UserOverviewPage from './pages/UserOverviewPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';
import VenueDetailsPage from './pages/VenueDetailsPage.tsx';
import './index.scss';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SnackBarError from './services/snackbar/SnackBarError.tsx';
import SnackBarSuccess from './services/snackbar/SnackBarSuccess';
import { UserProvider } from './services/utilities/UserTypeContext.tsx';
import AllHostsPage from './pages/AllHostsPage.tsx';
import AboutPage from './pages/About.tsx';
import NewVenuePage from './pages/NewVenuePage.tsx';
import { LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';

/**
 * App component manages routing and authentication, and is the child of main.tsx, the main application entry point.
 * It uses React Router for navigation and conditionally renders pages based on the user's authentication status.
 *
 * Key Functions:
 * - `checkAuthStatus`: This function checks if the user is authenticated by verifying if there is an `accessToken` and valid `profileData` (name, email) in localStorage.
 * - `useEffect`: Runs on initial component mount to check authentication status and sets loading state.

 * Conditional Logic:
 * - Routes:
 *   - `/auth`: If the user is not authenticated, it renders the login/register page. If authenticated, it redirects the user to the landing page.
 *   - `/`: The landing page, always accessible, even for unauthenticated users.
 *   - `/about`: The About page, always accessible.
 *   - `/venue/:id`: Displays the details of a specific venue, accessible to all users.
 *
 * - Authenticated Routes:
 *   - `/manage-venue`: Displays the venue management page, accessible only to authenticated users.
 *   - `/newvenue`: Displays the form for creating a new venue, accessible only to authenticated users.
 *   - `/hostpage/:name`: Displays a page with all venues managed by a specific host, accessible only to authenticated users.
 *   - `/user-overview`: Displays the user's bookings and profile, accessible only to authenticated users.
 *
 * - Fallback for Unauthenticated Users:
 *   - If the user tries to access any authenticated route without being logged in, they are redirected to `/auth`.

 */
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthStatus = () => {
    const accessToken = localStorage.getItem('accessToken');
    const profileData = JSON.parse(localStorage.getItem('profileData') || '{}');

    if (accessToken && profileData?.name && profileData?.email) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, []);

  if (isLoading) {
    return <LinearProgress color="secondary"></LinearProgress>;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <UserProvider>
        <Router>
          <SnackBarError />
          <SnackBarSuccess />
          <Routes>
            <Route
              path="/auth"
              element={
                !isAuthenticated ? (
                  <AuthLayout>
                    <RegisterLoginPage onLoginSuccess={checkAuthStatus} />
                  </AuthLayout>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/"
              element={
                <MainLayout>
                  <LandingPage />
                </MainLayout>
              }
            />
            <Route path="/about" element={<AboutPage />} />
            <Route
              path="/venue/:id"
              element={
                <MainLayout>
                  <VenueDetailsPage />
                </MainLayout>
              }
            />
            {isAuthenticated ? (
              <>
                <Route
                  path="/manage-venue"
                  element={
                    <MainLayout>
                      <ManageVenuePage />
                    </MainLayout>
                  }
                />
                <Route
                  path="/newvenue"
                  element={
                    <MainLayout>
                      <NewVenuePage />
                    </MainLayout>
                  }
                />
                <Route
                  path="/hostpage/:name"
                  element={
                    <MainLayout>
                      <AllHostsPage />
                    </MainLayout>
                  }
                />
                <Route
                  path="/user-overview"
                  element={
                    <MainLayout>
                      <UserOverviewPage />
                    </MainLayout>
                  }
                />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/auth" replace />} />
            )}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </UserProvider>
    </LocalizationProvider>
  );
}

export default App;
