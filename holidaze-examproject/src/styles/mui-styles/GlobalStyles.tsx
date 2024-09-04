import { GlobalStyles as MUIGlobalStyles } from '@mui/material';
import theme from './MuiThemes.ts';

const GlobalStyles = () => (
  <MUIGlobalStyles
    styles={{
      '@font-face': {
        fontFamily: 'Cinzel',
        src: `url('/src/assets/fonts/Cinzel-VariableFont_wght.ttf') format('truetype')`,
        fontWeight: '400 700',
        fontStyle: 'normal',
        fontDisplay: 'swap',
      },
      body: {
        margin: 0,
        padding: 0,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        fontFamily: theme.typography.fontFamily,
      },

    }}
  />
);

export default GlobalStyles;
