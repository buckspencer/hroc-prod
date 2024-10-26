'use client';
import React, { useState, useEffect } from 'react';
import { processBibleAPI } from '@/lib/processBibleAPI';

// Define the structure of a Bible version
interface BibleVersion {
  id: string;
  name: string;
  abbreviationLocal: string;
}

// Define the structure of a search result item
interface SearchResultItem {
  id: string;
  reference: string;
  content?: string;
  text?: string;
}

// Define the props for the BibleSearch component
interface BibleSearchProps {
  onSearchSubmit: (results: SearchResultItem[]) => void;
}

// Define the component
export default function BibleSearch({ onSearchSubmit }: BibleSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVersion, setSelectedVersion] = useState<string>('de4e12af7f28f599-01');
  const [versions, setVersions] = useState<BibleVersion[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVersions = async () => {
      const apiKey = process.env.NEXT_PUBLIC_BIBLE_API;
      if (!apiKey) {
        setError('Unable to load versions. Please check your API key.');
        return;
      }

      try {
        const response = await fetch('https://api.scripture.api.bible/v1/bibles', {
          headers: {
            accept: 'application/json',
            'api-key': apiKey as string, // Ensure apiKey is a string
          },
        });
        if (!response.ok) throw new Error('Failed to fetch versions.');
        const data = await response.json();
        setVersions(data.data);
      } catch (err) {
        setError('Unable to load versions. Please try again later.');
      }
    };

    fetchVersions();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(titleize(event.target.value));
  };

  const handleVersionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVersion(event.target.value);
  };

  const titleize = (str: string) => str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

  const handleSearchSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchQuery) return;

    const url = `https://api.scripture.api.bible/v1/bibles/${selectedVersion}/search?query=${encodeURIComponent(
      searchQuery
    )}&offset=0&limit=10&sort=canonical`;
    const apiKey = process.env.NEXT_PUBLIC_BIBLE_API;

    try {
      const response = await fetch(url, {
        headers: {
          accept: 'application/json',
          'api-key': apiKey as string, // Ensure apiKey is a string
        },
      });
      if (!response.ok) throw new Error('Failed to fetch search results.');
      const data = await response.json();
      const results: SearchResultItem[] = data.data.passages || data.data.verses || [];

      // Process the content before setting search results
      const processedResults = await Promise.all(results.map(async result => {
        const bibleProcessor = new processBibleAPI(result.content || result.text || ''); // Create an instance
        return {
          ...result,
          content: bibleProcessor.process(), // Call the instance method
        };
      }));

      setSearchResults(processedResults);
      setError(null);
      onSearchSubmit(processedResults);
    } catch {
      setError('Unable to find results. Please try again.');
    }
  };

  const handleClearResults = () => {
    setSearchQuery('');
    setSearchResults([]);
    setError(null);
  };

  return (
    <div className="text-center max-w-7xl mb-12">
      <form onSubmit={handleSearchSubmit} className="flex justify-center items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search the Bible..."
          className="border rounded-lg p-1 text-center w-40"
        />

        <select
          value={selectedVersion}
          onChange={handleVersionChange}
          className="border rounded-lg p-1 mx-1 w-28"
        >
          {versions.map((version) => (
            <option key={version.id} value={version.id}>
              {version.name}
            </option>
          ))}
        </select>

        <button type="submit" className="px-2 py-1 bg-yellow-600 text-white rounded-lg hover:bg-red-700 text-sm">
          Search
        </button>

        <button
          type="button"
          onClick={handleClearResults}
          className="ml-1 px-2 py-1 bg-gray-300 text-black rounded-lg hover:bg-gray-400 text-sm"
        >
          Clear
        </button>
      </form>

      <div className="mt-8">
        {error ? (
          <p className="text-red-600">{error}</p>
        ) : searchResults.length > 0 ? (
          searchResults.map((item) => (
            <div key={item.id} className="mb-4">
              <h2 className="font-bold text-lg">{item.reference}</h2>
              <div
                className="prose prose-sm text-gray-700 space-y-2" // Tailwind Prose for readability
                dangerouslySetInnerHTML={{
                  __html: item.content || item.text || '',
                }}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-600">No results found.</p>
        )}
      </div>
    </div>
  );
}
