import { jsx as _jsx } from 'react/jsx-runtime';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
const customSelectTheme = (outerTheme) =>
  createTheme({
    components: {
      MuiSelect: {
        styleOverrides: {
          root: {
            '--Select-brandBorderColor': outerTheme.palette.primary.main,
            '--Select-brandBorderHoverColor': outerTheme.palette.secondary.main,
            '--Select-brandBorderFocusedColor': outerTheme.palette.secondary.main,
            '--Select-errorBorderColor': outerTheme.palette.error.main,
          },
          select: {
            padding: '5px 12px',
            ...outerTheme.typography.body1,
            color: outerTheme.palette.primary.main,
            height: '34px',
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            '&::before': {
              borderBottom: `1px solid var(--Select-brandBorderColor)`,
              borderBottomLeftRadius: '5px',
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
            },
            '&:hover:not(.Mui-disabled, .Mui-error)::before': {
              borderBottom: `2px solid var(--Select-brandBorderHoverColor)`,
              borderBottomLeftRadius: '5px',
            },
            '&::after': {
              borderBottom: `2px solid var(--TextField-brandBorderFocusedColor)`,
              borderBottomLeftRadius: '5px',
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
            },
            '&.Mui-focused::before': {
              borderBottom: `2px solid var(--Select-brandBorderFocusedColor)`,
              borderBottomLeftRadius: '5px',
            },
            '&.Mui-error::before': {
              borderBottom: `2px solid var(--Select-errorBorderColor)`,
              borderBottomLeftRadius: '5px',
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            position: 'relative',
            '&::before': {
              borderLeft: `1px solid var(--Select-brandBorderColor)`,
              content: '""',
              position: 'absolute',
              height: '100%', // Ensure it covers the entire height
              bottom: 0,
              left: 0,
            },
            '&:hover:not(.Mui-disabled, .Mui-error)::before': {
              borderLeft: `2px solid var(--Select-brandBorderHoverColor)`,
            },
            '&.Mui-focused::before': {
              borderLeft: `2px solid var(--Select-brandBorderFocusedColor)`,
            },
            '&.Mui-error::before': {
              borderLeft: `2px solid var(--Select-errorBorderColor)`,
            },
            input: {
              ...outerTheme.typography.body1,
              color: outerTheme.palette.primary.main,
              padding: 'px 12px',
              height: '40px',
            },
          },
        },
      },
    },
  });
export default function DefaultSelect(props) {
  const outerTheme = useTheme();
  return _jsx(ThemeProvider, { theme: customSelectTheme(outerTheme), children: props.children });
}
