import { jsx as _jsx } from 'react/jsx-runtime';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
const customTheme = (outerTheme) =>
  createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: alpha(outerTheme.palette.secondary.main, 0.95),
            color: outerTheme.palette.primary.main,
            padding: '6px 12px',
            fontSize: '1.1rem',
            fontWeight: 500,
            lineHeight: 1.75,
            letterSpacing: '0.05em',
            fontFamily: outerTheme.typography.button.fontFamily,
            '&:hover': {
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              backgroundColor: outerTheme.palette.secondary.main,
            },
            '&.Mui-disabled': {
              backgroundColor: outerTheme.palette.action.disabledBackground,
              color: outerTheme.palette.text.disabled,
            },
          },
        },
      },
    },
  });
export default function DefaultButton(props) {
  const outerTheme = useTheme();
  return _jsx(ThemeProvider, { theme: customTheme(outerTheme), children: props.children });
}
