import React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFormContext, Controller } from "react-hook-form";

const DatePicker = ({ name }) => {
  const { control, setValue } = useFormContext(); // Access form context from React Hook Form

  return (
    <div className="flex flex-col">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="w-[240px] justify-start text-left font-normal"
              >
                <CalendarIcon />
                {field.value
                  ? format(new Date(field.value), "PPP")
                  : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) => {
                  setValue(name, date); // Update form state with selected date
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        )}
      />
    </div>
  );
};

export default DatePicker;
