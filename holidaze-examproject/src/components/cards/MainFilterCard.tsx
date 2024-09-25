import MainCard from '../../layout/MainCard.tsx';
import Grid from '@mui/material/Grid2';
import DefaultSubTitle from '../titles/SubTitle.tsx';
import DefaultInput from '../../styles/mui-styles/components/inputs.tsx';
import { Box, Checkbox, Typography, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import DefaultButton from '../../styles/mui-styles/components/defaultBtn.tsx';
import theme from '../../styles/mui-styles/MuiThemes.ts';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';

function MainFilterCard({
  onSearch,
  onSortChange,
}: {
  onSearch: (searchTerm: string) => void;
  onSortChange: (sort: string, sortOrder: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSort, setSelectedSort] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('asc');

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  const handleSortToggle = (sortField: string) => {
    if (selectedSort === sortField) {
      const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
      setSortOrder(newSortOrder);
      onSortChange(sortField, newSortOrder);
    }
  };

  const handleSortCheck = (sortField: string) => {
    if (selectedSort !== sortField) {
      setSelectedSort(sortField);
      setSortOrder('asc');
      onSortChange(sortField, 'asc');
    } else {
      setSelectedSort('');
    }
  };

  return (
    <MainCard>
      <Grid container rowSpacing={2} columnSpacing={1} padding={2} m="auto">
        <Grid size={{ xs: 12 }}>
          <DefaultSubTitle>Search</DefaultSubTitle>
          <DefaultInput>
            <TextField
              type="search"
              placeholder="Search venues..."
              variant="standard"
              value={searchTerm}
              onChange={handleSearchInputChange}
              onKeyDown={handleSearchKeyDown}
              style={{ width: '100%' }}
            />
          </DefaultInput>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Box display="flex" alignItems="center" gap={2} marginTop={1}>
              <Checkbox
                checked={selectedSort === 'price'}
                onChange={() => handleSortCheck('price')}
                size="large"
                sx={{
                  color: theme.palette.primary.main,
                  padding: 0,
                  '&.Mui-checked': { color: theme.palette.secondary.main },
                  '&:hover': { color: theme.palette.secondary.main },
                }}
              />
              <Typography
                onClick={() => selectedSort === 'price' && handleSortToggle('price')}
                sx={{
                  cursor: selectedSort === 'price' ? 'pointer' : 'default',
                  color: selectedSort === 'price' ? 'inherit' : 'gray',
                }}
              >
                Price ({sortOrder === 'asc' && selectedSort === 'price' ? 'Low to High' : 'High to Low'})
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={2}>
              <Checkbox
                checked={selectedSort === 'maxGuests'}
                onChange={() => handleSortCheck('maxGuests')}
                size="large"
                sx={{
                  color: theme.palette.primary.main,
                  padding: 0,
                  '&.Mui-checked': { color: theme.palette.secondary.main },
                  '&:hover': { color: theme.palette.secondary.main },
                }}
              />
              <Typography
                onClick={() => selectedSort === 'maxGuests' && handleSortToggle('maxGuests')}
                sx={{
                  cursor: selectedSort === 'maxGuests' ? 'pointer' : 'default',
                  color: selectedSort === 'maxGuests' ? 'inherit' : 'gray',
                }}
              >
                Max Guests ({sortOrder === 'asc' && selectedSort === 'maxGuests' ? 'Few to Many' : 'Many to Few'})
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={2}>
              <Checkbox
                checked={selectedSort === 'rating'}
                onChange={() => handleSortCheck('rating')}
                size="large"
                sx={{
                  color: theme.palette.primary.main,
                  padding: 0,
                  '&.Mui-checked': { color: theme.palette.secondary.main },
                  '&:hover': { color: theme.palette.secondary.main },
                }}
              />
              <Typography
                onClick={() => selectedSort === 'rating' && handleSortToggle('rating')}
                sx={{
                  cursor: selectedSort === 'rating' ? 'pointer' : 'default',
                  color: selectedSort === 'rating' ? 'inherit' : 'gray',
                }}
              >
                Rating ({sortOrder === 'asc' && selectedSort === 'rating' ? <ArrowDownward /> : <ArrowUpward />})
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <DefaultButton>
            <Button onClick={() => setSearchTerm('')}>Reset</Button>
          </DefaultButton>
        </Grid>
      </Grid>
    </MainCard>
  );
}

export default React.memo(MainFilterCard); // Use React.memo to prevent unnecessary re-renders
