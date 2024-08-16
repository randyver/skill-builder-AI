import { getServerSession } from "next-auth";
import RegisterForm from "./register-form";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function RegisterPage() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return (
    <div className="flex justify-center items-center min-h-[600px] mx-12">
      <div className="w-1/2 hidden lg:block ml-12 xl:ml-20 xl:mt-16">
        <Image
          src="/register-icon.svg"
          alt="register-icon"
          width={500}
          height={500}
          className="lg:w-4/5 xl:w-3/5"
        />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
        <RegisterForm />
      </div>
    </div>
  );
}
