import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './styles/mui-styles/MuiThemes.ts';
import GlobalStyles from './styles/mui-styles/GlobalStyles.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
