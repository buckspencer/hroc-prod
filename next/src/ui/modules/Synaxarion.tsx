'use client';
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import css from './Synaxarion.module.css';

interface Story {
  title: string;
  story: string;
}

interface CalendarData {
  stories: Story[];
}

export default function Synaxarion() {
  const [loading, setLoading] = useState(true);
  const [calendarData, setCalendarData] = useState<CalendarData | null>(null);
  const [currentSaintIndex, setCurrentSaintIndex] = useState(0);

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

  const handleSaintClick = (index: number) => {
    setCurrentSaintIndex(index);
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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-lg">
        <dl className="my-8 space-y-3 text-base leading-7 text-gray-600">
          {calendarData?.stories.map((story, index) => (
            <div key={index} className="relative text-center">
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
          <h1 className="mt-2 mb-7 text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {calendarData?.stories[currentSaintIndex]?.title}
          </h1>
          <div className="prose max-w-none text-slate-900 w-full font-serif">
            <div
              dangerouslySetInnerHTML={{
                __html: calendarData?.stories[currentSaintIndex]?.story || '', // Provide fallback here
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
