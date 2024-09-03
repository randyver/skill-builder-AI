import { NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { result } from '@/db/schema';
import { and, eq } from 'drizzle-orm';

export async function POST(request: Request, { params }: { params: { userID: string, resultID: string } }) {
  const { userID, resultID } = params;

  try {
    const data = await request.json();

    // Insert the result into the database
    await db.insert(result).values({
      result_id: resultID,
      user_id: parseInt(userID),
      field: data.field,
    });

    return NextResponse.json({ message: 'Result saved successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error saving result:', error);
    return NextResponse.json({ error: 'Failed to save result' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const pathSegments = url.pathname.split('/').filter(Boolean);

  const userID = pathSegments[2];
  const resultID = pathSegments[3];

  try {
    const resultData = await db.select().from(result).where(and(eq(result.user_id, parseInt(userID)), eq(result.result_id, resultID)));

    if (!resultData) {
      return NextResponse.json({ error: 'Result not found' }, { status: 404 });
    }

    return NextResponse.json(resultData);
  } catch (error) {
    console.error('Error fetching result:', error);
    return NextResponse.json({ error: 'Failed to fetch result' }, { status: 500 });
  }
}
