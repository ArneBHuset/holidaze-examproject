import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
function MainFilterCard({ onSearch, onSortChange, }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [submittedSearchTerm, setSubmittedSearchTerm] = useState('');
    const [selectedSort, setSelectedSort] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const handleSearchInputChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
    };
    const handleSearchKeyDown = (event) => {
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
    const handleSortToggle = (sortField) => {
        if (selectedSort === sortField) {
            const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
            setSortOrder(newSortOrder);
            onSortChange(sortField, newSortOrder);
        }
    };
    const handleSortCheck = (sortField) => {
        if (selectedSort !== sortField) {
            setSelectedSort(sortField);
            setSortOrder('asc');
            onSortChange(sortField, 'asc');
        }
        else {
            setSelectedSort('');
            onSortChange('created', 'desc');
        }
    };
    return (_jsx(MainCard, { children: _jsxs(Grid, { container: true, rowSpacing: 1, padding: 2, children: [_jsxs(Grid, { size: { xs: 12 }, children: [_jsx(DefaultSubTitle, { children: "search" }), _jsx(DefaultInput, { children: _jsx(TextField, { type: "search", placeholder: "Villa...", variant: "standard", slotProps: {
                                    input: {
                                        endAdornment: (_jsx(InputAdornment, { position: "start", children: _jsx(SearchIcon, {}) })),
                                    },
                                }, value: searchTerm, onChange: handleSearchInputChange, onKeyDown: handleSearchKeyDown, style: { width: '100%' } }) }), submittedSearchTerm && (_jsxs(Box, { display: "flex", alignItems: "center", justifyContent: "space-between", mt: 1, paddingX: 1, children: [_jsx(Typography, { variant: "body1", children: submittedSearchTerm }), _jsx(IconButton, { onClick: handleClearSearch, size: "small", children: _jsx(CloseIcon, {}) })] })), _jsx(Box, { display: "flex", justifyContent: "right", children: _jsx(DefaultButton, { children: _jsx(Button, { onClick: handleSearchSubmit, disabled: !searchTerm.trim(), sx: { mt: 2, justifyContent: 'right' }, children: "search" }) }) })] }), _jsxs(Grid, { size: { xs: 12 }, mb: 2, children: [_jsx(DefaultSubTitle, { children: "Sort" }), _jsx(Box, { display: "flex", flexDirection: "column", gap: 2, children: ['price', 'maxGuests', 'rating'].map((sortField) => (_jsxs(Box, { display: "flex", alignItems: "center", gap: 2, marginTop: 1, children: [_jsx(Checkbox, { checked: selectedSort === sortField, onChange: () => handleSortCheck(sortField), size: "large", sx: {
                                            color: theme.palette.primary.light,
                                            padding: 0,
                                            '&.Mui-checked': { color: theme.palette.secondary.main },
                                            '&:hover': { color: theme.palette.secondary.main },
                                        } }), _jsxs(Typography, { onClick: () => selectedSort === sortField && handleSortToggle(sortField), variant: "h5", sx: {
                                            display: 'flex',
                                            width: '100%',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            cursor: selectedSort === sortField ? 'pointer' : 'default',
                                            color: selectedSort === sortField ? 'inherit' : 'gray',
                                            borderBottom: selectedSort === sortField ? `2px solid ${theme.palette.secondary.main}` : 'none',
                                        }, children: [sortField.charAt(0).toUpperCase() + sortField.slice(1), selectedSort === sortField &&
                                                (sortOrder === 'asc' ? (_jsx(ArrowDropUpIcon, { sx: { fontSize: 30 } })) : (_jsx(ArrowDropDownIcon, { sx: { fontSize: 30 } })))] })] }, sortField))) })] })] }) }));
}
export default React.memo(MainFilterCard);
