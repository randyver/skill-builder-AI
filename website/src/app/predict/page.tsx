import PredictForm from "./form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { db } from '@/db/drizzle';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export default async function PredictPage() {
  const session = await getServerSession();
  
  if (!session) {
    redirect('/login');
  }

  const user = await db.select().from(users).where(eq(users.email, session.user.email)).then(result => result[0]);

  if (!user) {
    redirect('/login');
  }

  return <PredictForm user_id={user.id} />;
}
