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
        content: '"Managing venue"',
        color: theme.palette.primary.main,
        fontWeight: 'bold',
        fontSize: '14px',
        opacity: 1,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.secondary.main,
    width: '185px',
    height: '55px',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    '&::before': {
      content: '"Looking for venue"',
      color: theme.palette.primary.main,
      fontWeight: 'bold',
      fontSize: '14px',
      opacity: 1,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    width: '100%',
    backgroundColor: theme.palette.background.default,
    borderRadius: 20 / 2,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 10px',
    '&::before': {
      content: '"Managing venue"',
      color: theme.palette.primary.main,
      fontWeight: 'bold',
      fontSize: '14px',
      opacity: 1,
    },
    '& .Mui-checked + &::before': {
      content: '"Looking for venue"',
      opacity: 0.5,
    },
  },
}));
