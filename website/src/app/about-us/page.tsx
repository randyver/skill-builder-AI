import Image from "next/image";

export default function AboutUs() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Ellipses background */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#b3b5fd] opacity-50 rounded-full filter blur-3xl z-0"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#b3b5fd] opacity-50 rounded-full filter blur-3xl z-0"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#b3b5fd] opacity-50 rounded-full filter blur-3xl z-0"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center p-4">
        <h1 className="text-5xl font-bold mb-4 font-hammer text-blue-600">About Us</h1>
        <p className="text-lg mb-8">
          This website has been developed by:
        </p>
        <div className="mb-8 list-disc list-inside">
          <p className="text-lg">Emery Fathan Zwageri (Left - AI Engineer)</p>
          <p className="text-lg">Randy Verdian (Center - Fullstack Developer)</p>
          <p className="text-lg">Muhammad Al Thariq Fairuz (Right - AI Engineer)</p>
        </div>
        <Image src="/team.png" alt="Team Members" width={500} height={500} className="rounded-lg shadow-lg" />
      </div>
    </main>
  );
}
