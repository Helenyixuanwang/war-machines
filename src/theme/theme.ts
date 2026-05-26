import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4a7c3f',       // Army green
      light: '#6aac5a',
      dark: '#2d5a27',
    },
    secondary: {
      main: '#c8a84b',       // Brass/gold — like military medals
      light: '#f0d070',
      dark: '#8a6f1e',
    },
    background: {
      default: '#1a2415',    // Very dark green-black
      paper: '#2a3520',      // Slightly lighter for cards
    },
    text: {
      primary: '#e8e0c8',    // Warm off-white, like old paper
      secondary: '#a0b890',  // Muted green-grey
    },
  },
  typography: {
    fontFamily: '"Oswald", "Roboto Condensed", "Arial Narrow", sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 700, letterSpacing: '0.05em' },
    h2: { fontSize: '2rem',   fontWeight: 700, letterSpacing: '0.04em' },
    h3: { fontSize: '1.5rem', fontWeight: 600 },
    h6: { fontSize: '1rem',   fontWeight: 600 },
  },
  shape: {
    borderRadius: 4,         // Slightly boxy — military feel
  },
});

export default theme;
