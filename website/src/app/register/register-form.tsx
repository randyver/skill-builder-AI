"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const RegisterSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof RegisterSchema>;

export default function RegisterForm() {
  const router = useRouter();

  const methods = useForm<FormValues>({
    resolver: zodResolver(RegisterSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const toastId = toast.loading("Registering...");
    
    const response = await fetch(`/api/auth/register`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (response.ok) {
      toast.success("Registration successful", { id: toastId });
      router.push("/login");
    } else {
      toast.error("Registration failed", { id: toastId });
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto lg:mt-32">
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
          <CardTitle className="text-center text-[#535cf9] lg:text-3xl xl:text-4xl">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                name="name"
                control={methods.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#535cf9] lg:text-lg xl:text-xl">Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="border-[#535cf9] text-black placeholder:text-gray-500"
                        type="text"
                        placeholder="Name"
                      />
                    </FormControl>
                    {errors.name && (
                      <FormMessage className="text-red-600">{errors.name.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={methods.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#535cf9] lg:text-lg xl:text-xl">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="border-[#535cf9] text-black placeholder:text-gray-500"
                        type="email"
                        placeholder="Email"
                      />
                    </FormControl>
                    {errors.email && (
                      <FormMessage className="text-red-600">{errors.email.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={methods.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#535cf9] lg:text-lg xl:text-xl">Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="border-[#535cf9] text-black placeholder:text-gray-500"
                        type="password"
                        placeholder="Password"
                      />
                    </FormControl>
                    {errors.password && (
                      <FormMessage className="text-red-600">{errors.password.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <Button type="submit" className="bg-[#535cf9] text-white hover:bg-[#4348e1] lg:text-lg xl:text-xl">Register</Button>
            </form>
          </Form>
          <p className="text-center mt-4 lg:text-lg xl:text-xl">
            Have an account? <Link href="/login" className="text-[#535cf9]">Login</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
