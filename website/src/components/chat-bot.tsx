import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Message as MessageType } from "ai";
import { Bot, User } from "lucide-react";

export default function Message({ message }: { message: MessageType }) {
  const { role, content } = message;

  if (role === "assistant") {
    return (
      <div className="flex justify-start mb-4">
        <div className="max-w-xs p-3 bg-gray-100 rounded-tl-lg rounded-tr-lg rounded-br-lg shadow-sm">
          <div className="flex items-center gap-2 text-blue-500 mb-1">
            <Bot size={20} />
            <span className="font-semibold">AI Tutor:</span>
          </div>
          <div className="text-gray-800 whitespace-pre-wrap">{content}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-end mb-4">
      <div className="max-w-xs p-3 bg-blue-50 rounded-tl-lg rounded-tr-lg rounded-bl-lg shadow-md">
        <div className="flex items-center gap-2 text-blue-700 mb-1">
          <User size={20} />
          <span className="font-semibold">User:</span>
        </div>
        <div className="text-gray-800 whitespace-pre-wrap">{content}</div>
      </div>
    </div>
  );
}
