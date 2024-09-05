import MainCard from '../../layout/MainCard.tsx';
import  Grid from '@mui/material/Grid2';
import DefaultSubTitle from '../titles/SubTitle.tsx';
import DefaultInput from '../../styles/mui-styles/components/inputs.tsx';
import { Box, Chip, InputLabel, OutlinedInput, Select, SelectChangeEvent, TextField } from '@mui/material';
import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useTheme } from '@mui/material/styles'
import Checkbox from '@mui/material/Checkbox';


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
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function MainFilterCard() {
  const theme = useTheme();
  const [availableChecked, setAvailableChecked] = React.useState(true);
  const availabilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAvailableChecked(event.target.checked);
  };

  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <MainCard >
        <Grid container spacing={4}>
          <Grid size={{ xs: 12 }}>
            <Box>
              <DefaultSubTitle>Search</DefaultSubTitle>
                  <DefaultInput>
                    <TextField
                      fullWidth
                      type="search"
                      placeholder="anderson@noroff.no"
                      variant="standard"
                    />
                  </DefaultInput>
            </Box>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DefaultInput>
              <DatePicker />
              </DefaultInput>
            </LocalizationProvider>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Checkbox
              checked={availableChecked}
              onChange={availabilityChange}
              inputProps={{ 'aria-label': 'controlled' }}
              sx={{color: theme.palette.secondary.main}}
            />
          </Grid>

        </Grid>
    </MainCard>
  );
}

export default MainFilterCard;