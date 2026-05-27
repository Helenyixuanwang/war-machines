import React, { useState } from 'react';
import { Box, TextField, Button, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  onSearch: (term: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSearch = () => {
    const trimmed = input.trim();
    if (trimmed) onSearch(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, width: '100%', maxWidth: 700, mx: 'auto', my: 3 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search tanks, planes, warships... (e.g. Spitfire, Tiger Tank)"
        value={input}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
          },
        }}
      />
      <Button
        variant="contained"
        onClick={handleSearch}
        disabled={isLoading || !input.trim()}
        sx={{ px: 4, fontWeight: 700, fontSize: '1rem' }}
      >
        {isLoading ? 'Searching...' : 'SEARCH'}
      </Button>
    </Box>
  );
};

export default SearchBar;
