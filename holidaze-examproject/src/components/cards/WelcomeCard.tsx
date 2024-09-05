import Typography from '@mui/material/Typography';
import { CardContent, Box } from '@mui/material';
import { ImageList, ImageListItem } from '@mui/material';
import MainCard from '../../layout/MainCard.tsx';

function WelcomeCard() {
  const itemData = [
    {
      img: 'https://th.bing.com/th/id/R.18d0d9117a2f5ba5ab53bcb3f4a4a23b?rik=kJH4Pg77%2bTytlg&pid=ImgRaw&r=0',
      title: 'Beautiful Venue 1',
    },
  ];
  return (
<MainCard>
      <CardContent sx={{ display: 'flex', gap: 4 }}>
        <Box>
          <Typography variant="h1">HOLIDAZE</Typography>
          <Typography>Where Every Venue Becomes Your Dream Destination</Typography>
        </Box>
        <Box>
          <ImageList sx={{ width: 220, height: 120, mt: 1, borderRadius: 3 }}>
            {itemData.map((item) => (
              <ImageListItem key={item.img} sx={{ borderRadius: '4px' }}>
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
</MainCard>
  );
}

export default WelcomeCard;
