import { useRoom } from "@/hooks/useRoom";
import { TaskForm } from "../form/tasks/TaskForm";
import { Spinner } from "../ui/spinner";
import { useParams } from "react-router-dom";
import { Switch } from "../ui/switch";
import { useState } from "react";
import { RecurringTaskForm } from "../form/tasks/RecurringTaskForm";
import { Label } from "@/components/ui/label";

const Tasks = () => {
  const { roomId } = useParams();
  const [recurringTask, setRecurringTask] = useState(true);
  const { roomQuery } = useRoom(roomId);
  const { data, isLoading, isError } = roomQuery;
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
    <div className="flex flex-col gap-4 by w-full">
      <div className="flex items-center gap-4 bb">
        <Label htmlFor="room-toggle" className="text-sm">
          Recurring
        </Label>
        <Switch
          id="room-toggle"
          checked={recurringTask}
          onCheckedChange={setRecurringTask}
        />
        <Label htmlFor="room-toggle" className="text-sm">
          One Time
        </Label>
      </div>
      {recurringTask ? (
        <RecurringTaskForm participants={participants} />
      ) : (
        <TaskForm participants={participants} />
      )}
    </div>
  );
};

export default Tasks;
