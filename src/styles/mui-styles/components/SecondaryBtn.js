import { jsx as _jsx } from 'react/jsx-runtime';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
const customTheme = (outerTheme) =>
  createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: 'transparent',
            color: outerTheme.palette.primary.main,
            padding: '8px 14px',
            fontSize: '1.1rem',
            fontWeight: 300,
            lineHeight: 1.75,
            letterSpacing: '0.05em',
            borderBottom: `2px solid ${outerTheme.palette.secondary.main}`,
            borderRadius: '0px',
            fontFamily: outerTheme.typography.button.fontFamily,
            '&:hover': {
              textDecoration: 'underline',
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
export default function SecondaryButton(props) {
  const outerTheme = useTheme();
  return _jsx(ThemeProvider, { theme: customTheme(outerTheme), children: props.children });
}
