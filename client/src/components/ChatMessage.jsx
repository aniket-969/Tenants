

const ChatMessage = ({ message, isCurrentUser }) => {
  return (
    <div
      className={`flex ${
        isCurrentUser ? "justify-end" : "justify-start"
      } mb-2`}
    >
      {!isCurrentUser && (
        <div className="text-sm text-gray-500 mb-1">
          {message.sender.fullName}
        </div>
      )}
      <div
        className={`p-3 rounded-lg ${
          isCurrentUser
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
};

export default ChatMessage;
