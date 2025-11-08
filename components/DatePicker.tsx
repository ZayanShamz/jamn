"use client";

import * as React from "react";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, parse } from "date-fns";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";

interface DatePickerProps {
  value?: string;
  /** Called when user types or selects a date */
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Applied Date",
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const selectedDate = value
    ? parse(value, "dd-MM-yyyy", new Date())
    : undefined;

  const displayDate =
    value && selectedDate && !isNaN(selectedDate.getTime())
      ? format(selectedDate, "MMM d, yyyy")
      : placeholder;

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      const formatted = format(date, "dd-MM-yyyy");
      onChange?.(formatted);
    } else {
      onChange?.("");
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div>
          <Label htmlFor="applied-date" className="text-muted-foreground mb-1">
            Select the date you applied.
          </Label>
          <Button
            className={cn(
              "w-full justify-between text-left font-normal rounded-none text-black bg-white border focus:bg-white hover:bg-white",
              !value && "text-muted-foreground",
              className
            )}
          >
            {displayDate}
            <CalendarIcon className="text-gray-400" />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
}
