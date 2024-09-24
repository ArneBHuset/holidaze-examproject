import Typography from '@mui/material/Typography';
import { CardContent, Box, useTheme, alpha } from '@mui/material';
import Card from '@mui/material/Card';

function WelcomeCard() {
  const theme = useTheme();

  return (
    <Card sx={{ backgroundColor: alpha(theme.palette.primary.light, 0.8) }}>
      <CardContent sx={{ backgroundColor: alpha(theme.palette.primary.light, 0) }}>
        <Box
          sx={{
            textAlign: { xs: 'left', sm: 'left' },
            borderRadius: 2,
            padding: 4,
            color: theme.palette.primary.light,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: theme.palette.secondary.main,
              fontSize: {
                xs: theme.typography.h2.fontSize,
                md: theme.typography.h1.fontSize,
              },
            }}
          >
            HOLIDAZE
          </Typography>
          <Typography variant="h4" sx={{ color: theme.palette.background.paper }}>
            Your luxurious adventures are only a few clicks aways
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default WelcomeCard;
