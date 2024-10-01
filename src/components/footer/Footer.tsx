import { Box, Typography, IconButton, Container, Tooltip } from '@mui/material';
import { LinkedIn, EmojiPeople, GitHub } from '@mui/icons-material';
import theme from '../../styles/mui-styles/MuiThemes.ts';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: 'primary.light',
        borderTop: `2px solid ${theme.palette.secondary.main}`,
        color: 'white',
        padding: 2,
        mt: 'auto',
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Tooltip title="Arne's linkedin">
            <IconButton
              component="a"
              href="www.linkedin.com/in/arne-bjelde-hustveit-48ab31276"
              target="_blank"
              sx={{ color: 'white' }}
              aria-label="LinkedIn"
            >
              <LinkedIn />
            </IconButton>
          </Tooltip>
          <Tooltip title="Arne's portfolio">
            <IconButton
              component="a"
              href="https://arnehustveit.myportfolio.com/"
              target="_blank"
              sx={{ color: 'white' }}
              aria-label="Portfolio"
            >
              <EmojiPeople />
            </IconButton>
          </Tooltip>
          <Tooltip title="Arne's github">
            <IconButton
              component="a"
              href="https://github.com/ArneBHuset"
              target="_blank"
              sx={{ color: 'white' }}
              aria-label="Github"
            >
              <GitHub />
            </IconButton>
          </Tooltip>
        </Box>
        <Typography variant="h6" sx={{ mt: 1 }}>
          © 2024 Created by Arne Bjelde Hustveit
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
