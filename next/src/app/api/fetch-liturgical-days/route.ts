import { NextRequest, NextResponse } from 'next/server';
import xml2js from 'xml2js';
import he from 'he';

export async function GET(req: NextRequest) {
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');

  try {
    const response = await fetch('https://antiochian.org/api/antiochian/LiturgicalDaysRssV2', {
      cache: 'no-store'
    });
    if (!response.ok) throw new Error('Failed to fetch liturgical days');

    const text = await response.text();
    const result = await xml2js.parseStringPromise(text);

    const liturgicalDays = result.rss.channel[0].item.map((item: any) => {
      const readings = [];
      for (let i = 1; i <= 10; i++) {
        const readingTitle = item[`cns:Reading${i}Title`];
        const readingFullText = item[`cns:Reading${i}FullText`];
        if (readingTitle && readingFullText) {
          readings.push({
            title: he.decode(readingTitle[0]),
            fullText: he.decode(readingFullText[0])
          });
        } else {
          break;
        }
      }
      return {
        title: he.decode(item.title[0]),
        link: item.link[0],
        dailyIcon: item["cns:DailyIcon"][0],
        feastDayTitle: he.decode(item["cns:FeastDayTitle"][0]),
        fastDesignation: he.decode(item["cns:FastDesignation"][0]),
        feastDayDescription: he.decode(item["cns:FeastDayDescription"][0]),
        readings
      };
    });

    return NextResponse.json(liturgicalDays, { headers });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500, headers });
  }
}

export function OPTIONS() {
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return new Response(null, { status: 204, headers });
}
