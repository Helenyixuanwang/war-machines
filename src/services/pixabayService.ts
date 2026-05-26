import { PixabayImage, PixabayResponse } from '../types';

const PIXABAY_KEY = '56027432-8b0e6594cb2892459e791c410';
const PIXABAY_BASE = 'https://pixabay.com/api';

export const fetchPixabayImages = async (
  searchTerm: string,
  count: number = 6
): Promise<PixabayImage[]> => {
  try {
    const encoded = encodeURIComponent(`${searchTerm} world war`);
    const url = `${PIXABAY_BASE}/?key=${PIXABAY_KEY}&q=${encoded}&image_type=photo&per_page=${count}&safesearch=true`;
    const response = await fetch(url);
    if (!response.ok) return [];
    const data: PixabayResponse = await response.json();
    return data.hits;
  } catch (error) {
    console.error('Pixabay fetch error:', error);
    return [];
  }
};
