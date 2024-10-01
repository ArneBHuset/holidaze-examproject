import { alpha, Card, Container } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Header from '../components/header/Header.tsx';
import Footer from '../components/footer/Footer.tsx';
import theme from '../styles/mui-styles/MuiThemes.ts';

function AboutPage() {
  return (
    <>
      <Header />
      <Container
        maxWidth={false}
        sx={{
          backgroundImage: `url('https://www.villaretreats.com/Images/static-hero/hero-romantic-retreats.jpg')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card
          sx={{
            width: { xs: '100%', sm: '80%', md: '45%' },
            ml: { xs: 0, sm: 42, md: 65 },
            mb: { xs: 15, md: 20 },
            maxWidth: '500px',
            backgroundColor: alpha(theme.palette.primary.light, 0.8),
          }}
        >
          <CardContent>
            <Grid container spacing={2} sx={{ color: theme.palette.background.paper }} py={1}>
              <Grid size={12} textAlign="left">
                <Typography variant="h3" sx={{ color: theme.palette.secondary.main }}>
                  WE ARE HOLIDAZE
                </Typography>
              </Grid>
              <Grid size={12}>
                <Typography variant="body1" textAlign="left" mb={2}>
                  We strive to be your go-to platform for booking luxurious venues and villas worldwide. Whether you're
                  planning a romantic getaway, family vacation, or a special event, we offer a curated selection of
                  stunning properties to suit your needs.
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
      <Footer />
    </>
  );
}

export default AboutPage;
