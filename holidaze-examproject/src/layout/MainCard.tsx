import { ReactNode } from 'react';
import { Card, CardContent } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface CardProps {
  children: ReactNode;
}

function MainCard(props: CardProps) {
  const theme = useTheme();
  return (
    <Card sx={{ backgroundColor: theme.palette.background.paper, boxShadow: '3px 3px 15px rgba(73, 190, 248, 0.25)' }} >
      <CardContent sx={{ padding: 0 }}>{props.children}</CardContent>
    </Card>
  );
}

export default MainCard;
