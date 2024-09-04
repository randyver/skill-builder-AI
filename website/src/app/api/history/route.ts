import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { db } from '@/db/drizzle';
import { users } from '@/db/schema';
import { result } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const user = await db.select().from(users).where(eq(users.email, session.user.email));
    const userId = user[0].id;

    const results = await db.select().from(result).where(eq(result.user_id, userId));

    const resultData = results.map(r => ({
      field: r.field,
      userId: r.user_id,
      resultId: r.result_id
    }));

    return NextResponse.json(resultData);
  } catch (error) {
    console.error('Error fetching user results:', error);
    return NextResponse.json({ error: 'Failed to fetch user results' }, { status: 500 });
  }
}
