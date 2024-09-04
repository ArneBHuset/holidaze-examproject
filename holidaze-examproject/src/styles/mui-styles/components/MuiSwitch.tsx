import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

export const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 350,
  height: '60px',
  padding: 2,
  position: 'relative',
  '& .MuiSwitch-switchBase': {
    margin: 2,
    padding: 0,
    transform: 'translateX(0%)',
    '&.Mui-checked': {
      transform: `translateX(calc(350px - 187px))`,
      '& .MuiSwitch-thumb:before': {
        content: '"Managing venue"', // Toggle to "Managing venue" on thumb
        color: theme.palette.primary.main, // Full opacity and primary.main color for thumb text
        fontWeight: 'bold',
        fontSize: '14px',
        opacity: 1, // Full opacity when selected
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.secondary.main, // Thumb background remains unchanged
    width: '185px',
    height: '55px',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    '&::before': {
      content: '"Looking for venue"', // Default text in the thumb
      color: theme.palette.primary.main, // Full opacity and primary.main color for thumb text
      fontWeight: 'bold',
      fontSize: '14px',
      opacity: 1, // Always full opacity for thumb text
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    width: '100%',
    backgroundColor: theme.palette.background.default, // Background remains unchanged
    borderRadius: 20 / 2,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 10px',
    '&::before': {
      content: '"Managing venue"', // Default text in the track
      color: theme.palette.primary.main, // Track text uses primary.main color
      fontWeight: 'bold',
      fontSize: '14px',
      opacity: 1, // Lower opacity when not selected
    },
    '& .Mui-checked + &::before': {
      content: '"Looking for venue"', // Toggle to "Looking for venue" when checked
      opacity: 0.5, // Lower opacity when selected
    },
  },
}));
