'use client';
import React, { useState, useEffect } from 'react';

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

export default function DailyPassage({ }: Partial<{}>) {
  const [liturgicalDays, setLiturgicalDays] = useState<LiturgicalDay[]>([]);
  const [selectedReading, setSelectedReading] = useState(0); // Default to show the first reading

  useEffect(() => {
    const fetchLiturgicalData = async () => {
      try {
        const response = await fetch('/api/fetch-liturgical-days');
        const data = await response.json();
        setLiturgicalDays(data);
      } catch (error) {
        console.error('Error fetching liturgical days:', error);
      }
    };

    fetchLiturgicalData();
  }, []); // Empty dependency array ensures this effect runs once on component mount

  return (
    <>
      <div className="section flex w-full flex-col">
        {liturgicalDays.map((day, index) => (
          <div id={`daily-reading-${index}`} key={index}>
            <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-6">
              <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-6">
                <div className="flex-1 sm:mb-0 flex flex-col space-y-2 items-center">
                  <p className="text-sm text-red-900/80">-Readings-</p>
                  <div className="space-y-4">
                    {day.readings.map((reading, idx) => (
                      <div key={idx}>
                        <a
                          href="#"
                          className={`block font-semibold hover:text-red-700/80 ${selectedReading === idx ? 'text-red-900/80' : 'text-slate-800'}`}
                          onClick={(e) => { e.preventDefault(); setSelectedReading(idx); }}
                        >
                          {reading.title}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-1 flex flex-col space-y-2 items-center">
                  <a className="text-sm text-red-900/80" rel="noopener noreferrer" target="_blank" href="https://www.antiochian.org/liturgicday">
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
            </div>

            <div className="my-8">
              <div>
                <div>
                  <p className="leading-7 font-serif text-red-900/80">{day.readings[selectedReading].title}</p>
                  <p className="prose max-w-none text-slate-800 text-md text-base font-serif">{day.readings[selectedReading].fullText}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
