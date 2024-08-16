import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { db } from '@/db/drizzle';
import { users } from '@/db/schema';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    // validate name, email, password, and phone
    console.log({ name, email, password });

    const hashedPassword = await hash(password, 10);

    await db.insert(users).values({
      name: name,
      email: email,
      password: hashedPassword,
    })


  } catch (e) {
    console.log({ e });
    return NextResponse.json({ message: 'error', error: (e as Error).message }, { status: 500 });
  }

  return NextResponse.json({ message: 'success' });
}
