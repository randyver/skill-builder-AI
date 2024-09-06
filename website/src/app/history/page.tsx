import HistoryList from "@/components/history-list";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function HistoryPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <main>
      <main className="relative min-h-screen overflow-hidden">
        {/* Ellipses background */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#b3b5fd] opacity-50 rounded-full filter blur-3xl z-0"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#b3b5fd] opacity-50 rounded-full filter blur-3xl z-0"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#b3b5fd] opacity-50 rounded-full filter blur-3xl z-0"></div>

        <div className="relative z-10 flex justify-center items-center">
          <HistoryList />
        </div>
      </main>
    </main>
  );
}
