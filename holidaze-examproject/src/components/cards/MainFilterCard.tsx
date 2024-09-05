import MainCard from '../../layout/MainCard.tsx';
import  Grid from '@mui/material/Grid2';
import DefaultSubTitle from '../titles/SubTitle.tsx';
import DefaultInput from '../../styles/mui-styles/components/inputs.tsx';
import { Box, TextField } from '@mui/material';

function MainFilterCard() {
  return (
    <MainCard >
        <Grid container spacing={4}>
          <Grid size={{ xs: 12 }}>
            <Box>
              <DefaultSubTitle>Search</DefaultSubTitle>
                  <DefaultInput>
                    <TextField
                      fullWidth
                      type="search"
                      placeholder="anderson@noroff.no"
                      variant="standard"
                    />
                  </DefaultInput>
            </Box>
          </Grid>

        </Grid>
    </MainCard>
  );
}

export default MainFilterCard;