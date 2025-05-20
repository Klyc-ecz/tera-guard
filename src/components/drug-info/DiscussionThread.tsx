
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare } from "lucide-react";

export interface Message {
  id: string;
  sender: {
    name: string;
    specialty: string;
    avatar?: string;
  };
  time: string;
  content: string;
  isQuestion?: boolean;
}

interface DiscussionThreadProps {
  messages: Message[];
}

const DiscussionThread: React.FC<DiscussionThreadProps> = ({ messages }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Expert Communication</h2>
      </div>
      {messages.map((message) => (
        <div key={message.id} className="flex gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
            <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">{message.sender.name}</span>
              <span className="text-xs text-muted-foreground">
                ({message.sender.specialty})
              </span>
            </div>
            <span className="text-xs text-muted-foreground">{message.time}</span>
            <div className={`mt-2 p-3 rounded-lg ${message.isQuestion ? "bg-muted" : "bg-primary/5"}`}>
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DiscussionThread;
