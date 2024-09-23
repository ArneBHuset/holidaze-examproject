import Typography from '@mui/material/Typography';
import { CardContent, Box, useTheme } from '@mui/material';
import MainCard from '../../layout/MainCard.tsx';

function WelcomeCard() {
const theme = useTheme()

  return (
    <MainCard
    >
      <CardContent sx={{
        backgroundColor:theme.palette.primary.light,
      }}>
        <Box sx={{ textAlign: 'left', borderRadius: 2, padding: 4 }}>
          <Typography variant="h1" sx={{ color:theme.palette.secondary.main }}>
           HOLIDAZE
          </Typography>

          <Typography variant="subtitle1" sx={{ color:theme.palette.background.paper }}>
            Your next luxurious adventure is only a few clicks away
          </Typography>
        </Box>
      </CardContent>
    </MainCard>
  );
}

export default WelcomeCard;
