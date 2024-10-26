'use client';
import React, { useState, useEffect } from 'react';

// Define the structure of a Bible version
interface BibleVersion {
  id: string;
  name: string;
  abbreviationLocal: string;
}

// Define the structure of a search result item
interface SearchResultItem {
  id: string; // Assuming that each search result item has an ID
  reference: string; // Reference like "John 3:16"
  content?: string; // Content of the verse or passage (optional)
  text?: string; // Alternative text representation (optional)
}

// Define the props for the BibleSearch component
interface BibleSearchProps {
  onSearchSubmit: (results: SearchResultItem[]) => void; // Function to handle search results
}

// Define the component
export default function BibleSearch({ onSearchSubmit }: BibleSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVersion, setSelectedVersion] = useState<string>('de4e12af7f28f599-01'); // Default to King James Bible
  const [versions, setVersions] = useState<BibleVersion[]>([]); // Specify the type here
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]); // Specify type for search results
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVersions = async () => {
      const apiKey = process.env.NEXT_PUBLIC_BIBLE_API;
      if (!apiKey) {
        console.error('API key is not defined.');
        setError('Unable to load versions. Please check your API key.');
        return;
      }

      const headers = {
        accept: 'application/json',
        'api-key': apiKey,
      };

      try {
        const response = await fetch('https://api.scripture.api.bible/v1/bibles', { headers });
        if (!response.ok) throw new Error('Failed to fetch versions.');
        const data = await response.json();
        setVersions(data.data); // Assuming data.data is the array of versions
      } catch (err) {
        console.error('Error fetching versions:', err);
        setError('Unable to load versions. Please try again later.');
      }
    };

    fetchVersions();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(titleize(event.target.value)); // Allow spaces by not using trim()
  };

  const handleVersionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVersion(event.target.value);
  };

  const titleize = (str: string) => {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleSearchSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchQuery) return;

    const formattedQuery = titleize(searchQuery);

    const url = `https://api.scripture.api.bible/v1/bibles/${selectedVersion}/search?query=${encodeURIComponent(formattedQuery)}&offset=0&limit=10&sort=canonical`;
    const apiKey = process.env.NEXT_PUBLIC_BIBLE_API;

    if (!apiKey) {
      console.error('API key is not defined.');
      setError('Unable to perform search. Please check your API key.');
      return;
    }

    const headers = {
      accept: 'application/json',
      'api-key': apiKey,
    };

    try {
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error('Failed to fetch search results.');
      const data = await response.json();

      const results: SearchResultItem[] = data.data.passages || data.data.verses || [];
      setSearchResults(results);
      setError(null);
      onSearchSubmit(results); // Call the onSearchSubmit prop with results
    } catch (err) {
      setError('Unable to find results. Please try again.');
      console.error('Search error:', err);
    }
  };

  const handleClearResults = () => {
    setSearchQuery('');
    setSearchResults([]);
    setError(null);
  };

  return (
    <div className="text-center max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 mb-12">
      <form onSubmit={handleSearchSubmit} className="flex justify-center items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search the Bible..."
          className="border rounded-lg p-2 text-center"
        />

        <select
          value={selectedVersion}
          onChange={handleVersionChange}
          className="border rounded-lg p-2 mx-2 w-48"
        >
          {versions.map((version) => (
            <option key={version.id} value={version.id}>
              {selectedVersion === version.id 
                ? `${version.name} (${version.abbreviationLocal})` 
                : version.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-red-700"
        >
          Search
        </button>

        <button
          type="button"
          onClick={handleClearResults}
          className="ml-2 px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
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
                className="text-gray-700"
                dangerouslySetInnerHTML={{ __html: item.content || item.text || '' }} // Added fallback
              />
            </div>
          ))
        ) : (
          <p className="text-gray-600">No results found.</p> // Provide a message when no results
        )}
      </div>
    </div>
  );
}
