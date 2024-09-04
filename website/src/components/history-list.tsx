"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";

interface FieldData {
  field: string;
  userId: string;
  resultId: string;
  description: string;
  url_image: string;
}

export default function HistoryList() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<FieldData[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("/api/history", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch history");
        }
        const fieldsResponse = await fetch("/api/fields", {
          method: "GET",
        });
        if (!fieldsResponse.ok) {
          throw new Error("Failed to fetch field details");
        }

        const historyData: FieldData[] = await response.json();
        const fieldsData: FieldData[] = await fieldsResponse.json();

        // Create a Map to ensure unique fields
        const fieldMap = new Map<string, FieldData>();

        historyData.forEach((data) => {
          const fieldDetail = fieldsData.find((f) => f.field === data.field);
          if (fieldDetail) {
            fieldMap.set(data.field, {
              ...data,
              description: fieldDetail.description,
              url_image: fieldDetail.url_image,
            });
          }
        });
        

        setHistory(Array.from(fieldMap.values()));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching history:", error);
        setError("Failed to fetch history");
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

   if (loading) return <div className="flex justify-center items-center mt-20 text-gray-700 text-lg">Loading...</div>;
  if (error) return <div className="flex justify-center items-center mt-20 text-red-500 text-lg">{error}</div>;

  return (
    <main className="flex flex-col items-center min-h-screen py-10">
      <h1 className="text-3xl font-bold text-blue-600 mb-8 font-hammer">History</h1>
      <div className="grid gap-6 max-w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {history.map((fieldData, index) => (
          <Link
            key={index}
            href={`/result/${fieldData.userId}/${fieldData.resultId}`}
            passHref
          >
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center gap-4">
                <Image
                  src={fieldData.url_image}
                  alt={fieldData.field}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <CardTitle>{fieldData.field}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
