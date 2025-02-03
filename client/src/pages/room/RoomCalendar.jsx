import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"

const RoomCalendar = ({tasks}) => {
    console.log(tasks)
    const [date,setDate] = useState(new Date())
  return (
    <div>RoomCalendar
       <Calendar mode="single" selected={date} onSelect={setDate}/>
    </div>
  )
}

export default RoomCalendar