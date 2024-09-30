import { Container } from '@mui/material';
import MainCard from '../layout/MainCard.tsx';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';

function AboutPage() {
  return (
    <Container maxWidth="sm" sx={{ my: 2 }}>
      <MainCard>
        <CardContent>
          <Grid container>
            <Grid size={12}>
              <Typography component="h1" variant="h5" textAlign="center">
                WELCOME TO HOLIDAZE
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </MainCard>
    </Container>
  );
}

export default AboutPage;
