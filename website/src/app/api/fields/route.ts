import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { db } from '@/db/drizzle';
import { fields } from '@/db/schema';

export async function GET(req: NextRequest) {
  try {
    const field = await db.select().from(fields);
    return NextResponse.json(field);
  } catch (error) {
    console.error('Error fetching field details:', error);
    return NextResponse.json({ error: 'Failed to fetch field details' }, { status: 500 });
  }
}