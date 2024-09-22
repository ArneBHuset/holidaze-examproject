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
    divider: 'rgba(0, 0, 0, 0.12)', //Remove?
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
      fontFamily: '"AnticDidone", "Lora", "Arial", sans-serif',
      fontSize: '3.6rem',
      fontWeight: 300,
      lineHeight: 1.167,
      letterSpacing: '0.025em',
    },
    h2: {
      fontFamily: '"AnticDidone", "Lora", "Arial", sans-serif',
      fontSize: '2.8rem',
      fontWeight: 300,
      lineHeight: 1.2,
      letterSpacing: '0.018',
    },
    h3: {
      fontFamily: '"AnticDidone", "Lora", "Arial", sans-serif',
      fontSize: '2.1rem',
      fontWeight: 300,
      lineHeight: 1.167,
      letterSpacing: '0.015',
    },
    h4: {
      fontFamily: '"AnticDidone", "Lora", "Arial", sans-serif',
      fontSize: '1.6rem',
      fontWeight: 300,
      lineHeight: 1.235,
      letterSpacing: '0.00',
    },
    h5: {
      fontFamily: '"AnticDidone", "Lora", "Arial", sans-serif',
      fontSize: '1.2rem',
      fontWeight: 300,
      lineHeight: 1.334,
      letterSpacing: '0em',
    },
    h6: {
      fontFamily: '"AnticDidone", "Lora", "Arial", sans-serif',
      fontSize: '0.95rem',
      fontWeight: 300,
      lineHeight: 1.6,
      letterSpacing: '0.0075em',
    },
    subtitle1: {
      fontFamily: '"AnticDidone", "Lora", "Arial", sans-serif',
      fontSize: '1.5rem',
      fontWeight: 400,
      lineHeight: 1.75,
      letterSpacing: '0.07em',
    },
    subtitle2: {
      fontFamily: '"AnticDidone", "Lora", "Arial", sans-serif',
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
      fontFamily: '"AnticDidone", "Lora", "Arial", sans-serif',
      fontSize: '1.1rem',
      fontWeight: 400,
      lineHeight: 1.75,
      letterSpacing: '0.03em',
      textTransform: 'uppercase',
    },
  },
  //Remove the rest under?
  spacing: 8,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  zIndex: {
    mobileStepper: 1000,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
});

export default theme;
