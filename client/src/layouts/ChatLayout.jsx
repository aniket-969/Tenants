import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import { getSocket } from "@/socket";
import { useEffect, useState } from "react";

const ChatLayout = ({ initialMessages, currentUser }) => {
  const [messages, setMessages] = useState(initialMessages);
  console.log(messages);
  const socket = getSocket();

  useEffect(() => {
    // Listen for new messages
    const handleNewMessage = (newMessage) => {
        console.log(newMessage)
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socket.on("messageReceived", handleNewMessage);

    return () => {
      socket.off("messageReceived", handleNewMessage);
    };
  }, [socket]);

  return (
    <div className="flex flex-col gap-5 p-2 sm:min-w-[40rem] bgr">
      <div className="px-4 flex flex-col gap-2 b py-2">
        {messages.map((msg) => (
          <ChatMessage
            key={msg._id}
            message={msg}
            isCurrentUser={msg.sender._id === currentUser}
          />
        ))}
      </div>
      <ChatInput />
    </div>
  );
};

export default ChatLayout;
