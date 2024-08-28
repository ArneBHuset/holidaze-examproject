import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import theme from '../../styles/mui-styles/MuiThemes.ts';

interface TitleProps {
  children: ReactNode;
}

function SubTitle(props: TitleProps) {
  return (
    <Box sx={{ borderBottom: 1, borderColor: theme.palette.primary.main, paddingY: 1, fontStyle: theme.typography.h5 }}>
      <Typography>{props.children}</Typography>
    </Box>
  );
}

export default SubTitle;
