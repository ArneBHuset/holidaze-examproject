import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2'; // Use Grid2 for layout
import React from 'react';

export default function MainVenueCard({ venues }) {
  return (
    <Grid container spacing={2}>
      {venues.map((venue) => (
        <Grid key={venue.id} xs={12} sm={4}>
          <Card sx={{ width: '250px', maxHeight: '400px' }}>
            <CardMedia
              component="img"
              alt={venue.media[0]?.alt || 'Venue image'}
              height="140"
              image={venue.media[0]?.url || '/static/images/cards/contemplative-reptile.jpg'}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {venue.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {venue.description}
              </Typography>
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                <strong>Price:</strong> ${venue.price}
              </Typography>
              <Typography variant="body2">
                <strong>Rating:</strong> {venue.rating}
              </Typography>
              <Typography variant="body2">
                <strong>Country:</strong> {venue.location.country}
              </Typography>
              <Typography variant="body2">
                <strong>Max Guests:</strong> {venue.maxGuests}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
