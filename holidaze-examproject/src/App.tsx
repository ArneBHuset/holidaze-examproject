import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterLoginPage from './pages/RegisterLoginPage.tsx';
import MainLayout from './layout/MainLayout.tsx';
import AuthLayout from './layout/AuthLayout.tsx';
import LandingPage from './pages/LandingPage.tsx';
import AddVenuePage from './pages/AddVenuePage.tsx';
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

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <UserProvider>
        <Router>
          <SnackBarError />
          <SnackBarSuccess />
          <Routes>
            <>
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
              />{' '}
              {/* Add dynamic route */}
              <Route
                path="/add-venue"
                element={
                  <MainLayout>
                    <AddVenuePage />
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
                path="/user-overview"
                element={
                  <MainLayout>
                    <UserOverviewPage />
                  </MainLayout>
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </>
            <>
              <Route
                path="/auth"
                element={
                  <AuthLayout>
                    <RegisterLoginPage />
                  </AuthLayout>
                }
              />
            </>
          </Routes>
        </Router>
      </UserProvider>
    </LocalizationProvider>
  );
}

export default App;
