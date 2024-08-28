MuiTheme.ts applies styling for MUI components
GlobalStyles uses MUIThemes and applies global values to the root body.

SCSS applies custom styling where needed.

The themeProvider wraps the entry point in main.tsx, so that themes are globally available,
however, if specific themes needs to be applied to specific components, use:
import { useTheme } from '@mui/material/styles';
then init the useTheme hook inside the component function
const theme = useTheme();
This will allow access like forexample:
<Typography style={{ color: theme.palette.primary.main }}>
