"use client";

import Message from "./chat-bot";
import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Send } from "lucide-react";
import { useParams } from "next/navigation";

interface MessageType {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const dummyAnswer =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac augue nec orci mattis semper a commodo nunc. Suspendisse nec dui sit amet mi sollicitudin laoreet nec eu tellus. Nam eget ullamcorper orci, in congue libero. Sed finibus luctus auctor. Morbi sed arcu velit. Aenean dapibus sem tempor magna convallis, in fringilla ante luctus. Vestibulum pharetra blandit quam pharetra porta. Duis faucibus gravida pulvinar. Fusce ex leo, tempus vitae sodales non, aliquet at mauris. Suspendisse potenti.";

export default function CourseBox() {
  const { id } = useParams();
  const [video, setVideo] = useState<string>("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  console.log(id);

  useEffect(() => {
    // Fetch the video data from the server
    const fetchVideo = async () => {
      try {
        const response = await fetch(`/api/videos/${id}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch video");
        }
        const data = await response.json();
        console.log(data);
        if (data.error) {
          throw new Error(data.error);
        }
        setVideo(data.url);
      } catch (error) {
        console.error("Error fetching video:", error)
      }
    };

    fetchVideo();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages: MessageType[] = [
      ...messages,
      { id: Date.now().toString(), role: "user", content: input },
      {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: dummyAnswer,
      },
    ];

    setMessages(newMessages);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-20 h-[600px] lg:w-[1000px] xl:w-[1500px]">
      {/* video */}
      {video ? (
        <iframe
          src={video}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-xl w-full h-full md:w-2/3"
        ></iframe>
      ) : (
        <div className="w-full h-full md:w-2/3 flex items-center justify-center">
          <p>Loading video...</p>
        </div>
      )}

      {/* chat */}
      <div className="h-full w-full flex flex-col bg-white rounded-lg shadow-lg p-4 border-2 border-[#b3b5fd] md:w-1/3">
        <div className="flex-1 mb-4 space-y-4 p-2 overflow-y-auto max-h-full">
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-auto relative"
        >
          <Textarea
            className="w-full resize-none text-lg rounded-lg p-4 border-2 border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Ask something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input}
            className="absolute top-1/2 transform -translate-y-1/2 right-4 rounded-full bg-blue-500 text-white hover:bg-blue-600"
          >
            <Send size={24} />
          </Button>
        </form>
      </div>
    </div>
  );
};

