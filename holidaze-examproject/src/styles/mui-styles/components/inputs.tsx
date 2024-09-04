import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { createTheme, ThemeProvider, Theme, useTheme } from '@mui/material/styles';
import InputNode from '../../../services/interfaces/react-nodes/inputNode.ts';

const customTheme = (outerTheme: Theme) =>
  createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '--TextField-brandBorderColor': outerTheme.palette.primary.main,
            '--TextField-brandBorderHoverColor': outerTheme.palette.secondary.main,
            '--TextField-brandBorderFocusedColor': outerTheme.palette.secondary.main,
            '--TextField-errorBorderColor': outerTheme.palette.error.main, // Error color
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            // Default and hover state for bottom and left borders
            '&::before': {
              borderBottom: `1px solid var(--TextField-brandBorderColor)`,
              borderLeft: `1px solid var(--TextField-brandBorderColor)`,
              height: '38px',
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
            },
            // Hover state for bottom and left borders
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: `2px solid var(--TextField-brandBorderHoverColor)`,
              borderLeft: `2px solid var(--TextField-brandBorderHoverColor)`,
            },
            // Focus state: bottom border with ::after and left border with ::before
            '&::after': {
              borderBottom: `2px solid var(--TextField-brandBorderFocusedColor)`,
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
            },
            '&.Mui-focused::before': {
              borderLeft: `2px solid var(--TextField-brandBorderFocusedColor)`,
            },
            // Error state for bottom and left borders
            '&.Mui-error::before': {
              borderBottom: `2px solid var(--TextField-errorBorderColor)`,
              borderLeft: `2px solid var(--TextField-errorBorderColor)`,
            },
            '&.Mui-error::after': {
              borderBottom: `2px solid var(--TextField-errorBorderColor)`,
            },
          },
          input: {
            ...outerTheme.typography.body1, // Default state: Use body1 typography from the theme
            color: outerTheme.palette.primary.main, // Default state: primary color for text
            padding: '5px 12px',
            height: '40px',



            // Disabled state
            '&.Mui-disabled': {
              color: outerTheme.palette.text.disabled, // Text color when disabled
              backgroundColor: outerTheme.palette.action.disabledBackground, // Background color when disabled
            },
          },
        },
      },
    },
  });

export default function DefaultInput(props: InputNode) {
  const outerTheme = useTheme();

  return (
    <ThemeProvider theme={customTheme(outerTheme)}>
      {props.children}
    </ThemeProvider>
  );
}
