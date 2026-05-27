import React from 'react';
import {
  Box, Card, CardMedia, CardContent, Typography,
  Chip, Link, CircularProgress, Button
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { MachineResult } from '../../types';

interface ResultsDisplayProps {
  result: MachineResult | null;
  isLoading: boolean;
  error: string | null;
  onBack: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, isLoading, error, onBack }) => {

  if (isLoading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
      <CircularProgress color="primary" size={60} />
    </Box>
  );

  if (error) return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={{ mb: 2 }}>
        Back to Browse
      </Button>
      <Typography color="error" variant="h6">{error}</Typography>
    </Box>
  );

  if (!result) return null;

  const { wiki, images, searchTerm } = result;

  return (
    <Box sx={{ mt: 4 }}>

      {/* Go Back button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={onBack}
        variant="outlined"
        color="secondary"
        sx={{ mb: 3 }}
      >
        Back to Browse
      </Button>

      <Typography variant="h2" color="secondary" gutterBottom>
        {wiki?.title || searchTerm}
      </Typography>

      {wiki?.extract && (
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8, maxWidth: 900 }}>
          {wiki.extract}
        </Typography>
      )}

      {wiki?.content_urls?.desktop?.page && (
        <Link
          href={wiki.content_urls.desktop.page}
          target="_blank"
          rel="noopener noreferrer"
          color="secondary"
        >
          Read full article on Wikipedia →
        </Link>
      )}

      {wiki?.extract && (
        <Box sx={{ mt: 2, mb: 3 }}>
          <Chip
            label="⭐ Fun Fact"
            color="secondary"
            sx={{ mr: 1, fontWeight: 700 }}
          />
          <Typography variant="body2" component="span" color="text.secondary">
            {wiki.extract.split('.')[0]}.
          </Typography>
        </Box>
      )}

      {images.length > 0 && (
        <>
          <Typography variant="h3" sx={{ mt: 4, mb: 2 }}>
            📸 Photos
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {images.map((img) => (
              <Card key={img.id} sx={{ width: 300, bgcolor: 'background.paper' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={img.webformatURL}
                  alt={img.tags}
                />
                <CardContent sx={{ py: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    📷 {img.user}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </>
      )}

      {images.length === 0 && wiki?.thumbnail && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h3" sx={{ mb: 2 }}>📸 Photos</Typography>
          <Card sx={{ maxWidth: 400 }}>
            <CardMedia
              component="img"
              height="300"
              image={wiki.thumbnail.source}
              alt={wiki.title}
            />
          </Card>
        </Box>
      )}

    </Box>
  );
};

export default ResultsDisplay;
