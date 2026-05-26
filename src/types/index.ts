// Wikipedia API response shape
export interface WikiSummary {
  title: string;
  extract: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
  content_urls?: {
    desktop: { page: string };
  };
}

// Pixabay image shape
export interface PixabayImage {
  id: number;
  webformatURL: string;
  largeImageURL: string;
  tags: string;
  user: string;
}

// Pixabay API response
export interface PixabayResponse {
  hits: PixabayImage[];
  total: number;
}

// Combined result we pass around the app
export interface MachineResult {
  wiki: WikiSummary | null;
  images: PixabayImage[];
  searchTerm: string;
}

// Category definition for the Browse section
export interface Category {
  id: string;
  label: string;
  emoji: string;
  items: string[];
  war?: 'WW1' | 'WW2' | 'both';
}

// Filter state
export interface Filters {
  war: 'all' | 'WW1' | 'WW2';
  country: 'all' | 'Germany' | 'USA' | 'UK' | 'Japan' | 'USSR' | 'France';
}
