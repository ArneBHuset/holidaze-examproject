import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
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
        }
        else {
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
        return _jsx(LinearProgress, { color: "secondary" });
    }
    return (_jsx(LocalizationProvider, { dateAdapter: AdapterDayjs, children: _jsx(UserProvider, { children: _jsxs(Router, { children: [_jsx(SnackBarError, {}), _jsx(SnackBarSuccess, {}), _jsxs(Routes, { children: [!isAuthenticated ? (_jsxs(_Fragment, { children: [_jsx(Route, { path: "/auth", element: _jsx(AuthLayout, { children: _jsx(RegisterLoginPage, { onLoginSuccess: checkAuthStatus }) }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/auth", replace: true }) })] })) : (_jsxs(_Fragment, { children: [_jsx(Route, { path: "/auth", element: _jsx(Navigate, { to: "/", replace: true }) }), _jsx(Route, { path: "/", element: _jsx(MainLayout, { children: _jsx(LandingPage, {}) }) }), _jsx(Route, { path: "/venue/:id", element: _jsx(MainLayout, { children: _jsx(VenueDetailsPage, {}) }) }), _jsx(Route, { path: "/manage-venue", element: _jsx(MainLayout, { children: _jsx(ManageVenuePage, {}) }) }), _jsx(Route, { path: "/newvenue", element: _jsx(MainLayout, { children: _jsx(NewVenuePage, {}) }) }), _jsx(Route, { path: "/hostpage/:name", element: _jsx(MainLayout, { children: _jsx(AllHostsPage, {}) }) }), _jsx(Route, { path: "/about", element: _jsx(MainLayout, { children: _jsx(AboutPage, {}) }) }), _jsx(Route, { path: "/user-overview", element: _jsx(MainLayout, { children: _jsx(UserOverviewPage, {}) }) })] })), _jsx(Route, { path: "*", element: _jsx(NotFoundPage, {}) })] })] }) }) }));
}
export default App;
