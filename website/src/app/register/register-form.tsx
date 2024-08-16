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

// Define zod schema
const RegisterSchema = z.object({
  name: z.string().min(3, "name must be at least 3 characters"),
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
    <Card className="w-full border-[#535cf9] bg-white md:w-6/12 lg:w-5/12 xl:w-3/12">
      <CardHeader>
        <CardTitle className="text-center text-[#535cf9]">Register</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 mx-auto max-w-md"
          >
            <FormField
              name="name"
              control={methods.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#535cf9]">Name</FormLabel>
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
                  <FormLabel className="text-[#535cf9]">Email</FormLabel>
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
                  <FormLabel className="text-[#535cf9]">Password</FormLabel>
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
            <Button type="submit" className="bg-[#535cf9] text-white hover:bg-[#4348e1]">Register</Button>
          </form>
        </Form>
        <p className="text-center mt-4">
          Have an account? <Link href="/login" className="text-[#535cf9]">Login</Link>
        </p>
      </CardContent>
    </Card>
  );
}
