import { createTheme, ThemeProvider, Theme, useTheme } from '@mui/material/styles';
import ButtonNode from '../../../services/interfaces/react-nodes/BtnNodes.ts';

const customTheme = (outerTheme: Theme) =>
  createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: 'transparent',
            color: outerTheme.palette.primary.main,
            padding: '4px 12px',
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

export default function SecondaryButton(props: ButtonNode) {
  const outerTheme = useTheme();
  return <ThemeProvider theme={customTheme(outerTheme)}>{props.children}</ThemeProvider>;
}
