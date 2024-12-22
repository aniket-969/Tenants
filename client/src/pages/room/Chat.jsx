import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useChat } from "@/hooks/useChat";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { roomId } = useParams();
  const { messageQuery, sendMessageMutation } = useChat();
  const { data, isLoading, isError } = messageQuery(roomId);

  const onClick = async () => {
    const data = { content: "Hey! it's me mario" };
    await sendMessageMutation.mutateAsync({ data, roomId });
  };
  console.log(data);
  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <>Something went wrong . Please refresh</>;
  }

  return (
    <div>
      Chat
      <Button onClick={() => onClick()}></Button>
    </div>
  );
};

export default Chat;
