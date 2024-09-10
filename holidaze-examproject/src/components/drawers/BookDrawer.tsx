import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid2';
import DefaultSubTitle from '../titles/SubTitle.tsx';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import DefaultButton from '../../styles/mui-styles/components/defaultBtn.tsx';
import FormControl from '@mui/material/FormControl';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

interface FormValues {
  email: string;
  password: string;
}

interface DrawerComponentProps {
  open: boolean;
  toggleDrawer: (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const BookVenueDrawer: React.FC<DrawerComponentProps> = ({ open, toggleDrawer }) => {
  const anchor: Anchor = 'bottom'; // Fixed to bottom as per your requirement

  // Initialize react-hook-form
  const { handleSubmit, control } = useForm<FormValues>();

  // Function to handle form submission
  const onSubmit = (data: FormValues) => {
    console.log('Form Data:', data);
    // Perform any booking-related logic here
  };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 500 }}
      role="presentation"
      height={'400px'}
      display='flex'
      justifyContent='center'
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <FormControl component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4} justifyContent='center'>
          <Grid size={12}>
            <Box>
              <DefaultSubTitle>Email</DefaultSubTitle>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    fullWidth
                    type="email"
                    placeholder="anderson@noroff.no"
                    variant="standard"
                    {...field}
                  />
                )}
              />
            </Box>
          </Grid>
          <Grid size={12}>
            <Box>
              <DefaultSubTitle>Password</DefaultSubTitle>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    fullWidth
                    type="password"
                    placeholder="Enter your password"
                    variant="standard"
                    {...field}
                  />
                )}
              />
            </Box>
          </Grid>
          <Grid size={12}>
            <Box>
              <DefaultSubTitle>Password</DefaultSubTitle>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    fullWidth
                    type="password"
                    placeholder="Enter your password"
                    variant="standard"
                    {...field}
                  />
                )}
              />
            </Box>
          </Grid>
          <Grid size={6}>
            <DefaultButton>
              <Button fullWidth={true} onClick={handleSubmit(onSubmit)}>
                PLACE BOOKING
              </Button>
            </DefaultButton>
          </Grid>
        </Grid>
      </FormControl>
    </Box>
  );

  return (
    <Drawer anchor={anchor} open={open} onClose={toggleDrawer(anchor, false)}>
      {list(anchor)}
    </Drawer>
  );
};

export default BookVenueDrawer;
