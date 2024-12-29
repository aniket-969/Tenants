import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useChat } from "@/hooks/useChat";
import { useParams } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";

const ChatInput = ({ onSendMessage }) => {
  const [content, setContent] = useState("");
  const { sendMessageMutation } = useChat();
  const { roomId } = useParams();
  const onClick = async () => {
    onSendMessage(content)
    const data = { content };
    console.log(data, roomId);
    await sendMessageMutation.mutateAsync({ data, roomId });
    setContent("");
  };

  return (
    <div className="flex items-center p-2 ">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type a message ......"
        
      />
      <Button onClick={onClick} className="ml-2">
        Send
      </Button>
    </div>
  );
};

export default ChatInput;
