import Typography from '@mui/material/Typography';
import { CardContent, Box, useTheme, alpha, Button } from '@mui/material';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import DefaultButton from '../../styles/mui-styles/components/defaultBtn.tsx';

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
            Your luxurious adventures are only few clicks away
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'right', marginTop: 8 }}>
          <DefaultButton>
            <Button component={Link} to="/">
              Browse venues
            </Button>
          </DefaultButton>
        </Box>
      </CardContent>
    </Card>
  );
}

export default WelcomeCard;
