import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { useChat } from "@/hooks/useChat";
import { useParams } from "react-router-dom";

const ChatInput = () => {
  const [content, setContent] = useState("");
  const { messageQuery } = useChat();
  const { roomId } = useParams();
  const onClick = async () => {
    const data = { content };
    console.log(data, roomId);
    return;
    await sendMessageMutation.mutateAsync({ data, roomId });
    setContent("");
  };

  return (
    <div className="flex items-center p-2 border-t">
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type a message"
        className="flex-1"
      />
      <Button onClick={onClick} className="ml-2">
        Send
      </Button>
    </div>
  );
};

export default ChatInput;
