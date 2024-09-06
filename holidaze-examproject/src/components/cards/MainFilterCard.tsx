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
  MenuItem,
  Typography,
  Checkbox,
} from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTheme, Theme } from '@mui/material/styles';
import DefaultSelect from '../../styles/mui-styles/components/SelectMenu.tsx';

// Temporary chip styling for menu field
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

function getStyles(country: string, selectedCountries: readonly string[], theme: Theme) {
  return {
    fontWeight:
      selectedCountries.indexOf(country) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

type DatesType = {
  checkInDate: Dayjs | null;
  checkOutDate: Dayjs | null;
};

function MainFilterCard({ onSearch }) {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    if ((event.key === 'Enter' || event.type === 'blur') && value.trim()) {
      onSearch(value);
    }
  };

  // Checkbox filter for availability
  const [availableChecked, setAvailableChecked] = useState(false);
  const availabilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAvailableChecked(event.target.checked);
  };

  // Dropdown for countries
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);

  const menuSelectChange = (event: SelectChangeEvent<typeof selectedCountries>) => {
    const {
      target: { value },
    } = event;
    setSelectedCountries(typeof value === 'string' ? value.split(',') : value);
  };

  useEffect(() => {
    const storedCountries = sessionStorage.getItem('countries');
    if (storedCountries) {
      setCountries(JSON.parse(storedCountries));
    }
  }, []);

  const [dates, setDates] = useState<DatesType>({
    checkInDate: null,
    checkOutDate: null,
  });
  const checkOutRef = useRef<HTMLInputElement>(null);
  const [checkOutOpen, setCheckOutOpen] = useState(false);

  const handleCheckInChange = (newDate: Dayjs | null) => {
    setDates((prevDates) => ({
      ...prevDates,
      checkInDate: newDate,
      checkOutDate: newDate && dates.checkOutDate && newDate.isAfter(dates.checkOutDate) ? null : prevDates.checkOutDate,
    }));

    if (newDate) {
      setCheckOutOpen(true);
    }
  };

  const handleCheckOutChange = (newDate: Dayjs | null) => {
    setDates((prevDates) => ({
      ...prevDates,
      checkOutDate: newDate,
    }));
    setCheckOutOpen(false);
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
            <TextField
              fullWidth
              type="search"
              placeholder="Beach house in..."
              value={searchTerm}
              onChange={handleSearchInputChange}
              onKeyDown={handleSearchInputChange}
              onBlur={handleSearchInputChange}
              variant="standard"
            />
          </DefaultInput>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box marginBottom={1}>
            <DefaultSubTitle>Country</DefaultSubTitle>
          </Box>
          <DefaultSelect>
            <Select
              multiple
              variant="standard"
              value={selectedCountries}
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
              {countries.map((country) => (
                <MenuItem key={country} value={country} style={getStyles(country, selectedCountries, theme)}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </DefaultSelect>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <DefaultSubTitle>Check-in & check-out</DefaultSubTitle>
          <Box display="flex" alignItems="center" gap={1} sx={{ marginTop: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={dates.checkInDate}
                onChange={handleCheckInChange}
                slots={{ textField: TextField }}
                slotProps={{
                  textField: {
                    placeholder: 'Check-in',
                    fullWidth: true,
                  },
                }}
              />
            </LocalizationProvider>
            <Typography>TO</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={dates.checkOutDate}
                onChange={handleCheckOutChange}
                disabled={!dates.checkInDate}
                open={checkOutOpen}
                onClose={() => setCheckOutOpen(false)}
                minDate={dates.checkInDate ? dayjs(dates.checkInDate).add(1, 'day') : null}
                slots={{ textField: TextField }}
                slotProps={{
                  textField: {
                    inputRef: checkOutRef,
                    placeholder: 'Check-out',
                    fullWidth: true,
                  },
                }}
              />
            </LocalizationProvider>
          </Box>
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
            <Typography>Hide booked venues</Typography>
          </Box>
        </Grid>
      </Grid>
    </MainCard>
  );
}

export default MainFilterCard;
