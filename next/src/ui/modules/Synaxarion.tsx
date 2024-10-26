'use client';
import React, { useState } from 'react';

interface Story {
  title: string;
  story: string;
}

interface CalendarData {
  stories: Story[];
}

interface SynaxarionProps {
  calendarData: CalendarData | null;
}

const Synaxarion: React.FC<SynaxarionProps> = ({ calendarData }) => {
  const [currentSaintIndex, setCurrentSaintIndex] = useState(0);

  const handleSaintClick = (index: number) => {
    setCurrentSaintIndex(index);
  };

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
          <h1 className="mt-2 mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
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

export default Synaxarion;
