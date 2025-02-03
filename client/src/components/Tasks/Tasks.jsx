import { useRoom } from "@/hooks/useRoom";
import { TaskForm } from "../form/TaskForm"
import { Spinner } from "../ui/spinner";
import { useParams } from "react-router-dom";


const Tasks = () => {
  const { roomId } = useParams();

  const { roomQuery } = useRoom(roomId);
  const { data, isLoading, isError } = roomQuery;
  // console.log(data);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <>Something went wrong . Please refresh</>;
  }
  const participants = [
    ...(data.tenants || []),
    ...(data.landlord ? [data.landlord] : []),
  ];
  return (
    <div className="flex gap-4 ">
      <TaskForm participants={participants}/>
    </div>
  )
}

export default Tasks