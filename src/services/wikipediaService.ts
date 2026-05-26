import { WikiSummary } from '../types';

const WIKI_BASE = 'https://en.wikipedia.org';

// Get a single article summary by exact title
export const getWikiSummary = async (searchTerm: string): Promise<WikiSummary | null> => {
  try {
    const encoded = encodeURIComponent(searchTerm);
    const url = `${WIKI_BASE}/api/rest_v1/page/summary/${encoded}`;
    const response = await fetch(url);
    if (!response.ok) return null;
    const data: WikiSummary = await response.json();
    return data;
  } catch (error) {
    console.error('Wikipedia summary error:', error);
    return null;
  }
};

// Search Wikipedia and return the best matching title
export const searchWiki = async (searchTerm: string): Promise<string | null> => {
  try {
    const encoded = encodeURIComponent(searchTerm);
    const url = `${WIKI_BASE}/w/api.php?action=query&list=search&srsearch=${encoded}&format=json&origin=*`;
    const response = await fetch(url);
    if (!response.ok) return null;
    const data = await response.json();
    const results = data?.query?.search;
    if (!results || results.length === 0) return null;
    return results[0].title;   // Best match title
  } catch (error) {
    console.error('Wikipedia search error:', error);
    return null;
  }
};

// Combined: search then fetch summary
export const fetchWikiData = async (searchTerm: string): Promise<WikiSummary | null> => {
  const bestTitle = await searchWiki(searchTerm);
  if (!bestTitle) return null;
  return getWikiSummary(bestTitle);
};
