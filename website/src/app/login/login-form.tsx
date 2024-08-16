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
    <div className="relative w-full max-w-md mx-auto lg:mt-20">
      {/* Gradient Circles */}
      <div className="absolute top-[-40px] left-[-40px] w-24 h-24 md:w-32 md:h-32 xl:w-48 xl:h-48 md:top-[-72px] md:left-[-72px] xl:top-[-120px] xl:left-[-120px] bg-gradient-to-r from-[#535cf9] to-[#a0baff] rounded-full z-[1]"></div>
      <div className="absolute bottom-[-40px] right-[-40px] md:bottom-[-50px] md:right-[-50px] w-16 h-16 md:w-24 md:h-24 xl:w-32 xl:h-32 xl:right-[-80px] xl:bottom-[-80px] bg-gradient-to-r from-[#535cf9] to-[#a0baff] rounded-full z-[1]">
        {/* Smaller Circle */}
        <div className="absolute bottom-[-12px] right-[-12px] w-8 h-8 md:w-12 md:h-12 xl:w-16 xl:h-16 bg-gradient-to-r from-[#535cf9] to-[#a0baff] rounded-full z-[2]"></div>
      </div>

      {/* Blurred Circles */}
      <div className="absolute top-[-80px] left-[-80px] w-48 h-48 md:w-56 md:h-56 xl:w-72 xl:h-72 bg-[#535cf9] opacity-30 rounded-full blur-2xl z-[-1]"></div>
      <div className="absolute bottom-[-80px] right-[-80px] w-36 h-36 md:w-48 md:h-48 xl:w-56 xl:h-56 bg-[#535cf9] opacity-30 rounded-full blur-2xl z-[-1]"></div>

      <Card className="relative border-[#535cf9] z-[0]">
        <CardHeader>
          <CardTitle className="text-center text-[#535cf9] lg:text-3xl xl:text-4xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 mx-auto max-w-md lg:text-lg xl:text-xl"
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
            <Button type="submit" className="bg-[#535cf9] text-white hover:bg-[#4348e1] lg:text-lg xl:text-xl" data-testid="login-button">Login</Button>
          </form>
          <p className="text-center mt-4 lg:text-lg xl:text-xl">
            Don&apos;t have an account yet? <Link href="/register" className="text-[#535cf9]">Register</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
