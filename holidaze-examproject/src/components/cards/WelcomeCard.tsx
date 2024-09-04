import Typography from '@mui/material/Typography';
import { CardContent, Card, useTheme } from '@mui/material';

function WelcomeCard() {
  const theme = useTheme();
  return (
    <Card sx={{ mt: 6, mb: 2, borderRadius: 4, backgroundColor: theme.palette.secondary.main }}>
      <CardContent>
        <Typography variant="h1">HOLIDAZE</Typography>
        <Typography variant="h2">HOLIDAZE</Typography>
        <Typography variant="h3">HOLIDAZE</Typography>
        <Typography variant="h4">HOLIDAZE</Typography>
        <Typography variant="h5">HOLIDAZE</Typography>
        <Typography variant="h6">HOLIDAZE</Typography>
        <Typography variant="subtitle1">HOLIDAZE</Typography>

        <Typography maxWidth={'70%'}>Where Every Venue Becomes Your Dream Destination</Typography>
      </CardContent>
    </Card>
  );
}

export default WelcomeCard;
