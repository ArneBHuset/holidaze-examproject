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
            {!isAuthenticated ? (
              <>
                <Route
                  path="/auth"
                  element={
                    <AuthLayout>
                      <RegisterLoginPage onLoginSuccess={checkAuthStatus} />
                    </AuthLayout>
                  }
                />
                <Route path="*" element={<Navigate to="/auth" replace />} />
              </>
            ) : (
              <>
                <Route path="/auth" element={<Navigate to="/" replace />} />
                <Route
                  path="/"
                  element={
                    <MainLayout>
                      <LandingPage />
                    </MainLayout>
                  }
                />
                <Route
                  path="/venue/:id"
                  element={
                    <MainLayout>
                      <VenueDetailsPage />
                    </MainLayout>
                  }
                />
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
                  path="/about"
                  element={
                    <MainLayout>
                      <AboutPage />
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
            )}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </UserProvider>
    </LocalizationProvider>
  );
}

export default App;
