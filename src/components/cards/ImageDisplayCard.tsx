import { useState } from 'react';
import { Box, ImageList, ImageListItem, ImageListItemBar, Button, Modal } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MainCard from '../../layout/MainCard.tsx';
import DefaultSubTitle from '../titles/SubTitle.tsx';
import { MediaData } from '../../services/interfaces/api/venueResponse.ts';

const DEFAULT_IMAGE_URL =
  'https://th.bing.com/th/id/R.957f5c1b65e9ae5f3c068ac1349d0f1f?rik=pzYV5kEHwRtrgg&pid=ImgRaw&r=0';

/**
 * ImageDisplayCard component for displaying venue media images.
 * It shows images vertically on larger screens, and as a carousel on smaller screens.
 *
 * @param {Object} props - The props for the component.
 * @param {MediaData[]} props.venueMedia - An array of media objects representing venue images.
 * @returns {JSX.Element} The rendered ImageDisplayCard component.
 */
function ImageDisplayCard({ venueMedia }: { venueMedia: MediaData[] }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [modalImage, setModalImage] = useState<MediaData | null>(null);

  const displayedMedia = venueMedia.length > 0 ? venueMedia : [{ url: DEFAULT_IMAGE_URL, alt: 'Default image' }];
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % displayedMedia.length);
  };
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + displayedMedia.length) % displayedMedia.length);
  };
  const handleImageClick = (media: MediaData) => {
    setModalImage(media);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setModalImage(null);
  };
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = DEFAULT_IMAGE_URL;
  };

  return (
    <MainCard>
      <Box sx={{ width: '100%', height: 'auto', padding: 1 }}>
        {isSmallScreen ? (
          <Box position="relative" display="flex" alignItems="center" justifyContent="center">
            <Button
              onClick={handlePrevImage}
              sx={{ position: 'absolute', left: '0px', zIndex: 1, color: theme.palette.secondary.main }}
            >
              <ArrowBackIosIcon sx={{ fontSize: 40 }} />
            </Button>
            <Box
              height="250px"
              p={1}
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ overflow: 'hidden' }}
            >
              <img
                src={displayedMedia[currentImageIndex].url}
                alt={displayedMedia[currentImageIndex]?.alt || 'Venue image'}
                loading="eager"
                style={{
                  width: '100%',
                  height: '100%',
                  maxHeight: '250px',
                  objectFit: 'cover',
                  borderRadius: '6px',
                }}
                onClick={() => handleImageClick(displayedMedia[currentImageIndex])}
                onError={handleImageError}
              />
            </Box>

            <ImageListItemBar
              title={displayedMedia[currentImageIndex]?.alt || 'Venue Image'}
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
              sx={{ position: 'absolute', right: '0px', zIndex: 1, color: theme.palette.secondary.main }}
            >
              <ArrowForwardIosIcon sx={{ fontSize: 40 }} />
            </Button>
          </Box>
        ) : (
          <ImageList variant="masonry" cols={1} gap={4}>
            {displayedMedia.map((media, index) => (
              <ImageListItem key={`${media.url}-${index}`}>
                <img
                  src={media.url}
                  alt={media.alt || 'Venue image'}
                  loading="eager"
                  style={{ cursor: 'pointer', borderRadius: '6px', maxHeight: '200px' }}
                  onClick={() => handleImageClick(media)}
                  onError={handleImageError}
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
                src={modalImage.url}
                alt={modalImage.alt || 'Venue image'}
                style={{ width: '100%', height: '100%', maxHeight: '420px', marginBottom: 10 }}
                onError={handleImageError}
              />
            </>
          )}
        </Box>
      </Modal>
    </MainCard>
  );
}

export default ImageDisplayCard;
