import { jsx as _jsx } from 'react/jsx-runtime';
import { GlobalStyles as MUIGlobalStyles } from '@mui/material';
import theme from './MuiThemes.ts';
const GlobalStyles = () =>
  _jsx(MUIGlobalStyles, {
    styles: {
      '.MuiCardContent-root:last-child': {
        paddingBottom: '0px !important',
      },
      body: {
        margin: 0,
        padding: 0,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        fontFamily: theme.typography.fontFamily,
      },
    },
  });
export default GlobalStyles;
