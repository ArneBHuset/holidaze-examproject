import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import theme from '../../styles/mui-styles/MuiThemes.ts';
import TitleProps from '../../services/interfaces/react-nodes/titleNode.ts';

function DefaultSubTitle(props: TitleProps) {
  return (
    <Box sx={{ borderBottom: 1, borderColor: theme.palette.primary.main, paddingY: 1 }}>
      <Typography variant='subtitle1'>{props.children}</Typography>
    </Box>
  );
}

export default DefaultSubTitle;
