'use client';
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils'
import css from './DailyPassage.module.css'

interface LiturgicalDay {
  title: string;
  link: string;
  dailyIcon: string;
  feastDayTitle: string;
  fastDesignation: string;
  feastDayDescription: string;
  readings: {
    title: string;
    fullText: string;
  }[];
}

interface CalendarData {
  stories: {
    title: string;
    story: string;
  }[];
}

export default function DailyPassage({ }: Partial<{}>) {
  const [liturgicalDays, setLiturgicalDays] = useState<LiturgicalDay[]>([]);
  const [selectedReading, setSelectedReading] = useState(0); // Default to show the first reading
  const [loading, setLoading] = useState(true); // Loading state
  const [calendarData, setCalendarData] = useState<CalendarData | null>(null); // Calendar data state
  const [currentSaintIndex, setCurrentSaintIndex] = useState(0);
  const [focusSaint, setFocusSaint] = useState(false);

  useEffect(() => {
    const fetchLiturgicalData = async () => {
      try {
        const response = await fetch('/api/fetch-liturgical-days');
        const data = await response.json();
        setLiturgicalDays(data);
      } catch (error) {
        console.error('Error fetching liturgical days:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

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
        setCalendarData(data); // Set the fetched calendar data
      } catch (error) {
        console.error("Error fetching calendar data:", error);
      }
    };

    fetchLiturgicalData();
    fetchCalendarData();
  }, []); // Empty dependency array ensures this effect runs once on component mount

  // Define the click handler inside the component
  const handleSaintClick = (index: number) => {
    setCurrentSaintIndex(index);
    setFocusSaint(true);
  };

  if (loading) {
    return (
      <p className="py-6 text-center text-slate-600 text-lg">
        Requesting readings
        <span className={cn(css.dots)}> ...</span>
      </p>
    ); // Render loading text
  }

  return (
    <>
      <div className="section mx-auto max-w-7xl w-full flex flex-col px-4 sm:px-6 lg:px-8">
      <p className="my-8 text-2xl leading-8 text-slate-700 text-center">- Today's Liturgical Reading -</p>
        {liturgicalDays.map((day, index) => (
          <div id={`daily-reading-${index}`} key={index}>
            <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-6">
              <div className="flex-1 sm:mb-0 flex flex-col space-y-2 items-center">
                <p className="text-sm text-red-900/80">-Readings-</p>
                <div className="space-y-4">
                  {day.readings.map((reading, idx) => (
                    <div key={idx}>
                      <a
                        href="#"
                        className={`block font-semibold hover:text-red-700/80 ${
                          selectedReading === idx ? 'text-red-900/80' : 'text-slate-800'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedReading(idx);
                        }}
                      >
                        {reading.title}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 flex flex-col space-y-2 items-center">
                <a
                  className="text-sm text-red-900/80"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.antiochian.org/liturgicday"
                >
                  -Liturgical Day-
                </a>
                <p className="my-6 text-md text-slate-800 text-center">{day.feastDayTitle}</p>
                <p className="my-6 text-sm text-slate-800 text-center">{day.feastDayDescription}</p>
              </div>
              <div className="flex-1 flex flex-col space-y-2 items-center">
                <p className="text-sm text-red-900/80">-Fast Information-</p>
                <p className="text-lg text-slate-800 text-center w-3/4">{day.fastDesignation}</p>
              </div>
            </div>

            <div className="my-8">
              <div>
                <div>
                  <p className="leading-7 font-serif text-red-900/80">
                    {day.readings[selectedReading].title}
                  </p>
                  <p className="prose max-w-none text-slate-800 text-md text-base font-serif">
                    {day.readings[selectedReading].fullText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {calendarData && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="my-6 text-2xl leading-8 text-slate-700 text-center">- Synaxarion -</p>
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
            <dl className="my-8 max-w-xl space-y-3 text-base leading-7 text-gray-600 lg:max-w-none">
              {calendarData.stories.map((story, index) => (
                <div key={index} className="relative">
                  <dt
                    className={`block font-semibold hover:text-red-700/80 ${
                      currentSaintIndex === index ? 'text-red-900/80' : 'text-slate-800'
                    }`}
                    onClick={() => handleSaintClick(index)}
                    style={{ cursor: 'pointer' }}
                  >
                    <a href="#reading-area">{story.title}</a>
                  </dt>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative py-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 sm:rounded-3xl sm:pt-16 min-h-screen">
            <div className="mb-12 text-base leading-7 text-gray-700 scrollbar w-full">
              <h1 className="mt-2 mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {calendarData.stories[currentSaintIndex]?.title}
              </h1>
              <div className="prose max-w-none text-slate-900 w-full font-serif">
                <div
                  dangerouslySetInnerHTML={{
                    __html: calendarData.stories[currentSaintIndex]?.story,
                  }}
                ></div>
              </div>
            </div>
            <div className="text-xs text-center font-serif text-red-900/60">
              Daily Reading by
              <a href={"https://www.antiochian.org/liturgicday"} target="_blank" rel="noreferrer">
                <p> Antiochian Archdiocese</p>
              </a>
              Today's Saints by
              <a href={"https://orthocal.info/"} target="_blank" rel="noreferrer">
                <p>Orthocal.info</p>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
