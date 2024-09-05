import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import theme from '../../styles/mui-styles/MuiThemes.ts';
import BtnProps from '../../services/interfaces/react-nodes/BtnNodes.ts';

function DefaultSubTitle(props: BtnProps) {
  return (
    <Box sx={{ borderBottom: 1, borderColor: theme.palette.primary.main, paddingY: 1 }}>
      <Typography variant="subtitle1">{props.children}</Typography>
    </Box>
  );
}

export default DefaultSubTitle;
