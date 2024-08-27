import * as React from 'react';
import { GlobalStyles as MUIGlobalStyles } from '@mui/material';
import theme from './MuiThemes.ts';

const GlobalStyles = () => (
  <MUIGlobalStyles
    styles={{
  body: {
    margin: 0,
      padding: 0,
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
      fontFamily: theme.typography.fontFamily,
  },
  h1: {
    fontSize: theme.typography.h1.fontSize,
      color: theme.palette.primary.main,
  },
}}
/>
);

export default GlobalStyles;
