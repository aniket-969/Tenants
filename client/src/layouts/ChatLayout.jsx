import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";

const ChatLayout = ({ messages, currentUser }) => {
  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-1 overflow-y-auto">
        {messages.map((msg) => (
          <ChatMessage
            key={msg._id}
            message={msg}
            isCurrentUser={msg.sender._id === currentUser._id}
          />
        ))}
      </div>
      <ChatInput />
    </div>
  );
};

export default ChatLayout;
