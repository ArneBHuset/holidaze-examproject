import MainCard from '../../layout/MainCard.tsx';
import Grid from '@mui/material/Grid2';
import DefaultSubTitle from '../titles/SubTitle.tsx';
import DefaultInput from '../../styles/mui-styles/components/inputs.tsx';
import {
  Box,
  Chip,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useRef } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import DefaultSelect from '../../styles/mui-styles/components/SelectMenu.tsx';

//Temporary chip styling for menue field
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

function MainFilterCard({onSearch}) {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if ((event.key === 'Enter' || event.type === 'blur') && value.trim()) {
      onSearch(value);
    }
  };


  //Checkbox filter is true or false
  const [availableChecked, setAvailableChecked] = React.useState(false);
  const availabilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAvailableChecked(event.target.checked);
  };

  //Dropdown
  const [personName, setPersonName] = React.useState<string[]>([]);

  const menuSelectChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value);
  };

  //Date selection logic
  const [dates, setDates] = useState({
    checkInDate: null,
    checkOutDate: null,
  });

  console.log(dates)

  const checkOutRef = useRef(null);

  const handleCheckInChange = (newDate) => {
    setDates((prevDates) => ({
      ...prevDates,
      checkInDate: newDate,
    }));
  };

  const handleCheckOutChange = (newDate) => {
    setDates((prevDates) => ({
      ...prevDates,
      checkOutDate: newDate,
    }));
  };

  useEffect(() => {
    if (dates.checkInDate && checkOutRef.current) {
      checkOutRef.current.focus();
    }
  }, [dates.checkInDate]);

  return (
    <MainCard>
      <Grid container rowSpacing={2} columnSpacing={1}>
        <Grid size={{ xs: 12 }}>
          <DefaultSubTitle>Search</DefaultSubTitle>
          <DefaultInput>
            <TextField fullWidth type="search" placeholder="Beach house in..."  value={searchTerm}
                       onChange={handleSearchInputChange}
                       onKeyDown={handleSearchInputChange}
                       onBlur={handleSearchInputChange}
                       variant="standard"></TextField>
          </DefaultInput>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <DefaultSubTitle>Check-in & check-out</DefaultSubTitle>
          <Box display="flex" alignItems="center" gap={1} sx={{ marginTop: 1 }}>
            <LocalizationProvider maxWidth={true} minWidth={false} dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Check-in"
                value={dates.checkInDate}
                onChange={handleCheckInChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <Typography>TO</Typography>

            {/* Second DatePicker (Check-out Date) */}
            <LocalizationProvider maxWidth={true} minWidth={false} dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Check-out"
                value={dates.checkOutDate}
                onChange={handleCheckOutChange}
                disabled={!dates.checkInDate} // Disable until check-in date is selected
                minDate={dates.checkInDate ? dayjs(dates.checkInDate).add(1, 'day') : null} // Disable past check-in date
                renderInput={(params) => <TextField {...params} inputRef={checkOutRef} />}
              />
            </LocalizationProvider>
          </Box>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box marginBottom={1}>
            <DefaultSubTitle>Country</DefaultSubTitle>
          </Box>
          <DefaultSelect>
            <Select
              multiple
              variant="standard"
              value={personName}
              onChange={menuSelectChange}
              fullWidth={true}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} sx={{ backgroundColor: theme.palette.secondary.main }} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </DefaultSelect>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box display="flex" alignItems="center" gap={2}>
            <Checkbox
              checked={availableChecked}
              onChange={availabilityChange}
              size="large"
              inputProps={{ 'aria-label': 'controlled' }}
              sx={{
                color: theme.palette.primary.main,
                padding: 0,
                '&.Mui-checked': { color: theme.palette.secondary.main },
                '&:hover': { color: theme.palette.secondary.main },
              }}
            />
            <Typography>Show available venues only</Typography>
          </Box>
        </Grid>
      </Grid>
    </MainCard>
  );
}

export default MainFilterCard;
