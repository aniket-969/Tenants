import { Calendar } from "@/components/ui/calendar";
import { getCurrentAssignee } from "@/utils/helper";
import { useState } from "react";

const RoomCalendar = ({ tasks }) => {

  const recurred = tasks.filter((t) => t.recurring);
// console.log(recurred[0])
  const [date, setDate] = useState(new Date());
  //   console.log(date)
    // console.log(getCurrentAssignee(recurred[0],date))
  return (
    <div>
      RoomCalendar
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-xl border shadow bmain "
      />
    </div>
  );
};

export default RoomCalendar;
