import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { videos } from '@/db/schema';


export async function GET(req: NextRequest) {
  try {
    const video = await db.select().from(videos);
    return NextResponse.json(video);
  } catch (error) {
    console.error('Error fetching video details:', error);
    return NextResponse.json({ error: 'Failed to fetch video details' }, { status: 500 });
  }
}