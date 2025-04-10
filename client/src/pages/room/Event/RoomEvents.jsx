import { Spinner } from "@/components/ui/spinner";
import { useEvent } from "@/hooks/useEvent";
import { getSocket } from "@/socket";
import { Suspense, useEffect, useState,lazy } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const EventsForm = lazy(() => import("@/components/form/EventsForms"));
const FormWrapper = lazy(() => import("@/components/ui/formWrapper"));

const RoomEvents = () => {
  const { roomId } = useParams();
  const { roomEventsQuery } = useEvent();
  const { isLoading, data, isError } = roomEventsQuery(roomId);
  const [isFormOpen, setIsFormOpen] = useState(false);
  // console.log(data);
  const socket = getSocket();

  useEffect(() => {
    const handleCreateEvent = (newEvent) => {
      console.log(newEvent);
    };

    socket.on("createdEvent", handleCreateEvent);

    return () => {
      socket.off("createdEvent", handleCreateEvent);
    };
  }, [socket]);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <>Something went wrong . Please refresh</>;
  }

  return (
    <div className="flex flex-col gap-6 w-full items-center ">
      <h2 className="font-bold text-xl"> Events</h2>
      <Button onClick={() => setIsFormOpen(true)}>Create Event</Button>

      {isFormOpen && (
        <Suspense fallback={<Spinner />}>
          <FormWrapper onClose={() => setIsFormOpen(false)}>
            {" "}
            <EventsForm />
          </FormWrapper>{" "}
        </Suspense>
      )}
    </div>
  );
};

export default RoomEvents;
