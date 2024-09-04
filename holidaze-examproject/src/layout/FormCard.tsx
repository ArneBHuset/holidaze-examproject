import { ReactNode } from 'react';
import { Card, CardContent } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface CardProps {
  children: ReactNode;
}

function FormCard(props: CardProps) {
  const theme = useTheme();
  return (
    <Card sx={{}} style={{ backgroundColor: theme.palette.background.paper }}>
      <CardContent>{props.children}</CardContent>
    </Card>
  );
}

export default FormCard;
