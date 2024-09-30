import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './styles/mui-styles/MuiThemes.ts';
import GlobalStyles from './styles/mui-styles/GlobalStyles.tsx';
createRoot(document.getElementById('root')).render(_jsx(StrictMode, { children: _jsxs(ThemeProvider, { theme: theme, children: [_jsx(CssBaseline, {}), _jsx(GlobalStyles, {}), _jsx(App, {})] }) }));
