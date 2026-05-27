import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { Category } from '../../types';

const CATEGORIES: Category[] = [
  {
    id: 'aircraft',
    label: 'Aircraft',
    emoji: '✈️',
    war: 'both',
    items: ['Spitfire', 'P-51 Mustang', 'Zero Fighter', 'B-17 Flying Fortress', 'Red Baron Fokker', 'Lancaster Bomber'],
  },
  {
    id: 'tanks',
    label: 'Tanks',
    emoji: '🛡️',
    war: 'both',
    items: ['Tiger Tank', 'Sherman Tank', 'T-34 Tank', 'Mark I Tank', 'Panzer IV', 'Churchill Tank'],
  },
  {
    id: 'warships',
    label: 'Warships',
    emoji: '⚓',
    war: 'both',
    items: ['Bismarck battleship', 'Yamato battleship', 'HMS Dreadnought', 'USS Missouri', 'HMS Hood', 'Tirpitz battleship'],
  },
  {
    id: 'weapons',
    label: 'Weapons',
    emoji: '💣',
    war: 'both',
    items: ['Lee-Enfield rifle', 'MP40 submachine gun', 'Bren gun', 'Luger pistol', 'Flamethrower WW2', 'Bazooka WW2'],
  },
];

interface CategoryBrowserProps {
  onSearch: (term: string) => void;
  activeWar: 'all' | 'WW1' | 'WW2';
}

const CategoryBrowser: React.FC<CategoryBrowserProps> = ({ onSearch, activeWar }) => {
  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h2" color="secondary" gutterBottom>
        🎖️ Browse by Category
      </Typography>

      {CATEGORIES.map((category) => (
        <Box key={category.id} sx={{ mb: 5 }}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            {category.emoji} {category.label}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {category.items.map((item) => (
              <Chip
                key={item}
                label={item}
                onClick={() => onSearch(item)}
                color="primary"
                variant="outlined"
                sx={{
                  fontSize: '0.95rem',
                  py: 2,
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                    color: 'white',
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default CategoryBrowser;
