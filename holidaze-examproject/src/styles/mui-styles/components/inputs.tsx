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
            '--TextField-errorBorderColor': outerTheme.palette.error.main,
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            '&::before': {
              borderBottom: `1px solid var(--TextField-brandBorderColor)`,
              borderLeft: `1px solid var(--TextField-brandBorderColor)`,
              borderBottomLeftRadius: '5px',
              height: '38px',
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: `2px solid var(--TextField-brandBorderHoverColor)`,
              borderLeft: `2px solid var(--TextField-brandBorderHoverColor)`,
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
              borderLeft: `2px solid var(--TextField-brandBorderFocusedColor)`,
              borderBottomLeftRadius: '5px',
            },
            '&.Mui-error::before': {
              borderBottom: `2px solid var(--TextField-errorBorderColor)`,
              borderLeft: `2px solid var(--TextField-errorBorderColor)`,
              borderBottomLeftRadius: '5px',
            },
            '&.Mui-error::after': {
              borderBottom: `2px solid var(--TextField-errorBorderColor)`,
              borderBottomLeftRadius: '5px',
            },
          },
          input: {
            ...outerTheme.typography.body1,
            color: outerTheme.palette.primary.main,
            padding: '5px 12px',
            height: '40px',

            '&.Mui-disabled': {
              color: outerTheme.palette.text.disabled,
              backgroundColor: outerTheme.palette.action.disabledBackground,
            },
          },
        },
      },
    },
  });

export default function DefaultInput(props: InputNode) {
  const outerTheme = useTheme();

  return <ThemeProvider theme={customTheme(outerTheme)}>{props.children}</ThemeProvider>;
}
