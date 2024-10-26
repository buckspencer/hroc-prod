'use client';
import React, { useState } from 'react';
import BibleSearch from './BibleSearch'; 
import Synaxarion from './Synaxarion';
import LiturgicalReadings from './LiturgicalReadings';


// Define the structure of a search result
interface SearchResult {
  id: string; // Assuming there's an ID for each search result
  reference: string; // Reference of the passage
  content?: string; // Optional HTML content of the passage
  text?: string; // Fallback if content is not present
}

export default function DailyPassage() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]); // Specify the type for search results
  const [showBibleSearch, setShowBibleSearch] = useState(false);
  const [showSynaxarion, setShowSynaxarion] = useState(false);
  const [showLiturgicalReadings, setShowLiturgicalReadings] = useState(true);


  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const toggleBibleSearch = () => {
    setShowBibleSearch((prev) => !prev);
  };

  const toggleLiturgicalReadings = () => {
    setShowLiturgicalReadings((prev) => !prev);
  };

  const handleSearchSubmit = (results: SearchResult[]) => {
    setSearchResults(results);
  };


  return (
    <>
      <div className="section mx-auto max-w-7xl w-full flex flex-col px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Clickable <p> tag to toggle BibleSearch */}
          <p 
            onClick={toggleBibleSearch} 
            className="my-6 text-2xl leading-8 text-slate-700 cursor-pointer"
          >
            - Gospel Search -
          </p>

          {/* Conditionally render the BibleSearch component */}
          {showBibleSearch && (
            <BibleSearch onSearchSubmit={handleSearchSubmit} />
          )}

          <p 
            onClick={toggleLiturgicalReadings} 
            className="my-8 text-2xl leading-8 text-slate-700 cursor-pointer"
          >
            - Today's Liturgical Reading -
            <sub className="block text-base text-gray-500 mt-1">{today}</sub>
          </p>
          {showLiturgicalReadings && (
            <LiturgicalReadings />
          )}

          <p 
            onClick={() => setShowSynaxarion((prev) => !prev)} 
            className="my-8 text-2xl leading-8 text-slate-700 cursor-pointer"
          >
            - Synaxarion -
          </p>

          {/* Conditionally render the Synaxarion section */}
          {showSynaxarion && (
            <div className="my-8 text-center">
              <Synaxarion />
            </div>
          )}
        </div>
      </div>
      
      <div className="text-xs text-center font-serif text-red-900/40">
        Daily Reading by
        <a href={"https://www.antiochian.org/liturgicday"} target="_blank" rel="noreferrer" className="hover:underline">
          <span> Antiochian Archdiocese</span>
        </a>
        &nbsp; | &nbsp; 
        Today's Saints by
        <a href={"https://orthocal.info/"} target="_blank" rel="noreferrer" className="hover:underline">
          <span> Orthocal.info</span>
        </a>
        &nbsp; | &nbsp; 
        Search provided by
        <a href={"https://docs.api.bible/"} target="_blank" rel="noreferrer" className="hover:underline">
          <span> Bible API</span>
        </a>
      </div>
    </>
  );
}
