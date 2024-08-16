'use client';

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Define zod schema
const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof LoginSchema>;

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(LoginSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const toastId = toast.loading('Logging in...');
  
    const response = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
  
    if (!response?.error) {
      toast.success('Login successful', { id: toastId });
      router.push('/');
      router.refresh();
    } else {
      toast.error('Login failed. Please check your credentials.', { id: toastId });
    }
  };

  return (
    <Card className="w-full border-[#535cf9] md:w-6/12 lg:w-5/12 xl:w-3/12">
      <CardHeader>
        <CardTitle className="text-center text-[#535cf9]">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mx-auto max-w-md"
          data-testid="login-form"
        >
          <div className="flex flex-col mb-4">
            <label className="text-[#535cf9]">Email</label>
            <Input
              {...register('email')}
              className="border-[#535cf9] text-black placeholder:text-gray-500"
              type="email"
              placeholder="Email"
              data-testid="email-input"
            />
            {errors.email && <span className="text-red-600">{errors.email.message}</span>}
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-[#535cf9]">Password</label>
            <Input
              {...register('password')}
              className="border-[#535cf9] text-black placeholder:text-gray-500"
              type="password"
              placeholder="Password"
              data-testid="password-input"
            />
            {errors.password && <span className="text-red-600">{errors.password.message}</span>}
          </div>
          <Button type="submit" className="bg-[#535cf9] text-white hover:bg-[#4348e1]" data-testid="login-button">Login</Button>
        </form>
        <p className="text-center mt-4">
          Don&apos;t have an account yet? <Link href="/register" className="text-[#535cf9]">Register</Link>
        </p>
      </CardContent>
    </Card>
  );
}
