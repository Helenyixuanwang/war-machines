import React, { useState } from 'react';
import {
  ThemeProvider, CssBaseline, Container, Box,
  Typography, AppBar, Toolbar, Link, Grid
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import theme from './theme/theme';
import SearchBar from './components/SearchBar/SearchBar';
import ResultsDisplay from './components/ResultsDisplay/ResultsDisplay';
import CategoryBrowser from './components/CategoryBrowser/CategoryBrowser';
import MachineOfTheDay from './components/MachineOfTheDay/MachineOfTheDay';
import { fetchWikiData } from './services/wikipediaService';
import { fetchPixabayImages } from './services/pixabayService';
import { MachineResult } from './types';

const App: React.FC = () => {
  const [result, setResult] = useState<MachineResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeWar] = useState<'all' | 'WW1' | 'WW2'>('all');

  const handleSearch = async (searchTerm: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const [wikiData, images] = await Promise.allSettled([
        fetchWikiData(searchTerm),
        fetchPixabayImages(searchTerm),
      ]);

      const wiki = wikiData.status === 'fulfilled' ? wikiData.value : null;
      const imgs = images.status === 'fulfilled' ? images.value : [];

      if (!wiki && imgs.length === 0) {
        setError(`Nothing found for "${searchTerm}" — try another search!`);
        return;
      }

      setResult({ wiki, images: imgs, searchTerm });
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err) {
      setError('Something went wrong — please try again!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setResult(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Sticky navbar */}
      <AppBar position="sticky" sx={{ bgcolor: 'primary.dark', mb: 2, top: 0, zIndex: 1100 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 2 }}>
            ⚔️ WAR MACHINES EXPLORER
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ minHeight: '80vh' }}>

        {/* Hero title */}
        <Box sx={{ textAlign: 'center', mt: 4, mb: 2 }}>
          <Typography variant="h1" color="secondary" gutterBottom>
            ⚔️ War Machines Explorer
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Discover tanks, planes, warships and weapons from WW1 & WW2
          </Typography>
        </Box>

        {/* Search bar — full width always */}
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {/* Results — full width */}
        {(result || isLoading || error) && (
          <ResultsDisplay
            result={result}
            isLoading={isLoading}
            error={error}
            onBack={handleBack}
          />
        )}

        {/* Two column layout — only on home */}
        {!result && !isLoading && !error && (
          <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start', mt: 2 }}>

            {/* Left — category browser */}
            <Box sx={{ flex: 1 }}>
              <CategoryBrowser onSearch={handleSearch} activeWar={activeWar} />
            </Box>

            {/* Right — machine of the day */}
            <Box sx={{ width: 300, flexShrink: 0 }}>
              <MachineOfTheDay onLearnMore={handleSearch} />
            </Box>

          </Box>
        )}

      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          mt: 8,
          py: 3,
          px: 2,
          bgcolor: 'primary.dark',
          textAlign: 'center',
          borderTop: '2px solid',
          borderColor: 'secondary.dark',
        }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Built with ❤️ by Helen (Yixuan Wang)
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
          <Link
            href="https://github.com/Helenyixuanwang"
            target="_blank"
            rel="noopener noreferrer"
            color="secondary"
            sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
          >
            <GitHubIcon fontSize="small" /> GitHub
          </Link>
          <Link
            href="https://linkedin.com/in/helenyixuanwang"
            target="_blank"
            rel="noopener noreferrer"
            color="secondary"
            sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
          >
            <LinkedInIcon fontSize="small" /> LinkedIn
          </Link>
        </Box>
      </Box>

    </ThemeProvider>
  );
};

export default App;
