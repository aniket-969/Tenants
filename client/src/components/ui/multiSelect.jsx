import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils"; 

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function MultiSelect({ value = [], onChange }) {
  const [open, setOpen] = useState(false);

  const toggleSelection = (day) => {
    const newSelection = value.includes(day)
      ? value.filter((d) => d !== day)
      : [...value, day];
    onChange(newSelection);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full">
          {value.length ? value.join(", ") : "Select Repetition Days"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2">
        {days.map((day) => (
          <div key={day} className="flex items-center gap-2 py-1">
            <Checkbox
              checked={value.includes(day)}
              onCheckedChange={() => toggleSelection(day)}
            />
            <span className="text-sm">{day}</span>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
