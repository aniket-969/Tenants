import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

const RoomCalendar = ({ tasks }) => {
  console.log(tasks);
  const [date, setDate] = useState(new Date());
  console.log(date)
  return (
    <div>
      RoomCalendar
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border shadow bmain"
      />
    </div>
  );
};

export default RoomCalendar;
