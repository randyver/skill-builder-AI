"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";

interface Video {
  id: string;
  url: string;
}

export default function ResultBox() {
  const { userID, resultID } = useParams();
  const [image, setImage] = useState("");
  const [field, setField] = useState("");
  const [description, setDescription] = useState("");
  const [beginnerVideos, setBeginnerVideos] = useState<Video[]>([]);
  const [advancedVideos, setAdvancedVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch(`/api/result/${userID}/${resultID}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch result details");
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        const field = data[0]?.field;
        setField(field);

        // Fetch field details
        const responseDetail = await fetch(`/api/fields`, {
          method: "GET",
        });

        if (!responseDetail.ok) {
          throw new Error("Failed to fetch field details");
        }

        const dataDetail = await responseDetail.json();
        if (dataDetail.error) {
          throw new Error(dataDetail.error);
        }

        const fieldData = dataDetail.find(
          (fieldData: { field: string }) => fieldData.field === field
        );
        if (!fieldData) {
          throw new Error("Field not found");
        }

        setImage(fieldData.url_image);
        setDescription(fieldData.description);

        // Fetch videos
        const responseVideos = await fetch(`/api/videos`, {
          method: "GET",
        });

        if (!responseVideos.ok) {
          throw new Error("Failed to fetch video details");
        }

        const dataVideos = await responseVideos.json();

        if (dataVideos.error) {
          throw new Error(dataVideos.error);
        }

        // Filter and map beginner videos
        const beginnerVideos = dataVideos
          .filter(
            (video: { level: string; field: string }) =>
              video.level === "beginner" && video.field === field
          )
          .map((video: { id: string; url: string }) => ({
            id: video.id,
            url: video.url,
          }));

        // Filter and map advanced videos
        const advancedVideos = dataVideos
          .filter(
            (video: { level: string; field: string }) =>
              video.level === "advanced" && video.field === field
          )
          .map((video: { id: string; url: string }) => ({
            id: video.id,
            url: video.url,
          }));

        setBeginnerVideos(beginnerVideos);
        setAdvancedVideos(advancedVideos);
      } catch (error) {
        console.error("Error fetching result details:", error);
        toast.error("Failed to fetch result details");
      }
    };

    fetchResult();
  }, [userID, resultID]);

  return (
    <main className="mt-12 mb-32 min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center text-center mb-16">
        <div className="mb-6">
          <Image
            src={image}
            alt={field}
            width={400}
            height={400}
            className="rounded-lg"
          />
        </div>
        <h1 className="text-3xl xl:text-4xl font-bold font-hammer mb-4">
          Your result: {field}
        </h1>
        <p className="lg:text-lg lg:px-16 xl:px-60 xl:text-xl">{description}</p>
      </div>

      <div className="flex flex-col gap-y-16">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Beginner Tutorials</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {beginnerVideos.map((video) => (
              <li
                key={video.id}
                className="flex flex-col justify-center items-center p-4 border rounded-lg shadow-lg"
              >
                <iframe
                  src={video.url}
                  title={`Beginner Video ${video.id}`}
                  width="400"
                  height="300"
                  className="rounded-lg mb-4"
                />
                <Link href={`/videos/${video.id}`}>
                  <button className="bg-[#535cf9] text-white py-2 px-8 text-lg rounded-lg hover:bg-[#535cf9]/90">
                    Learn
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Advanced Tutorials</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {advancedVideos.map((video) => (
              <li
                key={video.id}
                className="flex flex-col justify-center items-center p-4 border rounded-lg shadow-lg"
              >
                <iframe
                  src={video.url}
                  title={`Advanced Video ${video.id}`}
                  width="400"
                  height="300"
                  className="rounded-lg mb-4"
                />
                <Link href={`/videos/${video.id}`}>
                  <button className="bg-[#535cf9] text-white py-2 px-8 text-lg rounded-lg hover:bg-[#535cf9]/90">
                    Learn
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
