import { createTheme, ThemeProvider, Theme, useTheme } from '@mui/material/styles';

// Custom theme to ensure consistency for Select components
const customSelectTheme = (outerTheme: Theme) =>
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
            // Apply padding directly to the select element
            padding: '5px 12px', // Customize the padding as needed
            ...outerTheme.typography.body1, // Apply the body1 typography styles
            color: outerTheme.palette.primary.main, // Text color
            height: '34px', // Set height

          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            // This controls the bottom border via the `::before` and `::after` pseudo-elements.
            '&::before': {
              borderBottom: `1px solid var(--Select-brandBorderColor)`, // Default bottom border
              borderBottomLeftRadius: '5px', // Apply the border radius for the bottom-left corner
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
            },
            '&:hover:not(.Mui-disabled, .Mui-error)::before': {
              borderBottom: `2px solid var(--Select-brandBorderHoverColor)`, // Bottom border hover color
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
              borderBottom: `2px solid var(--Select-brandBorderFocusedColor)`, // Focused bottom border color
              borderBottomLeftRadius: '5px',
            },
            '&.Mui-error::before': {
              borderBottom: `2px solid var(--Select-errorBorderColor)`, // Error bottom border color
              borderBottomLeftRadius: '5px',
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            position: 'relative', // Ensure positioning is correct
            '&::before': {
              borderLeft: `1px solid var(--Select-brandBorderColor)`, // Default left border
              content: '""',
              position: 'absolute',
              height: '100%', // Ensure it covers the entire height
              bottom: 0,
              left: 0,
            },
            '&:hover:not(.Mui-disabled, .Mui-error)::before': {
              borderLeft: `2px solid var(--Select-brandBorderHoverColor)`, // Left border hover color
            },
            '&.Mui-focused::before': {
              borderLeft: `2px solid var(--Select-brandBorderFocusedColor)`, // Focused left border color
            },
            '&.Mui-error::before': {
              borderLeft: `2px solid var(--Select-errorBorderColor)`, // Error left border color
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

// Usage of ThemeProvider
export default function DefaultSelect(props: InputNode) {
  const outerTheme = useTheme();
  return <ThemeProvider theme={customSelectTheme(outerTheme)}>{props.children}</ThemeProvider>;
}
