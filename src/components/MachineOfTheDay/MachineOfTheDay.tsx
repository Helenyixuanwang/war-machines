import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Card, CardMedia, CardContent,
  Button, CircularProgress, Chip
} from '@mui/material';
import { fetchWikiData } from '../../services/wikipediaService';
import { fetchPixabayImages } from '../../services/pixabayService';
import { WikiSummary, PixabayImage } from '../../types';

const ALL_MACHINES = [
  'Spitfire', 'P-51 Mustang', 'Zero Fighter', 'B-17 Flying Fortress',
  'Lancaster Bomber', 'Tiger Tank', 'Sherman Tank', 'T-34 Tank',
  'Mark I Tank', 'Panzer IV', 'Bismarck battleship', 'Yamato battleship',
  'HMS Dreadnought', 'USS Missouri', 'MP40 submachine gun', 'Luger pistol',
];

interface MachineOfTheDayProps {
  onLearnMore: (term: string) => void;
}

const MachineOfTheDay: React.FC<MachineOfTheDayProps> = ({ onLearnMore }) => {
  const [machine, setMachine] = useState('');
  const [wiki, setWiki] = useState<WikiSummary | null>(null);
  const [image, setImage] = useState<PixabayImage | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const pickRandom = () => {
    const index = Math.floor(Math.random() * ALL_MACHINES.length);
    return ALL_MACHINES[index];
  };

  const loadMachine = async (name: string) => {
    setIsLoading(true);
    setWiki(null);
    setImage(null);

    const [wikiResult, imgResult] = await Promise.allSettled([
      fetchWikiData(name),
      fetchPixabayImages(name, 1),
    ]);

    if (wikiResult.status === 'fulfilled') setWiki(wikiResult.value);
    if (imgResult.status === 'fulfilled' && imgResult.value.length > 0) {
      setImage(imgResult.value[0]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const name = pickRandom();
    setMachine(name);
    loadMachine(name);
  }, []);

  const handleSurpriseMe = () => {
    const name = pickRandom();
    setMachine(name);
    loadMachine(name);
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        border: '2px solid',
        borderColor: 'secondary.dark',
        p: 2,
        position: 'sticky',
        top: 80,
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Typography variant="h6" color="secondary" sx={{ fontWeight: 700 }}>
          🎖️ Machine of the Day
        </Typography>
      </Box>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <>
          {/* Machine name */}
          <Chip
            label={wiki?.title || machine}
            color="primary"
            sx={{ mb: 2, fontWeight: 700, fontSize: '0.9rem' }}
          />

          {/* Photo */}
          {(image || wiki?.thumbnail) && (
            <Card sx={{ mb: 2 }}>
              <CardMedia
                component="img"
                height="180"
                image={image ? image.webformatURL : wiki!.thumbnail!.source}
                alt={wiki?.title || machine}
              />
            </Card>
          )}

          {/* Short description */}
          {wiki?.extract && (
            <CardContent sx={{ p: 0, mb: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                {wiki.extract.split('.').slice(0, 2).join('.') + '.'}
              </Typography>
            </CardContent>
          )}

          {/* Buttons */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => onLearnMore(machine)}
              sx={{ fontWeight: 700 }}
            >
              🔍 Learn More
            </Button>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={handleSurpriseMe}
              sx={{ fontWeight: 700 }}
            >
              🎲 Surprise Me!
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default MachineOfTheDay;
