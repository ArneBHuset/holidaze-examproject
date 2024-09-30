import Typography from '@mui/material/Typography';
import { CardContent, Box, useTheme, alpha } from '@mui/material';
import Card from '@mui/material/Card';

function WelcomeCard() {
  const theme = useTheme();

  return (
    <Card
      sx={{
        background: `linear-gradient(to bottom, ${alpha(theme.palette.primary.light, 0.7)} 15%, ${alpha(
          theme.palette.primary.light,
          0.1,
        )} 100%)`,
        width: { xs: '100%', sm: '90%', md: '90%', lg: '70%' },
      }}
    >
      <CardContent sx={{ backgroundColor: alpha(theme.palette.primary.light, 0) }}>
        <Box
          sx={{
            textAlign: 'left',
            borderRadius: 2,
            paddingTop: 2,
            color: theme.palette.primary.light,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: theme.palette.secondary.main,
              fontSize: {
                xs: theme.typography.h2.fontSize,
                sm: theme.typography.h3.fontSize,
                md: theme.typography.h2.fontSize,
                lg: theme.typography.h1.fontSize,
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
