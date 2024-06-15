import { NextRequest, NextResponse } from 'next/server';
import xml2js from 'xml2js';
import he from 'he';

export async function GET(req: NextRequest) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  try {
    const response = await fetch('https://antiochian.org/api/antiochian/ThoughtForTheDayRssV2', {
      cache: 'no-store'
    });
    if (!response.ok) throw new Error('Failed to fetch daily quote');

    const text = await response.text();
    const result = await xml2js.parseStringPromise(text);

    const quoteDescription = result.rss.channel[0].item[0].description[0];
    const quoteLink = result.rss.channel[0].item[0].link[0];

    return NextResponse.json({
      text: he.decode(quoteDescription),
      link: quoteLink
    }, { headers });
  } catch (error: any) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500, headers });
  }
}
