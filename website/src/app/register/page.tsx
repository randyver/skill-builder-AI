import { getServerSession } from 'next-auth';
import RegisterForm from './register-form';
import { redirect } from 'next/navigation';
import { type Metadata } from "next";

export default async function RegisterPage() {
  const session = await getServerSession();
  if (session) {
    redirect('/');
  }
  return(
    <div className='flex justify-center items-center min-h-[600px]'>
      <RegisterForm />
    </div>
  )
}