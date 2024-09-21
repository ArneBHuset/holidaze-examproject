import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import DefaultButton from '../../styles/mui-styles/components/defaultBtn.tsx';
import SecondaryButton from '../../styles/mui-styles/components/SecondaryBtn.tsx';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EditIcon from '@mui/icons-material/Edit';
import VenueData from '../../services/interfaces/api/venueResponse.ts';
import UpdateVenue from '../forms/UpdateVenue.tsx';

interface ManagedVenuesCardProps {
  venues: VenueData[];
}

export default function ManagedVenuesCard({ venues }: ManagedVenuesCardProps) {
  const navigate = useNavigate();
  const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null);

  const handleEditVenue = (venueId: string) => {
    setSelectedVenueId(venueId);
  };

  const handleCancelUpdate = () => {
    setSelectedVenueId(null);
  };

  return (
    <Grid container spacing={2}>
      {venues.map((venue) => {
        const isEditing = selectedVenueId === venue.id;

        return (
          <Grid key={venue.id} size={12}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                width: '100%',
                height: 'auto',
                borderBottomLeftRadius: { xs: 0, sm: 3 },
                borderBottomRightRadius: { xs: 0, sm: 3 },
                boxShadow: '3px 3px 15px rgba(73, 190, 248, 0.25)',
              }}
            >
              <Box padding={{ xs: 0.5, sm: 1 }} paddingRight={{ sm: 0 }}>
                <CardMedia
                  component="img"
                  alt={venue.media?.[0]?.alt || 'Venue image'}
                  image={
                    venue.media?.[0]?.url ||
                    'https://media.istockphoto.com/vectors/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-vector-id1128826884?k=20&m=1128826884&s=170667a&w=0&h=_cx7HW9R4Uc_OLLxg2PcRXno4KERpYLi5vCz-NEyhi0='
                  }
                  sx={{
                    width: { xs: '100%', sm: 250 },
                    height: { xs: 200, sm: '100%' },
                    maxHeight: { xs: 200, sm: 260 },
                    borderRadius: { xs: '4px', sm: '8px' },
                  }}
                />
              </Box>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', padding: { xs: 1 } }}>
                <Typography variant="h5">{venue.name}</Typography>
                <Typography variant="body1">
                  <strong>Price:</strong> ${venue.price}
                </Typography>
                <Typography variant="body1">
                  <strong>Country:</strong> {venue.location?.country || 'N/A'}
                </Typography>

                <Grid container spacing={2} paddingTop={2}>
                  <Grid size={6}>
                    <SecondaryButton>
                      <Button
                        onClick={() => handleEditVenue(venue.id)}
                        sx={{ borderBottomLeftRadius: { xs: 0, sm: 4 }, borderBottomRightRadius: { xs: 0, sm: 4 }, width: '100%' }}
                      >
                        <EditIcon sx={{ fontSize: '1.2rem', marginRight: 1 }} />
                        Edit
                      </Button>
                    </SecondaryButton>
                  </Grid>
                  <Grid size={6}>
                    <DefaultButton>
                      <Button
                        onClick={() => navigate(`/venue/${venue.id}`)}
                        sx={{ borderBottomLeftRadius: { xs: 0, sm: 4 }, borderBottomRightRadius: { xs: 0, sm: 4 }, width: '100%' }}
                      >
                        Venue Details <ArrowForwardIosIcon />
                      </Button>
                    </DefaultButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {isEditing && <UpdateVenue venue={venue} onCancel={handleCancelUpdate} />}
          </Grid>
        );
      })}
    </Grid>
  );
}
