import MainCard from '../../layout/MainCard.tsx';
import Grid from '@mui/material/Grid2';
import DefaultSubTitle from '../titles/SubTitle.tsx';
import DefaultInput from '../../styles/mui-styles/components/inputs.tsx';
import { Box, Checkbox, Typography, Button, TextField, IconButton, InputAdornment } from '@mui/material';
import React, { useState } from 'react';
import DefaultButton from '../../styles/mui-styles/components/defaultBtn.tsx';
import theme from '../../styles/mui-styles/MuiThemes.ts';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';

/**
 * MainFilterCard component that handles search and sort functionalities.
 */
function MainFilterCard({
  onSearch,
  onSortChange,
}: {
  onSearch: (searchTerm: string) => void;
  onSortChange: (sort: string, sortOrder: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState<string>('');
  const [selectedSort, setSelectedSort] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searchTerm.trim()) {
      submitSearchTerm();
    }
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      submitSearchTerm();
    }
  };

  const submitSearchTerm = () => {
    setSubmittedSearchTerm(searchTerm);
    onSearch(searchTerm);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSubmittedSearchTerm('');
    onSearch('');
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
      onSortChange('created', 'desc');
    }
  };

  return (
    <MainCard>
      <Grid container rowSpacing={1} padding={2}>
        <Grid size={{ xs: 12 }}>
          <DefaultSubTitle>search</DefaultSubTitle>
          <DefaultInput>
            <TextField
              type="search"
              placeholder="Villa..."
              variant="standard"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                },
              }}
              value={searchTerm}
              onChange={handleSearchInputChange}
              onKeyDown={handleSearchKeyDown}
              style={{ width: '100%' }}
            />
          </DefaultInput>
          {submittedSearchTerm && (
            <Box display="flex" alignItems="center" justifyContent="space-between" mt={1} paddingX={1}>
              <Typography variant="body1">{submittedSearchTerm}</Typography>
              <IconButton onClick={handleClearSearch} size="small">
                <CloseIcon />
              </IconButton>
            </Box>
          )}
          <Box display="flex" justifyContent="right">
            <DefaultButton>
              <Button
                onClick={handleSearchSubmit}
                disabled={!searchTerm.trim()}
                sx={{ mt: 2, justifyContent: 'right' }}
              >
                Submit
              </Button>
            </DefaultButton>
          </Box>
        </Grid>
        <Grid size={{ xs: 12 }} mb={2}>
          <DefaultSubTitle>Sort</DefaultSubTitle>
          <Box display="flex" flexDirection="column" gap={2}>
            {['price', 'maxGuests', 'rating'].map((sortField) => (
              <Box key={sortField} display="flex" alignItems="center" gap={2} marginTop={1}>
                <Checkbox
                  checked={selectedSort === sortField}
                  onChange={() => handleSortCheck(sortField)}
                  size="large"
                  sx={{
                    color: theme.palette.primary.light,
                    padding: 0,
                    '&.Mui-checked': { color: theme.palette.secondary.main },
                    '&:hover': { color: theme.palette.secondary.main },
                  }}
                />
                <Typography
                  onClick={() => selectedSort === sortField && handleSortToggle(sortField)}
                  variant="h5"
                  sx={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: selectedSort === sortField ? 'pointer' : 'default',
                    color: selectedSort === sortField ? 'inherit' : 'gray',
                    borderBottom: selectedSort === sortField ? `2px solid ${theme.palette.secondary.main}` : 'none',
                  }}
                >
                  {sortField.charAt(0).toUpperCase() + sortField.slice(1)}
                  {selectedSort === sortField &&
                    (sortOrder === 'asc' ? (
                      <ArrowDropUpIcon sx={{ fontSize: 30 }} />
                    ) : (
                      <ArrowDropDownIcon sx={{ fontSize: 30 }} />
                    ))}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </MainCard>
  );
}

export default React.memo(MainFilterCard);
