import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import TitleProps from '../../services/interfaces/react-nodes/titleNode.ts';

function DefaultSubTitle(props: TitleProps) {
  const theme = useTheme();
  return (
    <Box sx={{ borderBottom: 1, borderColor: theme.palette.primary.main, paddingY: 1 }}>
      <Typography variant="subtitle1" textTransform="uppercase">
        {props.children}
      </Typography>
    </Box>
  );
}

export default DefaultSubTitle;
