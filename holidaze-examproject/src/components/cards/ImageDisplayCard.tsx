import React from 'react';
import { Box, ImageList, ImageListItem, ImageListItemBar, IconButton, Card } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface MediaData {
  url: string;
  alt?: string;
}

interface ImageDisplayCardProps {
  venueMedia: MediaData[];
}

function ImageDisplayCard({ venueMedia }: ImageDisplayCardProps) {
  const theme = useTheme();
  return (
    <Card sx={{ backgroundColor: theme.palette.primary.light, boxShadow: '3px 3px 15px rgba(73, 190, 248, 0.25)' }}>
      <Box sx={{ width: '100%', height: 'auto', padding: 2 }}>
        <ImageList variant="masonry" cols={3} gap={8}>
          {venueMedia.map((media, index) => (
            <ImageListItem key={media.url} cols={index === 0 ? 2 : 1} rows={index === 0 ? 2 : 1}>
              <img
                src={`${media.url}?w=248&fit=crop&auto=format`}
                srcSet={`${media.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={media.alt || 'Venue image'}
                loading="eager"
              />
              <ImageListItemBar
                title={media.alt || 'Venue Image'}
                sx={{ textAlign: 'center', height: '25%', fontFamily: theme.typography.h5 }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Card>
  );
}

export default ImageDisplayCard;
