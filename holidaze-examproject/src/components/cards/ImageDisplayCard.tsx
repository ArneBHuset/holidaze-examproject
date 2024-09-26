import { useState } from 'react';
import { Box, ImageList, ImageListItem, ImageListItemBar, Button, Modal } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MainCard from '../../layout/MainCard.tsx';
import DefaultSubTitle from '../titles/SubTitle.tsx';
import { MediaData } from '../../services/interfaces/api/venueResponse.ts';

interface ImageDisplayCardProps {
  venueMedia: MediaData[];
}

/**
 * ImageDisplayCard component for displaying venue media images.
 * It shows images vertically on larger screens, and as a carousel on smaller screens.
 *
 * @param {ImageDisplayCardProps} venueMedia - An array of media objects for the venue.
 */
function ImageDisplayCard({ venueMedia }: { venueMedia: MediaData[] }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [modalImage, setModalImage] = useState<MediaData | null>(null);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % venueMedia.length);
  };
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + venueMedia.length) % venueMedia.length);
  };
  const handleImageClick = (media: MediaData) => {
    setModalImage(media);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setModalImage(null);
  };

  return (
    <MainCard>
      <Box sx={{ width: '100%', height: 'auto', padding: 1 }}>
        {isSmallScreen ? (
          <Box position="relative" display="flex" alignItems="center" justifyContent="center">
            <Button
              onClick={handlePrevImage}
              sx={{ position: 'absolute', left: '10px', zIndex: 1, color: theme.palette.secondary.main }}
            >
              <ArrowBackIosIcon />
            </Button>
            <img
              src={`${venueMedia[currentImageIndex].url}?w=248&fit=crop&auto=format`}
              srcSet={`${venueMedia[currentImageIndex].url}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={venueMedia[currentImageIndex].alt || 'Venue image'}
              loading="eager"
              style={{ width: '100%', height: 'auto' }}
              onClick={() => handleImageClick(venueMedia[currentImageIndex])}
            />
            <ImageListItemBar
              title={venueMedia[currentImageIndex].alt || 'Venue Image'}
              sx={{
                textAlign: 'center',
                height: '25%',
                fontFamily: theme.typography.h5,
                opacity: 0,
                transition: 'opacity 0.3s',
                '&:hover': { opacity: 1 },
              }}
            />
            <Button
              onClick={handleNextImage}
              sx={{ position: 'absolute', right: '10px', zIndex: 1, color: theme.palette.secondary.main }}
            >
              <ArrowForwardIosIcon />
            </Button>
          </Box>
        ) : (
          <ImageList variant="masonry" cols={1} gap={4}>
            {venueMedia.map((media) => (
              <ImageListItem key={media.url}>
                <img
                  src={`${media.url}?w=248&fit=crop&auto=format`}
                  srcSet={`${media.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={media.alt || 'Venue image'}
                  loading="eager"
                  style={{ cursor: 'pointer', borderRadius: '6px' }}
                  onClick={() => handleImageClick(media)}
                />
                <ImageListItemBar
                  title={media.alt || ''}
                  sx={{
                    textAlign: 'center',
                    height: '25%',
                    fontFamily: theme.typography.h5,
                    opacity: 0,
                    transition: media.alt ? 'opacity 0.3s' : 'none',
                    '&:hover': {
                      opacity: media.alt ? 1 : 0,
                    },
                  }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Box>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-image-title"
        aria-describedby="modal-image-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            maxHeight: '500px',
            maxWidth: '750px',
            transform: 'translate(-50%, -50%)',
            width: { xs: '98%', sm: '80%' },
            backgroundColor: 'background.paper',
            boxShadow: '5px 5px 15px rgba(73, 190, 248, 0.45)',
            borderRadius: '6px',
            p: { xs: 0.5, sm: 2 },
            outline: 'none',
          }}
        >
          {modalImage && (
            <>
              <DefaultSubTitle>{modalImage.alt || 'Venue Image'}</DefaultSubTitle>
              <img
                src={`${modalImage.url}`}
                alt={modalImage.alt || 'Venue image'}
                style={{ width: '100%', height: '100%', maxHeight: '420px', marginBottom: 10 }}
              />
            </>
          )}
        </Box>
      </Modal>
    </MainCard>
  );
}

export default ImageDisplayCard;
