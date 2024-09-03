import { NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { result } from '@/db/schema';

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
