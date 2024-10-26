'use client';
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import css from './DailyPassage.module.css';
import BibleSearch from './BibleSearch'; 
import Synaxarion from './Synaxarion';
import LiturgicalReadings from './LiturgicalReadings';

// Define the structure of a story
interface Story {
  title: string;
  story: string;
}

// Define the structure of calendar data
interface CalendarData {
  stories: Story[];
}

// Define the structure of a search result
interface SearchResult {
  id: string; // Assuming there's an ID for each search result
  reference: string; // Reference of the passage
  content?: string; // Optional HTML content of the passage
  text?: string; // Fallback if content is not present
}

export default function DailyPassage() {
  const [loading, setLoading] = useState(true);
  const [calendarData, setCalendarData] = useState<CalendarData | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]); // Specify the type for search results
  const [showBibleSearch, setShowBibleSearch] = useState(false);
  const [showSynaxarion, setShowSynaxarion] = useState(false);
  const [showLiturgicalReadings, setShowLiturgicalReadings] = useState(true);

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const response = await fetch(
          "https://orthocal.info/api/gregorian/",
          {
            next: { revalidate: 3600 },
            cache: "no-store"
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCalendarData(data);
      } catch (error) {
        console.error("Error fetching calendar data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCalendarData();
  }, []);

  const toggleBibleSearch = () => {
    setShowBibleSearch((prev) => !prev); // Toggle the visibility of the BibleSearch component
  };

  const toggleLiturgicalReadings = () => {
    setShowLiturgicalReadings((prev) => !prev); // Toggle the visibility of the LiturgicalReadings component
  };

  // Specify the type for results
  const handleSearchSubmit = (results: SearchResult[]) => {
    setSearchResults(results);
  };

  if (loading) {
    return (
      <p className="py-6 text-center text-slate-600 text-lg">
        Requesting readings
        <span className={cn(css.dots)}> ...</span>
      </p>
    );
  }

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
            className="my-8 text-2xl leading-8 text-slate-700 cursor-pointer">
            - Today's Liturgical Reading -
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
          {showSynaxarion && calendarData && (
            <div className="my-8 text-center">
              <Synaxarion calendarData={calendarData} />
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
