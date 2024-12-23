import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";

const ChatLayout = ({ messages, currentUser }) => {
    console.log(messages)
  return (
    <div className="flex flex-col p-2 bb w-[45rem]">
      <div className="px-4 flex flex-col gap-2 by py-2">
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
