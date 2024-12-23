import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";

const ChatLayout = ({ messages, currentUser }) => {
    console.log(messages)
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
