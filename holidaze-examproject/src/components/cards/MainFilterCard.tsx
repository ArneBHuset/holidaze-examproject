import MainCard from '../../layout/MainCard.tsx';
import Grid from '@mui/material/Grid2';
import DefaultSubTitle from '../titles/SubTitle.tsx';
import DefaultInput from '../../styles/mui-styles/components/inputs.tsx';
import { Box, Chip, Select, SelectChangeEvent, TextField, MenuItem, Typography, Checkbox, Button } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTheme, Theme } from '@mui/material/styles';
import DefaultSelect from '../../styles/mui-styles/components/SelectMenu.tsx';
import availableCountries from '../../services/interfaces/api/filtering/availableCountries.ts';
import { DatesType } from '../../services/interfaces/api/filtering/uiFilterParams.ts';
import { applyFilters } from '../../services/filtering/filterLandingPage.ts';
import DefaultButton from '../../styles/mui-styles/components/defaultBtn.tsx';

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
      selectedCountries.indexOf(country) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function MainFilterCard({ onSearch }: { onSearch: (searchTerm: string) => void }) {
  const theme = useTheme();

  // Handles logic for searching
  const [searchTerm, setSearchTerm] = useState<string>('');
  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searchTerm.trim()) {
      onSearch(searchTerm); // Trigger search when Enter is pressed
    }
  };

  // Handles logic for checkbox (detailedOnly toggle)
  const [detailedOnly, setDetailedOnly] = useState<boolean>(false);
  const handleDetailedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDetailedOnly(event.target.checked);
  };

  // Handles logic for country selection menu
  const [selectedCountries, setSelectedCountries] = useState<availableCountries['selectedCountries']>([]);
  const [countries, setCountries] = useState<availableCountries['countries']>([]);

  const handleMenuSelectChange = (event: SelectChangeEvent<typeof selectedCountries>) => {
    const {
      target: { value },
    } = event;
    setSelectedCountries(typeof value === 'string' ? value.split(',') : value);
  };

  // Handle chip deletion
  const handleDeleteCountry = (countryToDelete: string) => {
    setSelectedCountries((prevSelected) => prevSelected.filter((country) => country !== countryToDelete));
  };

  useEffect(() => {
    const storedCountries = sessionStorage.getItem('countries');
    if (storedCountries) {
      setCountries(JSON.parse(storedCountries) as availableCountries['countries']);
    }
  }, []);

  // Handles logic for date selection
  const [dates, setDates] = useState<DatesType>({
    checkInDate: null,
    checkOutDate: null,
  });
  const checkOutRef = useRef<HTMLInputElement>(null);
  const [checkOutOpen, setCheckOutOpen] = useState<boolean>(false);

  const handleCheckInChange = (newDate: Dayjs | null) => {
    setDates((prevDates) => ({
      ...prevDates,
      checkInDate: newDate,
      checkOutDate:
        newDate && dates.checkOutDate && newDate.isAfter(dates.checkOutDate) ? null : prevDates.checkOutDate,
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

  const handleReset = () => {
    setSearchTerm('');
    setDetailedOnly(false);
    setSelectedCountries([]);
    setDates({ checkInDate: null, checkOutDate: null });
  };

  useEffect(() => {
    const filters = {
      detailedOnly,
      selectedCountries,
      dates,
    };

    applyFilters(filters);
  }, [detailedOnly, selectedCountries, dates]);

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
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleSearchInputChange(event)}
              onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => handleSearchKeyDown(event)}
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
              onChange={handleMenuSelectChange}
              fullWidth={true}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      sx={{ backgroundColor: theme.palette.secondary.main }}
                      onDelete={() => handleDeleteCountry(value)}
                    />
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
                minDate={dates.checkInDate ? dayjs(dates.checkInDate).add(1, 'day') : undefined}
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
        <Grid size={{ xs: 8 }}>
          <Box display="flex" alignItems="center" gap={2} marginTop={1}>
            <Checkbox
              checked={detailedOnly}
              onChange={handleDetailedChange}
              size="large"
              inputProps={{ 'aria-label': 'controlled' }}
              sx={{
                color: theme.palette.primary.main,
                padding: 0,
                '&.Mui-checked': { color: theme.palette.secondary.main },
                '&:hover': { color: theme.palette.secondary.main },
              }}
            />
            <Typography>Detailed venues only</Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 4 }} display="flex" justifyContent="flex-end">
          <DefaultButton>
            <Button onClick={handleReset}>Reset</Button>
          </DefaultButton>
        </Grid>
      </Grid>
    </MainCard>
  );
}

export default MainFilterCard;
