import Image from "next/image";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Skill Builder AI",
  description: "Master Your Path to IT Excellence",
  icons: {
    icon: "/logo.svg",
  }
};

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Ellipses background */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#b3b5fd] opacity-50 rounded-full filter blur-3xl z-0"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#b3b5fd] opacity-50 rounded-full filter blur-3xl z-0"></div>
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#b3b5fd] opacity-50 rounded-full filter blur-3xl z-0"></div>

      <div className="relative z-10 min-h-screen flex flex-col md:flex-row items-center justify-center mx-6 lg:mx-16 xl:mx-32">
        {/* About section */}
        <div className="flex flex-col space-y-6 order-2 md:order-1">
          <p className="flex flex-col text-center font-hammer text-3xl text-[#535cf9] lg:text-4xl lg:text-start xl:text-5xl">
            Master Your Path to IT Excellence
          </p>
          <p className="text-center text-xl font-semibold lg:text-2xl lg:text-start xl:text-3xl">
            Your personalized companion to discover, develop, and master the{" "}
            <span className="text-[#535cf9]">IT skills</span> you need for
            tomorrow&apos;s opportunities.
          </p>

          <div className="flex flex-col justify-center items-center lg:items-start">
            <Button className="w-3/5 md:w-2/5 xl:w-1/5 xl:text-2xl lg:text-xl text-lg mt-8 p-6">
              <Link href="/predict"> Get Started</Link>
            </Button>
          </div>
        </div>
        {/* Logo section */}
        <div className="order-1 md:order-2 flex justify-center">
          <Image
            src="/logo.svg"
            alt="SkillBuilderAI"
            width={1080}
            height={1080}
          />
        </div>
      </div>
    </main>
  );
}
