import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#121212',
      light: '#404040',
    },
    secondary: {
      main: '#F88349',
      light: '#49BEF8',
    },
    error: {
      main: '#ac1b00',
    },
    info: {
      main: '#49bef8',
    },
    success: {
      main: '#67F849',
    },
    background: {
      default: '#E8EDF0',
      paper: '#FCFCFC',
    },
    text: {
      primary: '#121212',
      secondary: '#FCFCFC',
      disabled: 'rgba(18,18,18, 0.5)',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      hover: 'rgba(0, 0, 0, 0.04)',
      selected: 'rgba(0, 0, 0, 0.08)',
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
    },
  },
  typography: {
    fontFamily: '"Lora", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"CinzelDecorative-Regular", "Lora", "Arial", sans-serif',
      fontSize: '4rem',
      fontWeight: 300,
      lineHeight: 1.167,
      letterSpacing: '0.08em',
    },
    h2: {
      fontFamily: '"CinzelDecorative-Regular", "Lora", "Arial", sans-serif',
      fontSize: '3rem',
      fontWeight: 300,
      lineHeight: 1.2,
      letterSpacing: '0.018',
    },
    h3: {
      fontFamily: '"CinzelDecorative-Regular", "Lora", "Arial", sans-serif',
      fontSize: '2.0rem',
      lineHeight: 1.167,
      letterSpacing: '0.015',
    },
    h4: {
      fontFamily: '"Cinzel-regular", "Lora", "Arial", sans-serif',
      fontSize: '1.6rem',
      fontWeight: 300,
      lineHeight: 1.235,
      letterSpacing: '0.00',
    },
    h5: {
      fontFamily: '"Cinzel-regular", "Lora", "Arial", sans-serif',
      fontSize: '1.2rem',
      fontWeight: 300,
      lineHeight: 1.334,
      letterSpacing: '0em',
    },
    h6: {
      fontFamily: '"Cinzel-regular", "Lora", "Arial", sans-serif',
      fontSize: '0.95rem',
      fontWeight: 300,
      lineHeight: 1.6,
      letterSpacing: '0.0075em',
    },
    subtitle1: {
      fontFamily: '"Cinzel-regular", "Lora", "Arial", sans-serif',
      fontSize: '1.5rem',
      fontWeight: 400,
      lineHeight: 1.6,
      letterSpacing: '0.07em',
    },
    subtitle2: {
      fontFamily: '"Cinzel-regular", "Lora", "Arial", sans-serif',
      fontSize: '1.2rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.025em',
    },
    body1: {
      fontFamily: '"Lora", "Helvetica", "Arial", sans-serif',
      fontSize: '1.1rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.025em',
    },
    body2: {
      fontFamily: '"Lora", "Helvetica", "Arial", sans-serif',
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.43,
      letterSpacing: '0.01071em',
    },
    button: {
      fontFamily: '"Lora", "Lora", "Arial", sans-serif',
      fontSize: '1.1rem',
      fontWeight: 400,
      lineHeight: 1.75,
      letterSpacing: '0.03em',
      textTransform: 'uppercase',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'CinzelDecorative-Regular';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: url('/src/assets/fonts/CinzelDecorative-Bold.ttf') format('truetype');
        }
        @font-face {
          font-family: 'Cinzel-Regular';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: url('/src/assets/fonts/Cinzel-Regular.ttf') format('truetype');
        }
      `,
    },
  },
});

export default theme;
