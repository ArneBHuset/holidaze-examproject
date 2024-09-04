import Typography from '@mui/material/Typography';
import { CardContent, Card, Box, useTheme } from '@mui/material';
import { ImageList, ImageListItem } from '@mui/material';

function WelcomeCard() {
  const theme = useTheme();
  const itemData = [
    {
      img: 'https://th.bing.com/th/id/R.18d0d9117a2f5ba5ab53bcb3f4a4a23b?rik=kJH4Pg77%2bTytlg&pid=ImgRaw&r=0',
      title: 'Beautiful Venue 1',
    },
    // {
    //   img: 'https://www.jetsetmag.com/wp-content/uploads/2015/12/k2_galleries_1788_Club%20at%20Kukuiula%20view.jpg',
    //   title: 'Beautiful Venue 2',
    // },
  ];
  return (
    <Card sx={{ mt: 6, mb: 2, backgroundColor: theme.palette.background.paper }}>
      <CardContent sx={{display:'flex'}}>
        <Box>
        <Typography variant="h1">HOLIDAZE</Typography>
        <Typography maxWidth={'70%'}>Where Every Venue Becomes Your Dream Destination</Typography>
        </Box>
        <Box>
          <ImageList sx={{ width: 220, height: 120, mt:1,  }} >
            {itemData.map((item) => (
              <ImageListItem key={item.img} sx={{borderRadius:'4px'}}>
                <img
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
      </Box>
      </CardContent>
    </Card>
  );
}

export default WelcomeCard;
