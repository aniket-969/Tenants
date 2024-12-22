import { Spinner } from "@/components/ui/spinner"
import { useChat } from "@/hooks/useChat"
import { useParams } from "react-router-dom"

const Chat = () => {
    const {roomId} = useParams()
const {messageQuery} = useChat()
const{data,isLoading,isError} = messageQuery(roomId)
console.log(data)
if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <>Something went wrong . Please refresh</>;
  }

  return (
    <div>Chat</div>
  )
}

export default Chat