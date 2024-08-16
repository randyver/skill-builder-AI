import LoginForm from "./login-form";
import Image from "next/image";

export default async function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-[600px] mx-12">
      <div className="w-1/2 hidden lg:block">
        <Image
          src="/login-icon.svg"
          alt="login-icon"
          width={800}
          height={800}
        />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
}
