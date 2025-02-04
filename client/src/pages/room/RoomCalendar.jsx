import { Calendar } from "@/components/ui/calendar";
import { getAssignee } from "@/utils/helper";
import { useState } from "react";

const RoomCalendar = ({ tasks }) => {

  const recurred = tasks.filter((t) => t.recurring);
// console.log(recurred[0])
  const [date, setDate] = useState(new Date());
  //   console.log(date)
    // console.log(getAssignee(recurred[0],date))
    const rotationOrder = [1, 2, 3]; // User IDs
const createdAt = "2024-02-01"; // Task created on Feb 1, 2024
const selectedDate = "2024-02-10"; // Check for Feb 10, 2024

console.log(getAssignee(rotationOrder, createdAt, selectedDate, "daily")); // Output: 2
console.log(getAssignee(rotationOrder, createdAt, "2024-02-15", "daily")); // Output: 1
console.log(getAssignee(rotationOrder, createdAt, "2024-03-01", "weekly")); // Output: 3
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
