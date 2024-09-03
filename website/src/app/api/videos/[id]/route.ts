import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { db } from '@/db/drizzle';
import { videos } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  const url = new URL(req.nextUrl);
  const id = url.pathname.split('/').pop();

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: 'Invalid video ID' }, { status: 400 });
  }

  const videoId = Number(id);

  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const video = await db.select().from(videos).where(eq(videos.id, videoId));

    if (video.length === 0) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    return NextResponse.json(video[0]);
  } catch (error) {
    console.error('Error fetching video details:', error);
    return NextResponse.json({ error: 'Failed to fetch video details' }, { status: 500 });
  }
}
