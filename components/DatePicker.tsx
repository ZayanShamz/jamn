"use client";

import * as React from "react";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, parse } from "date-fns";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { useEffect } from "react";

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

  useEffect(() => {
    if (!value) {
      onChange?.(format(new Date(), "dd-MM-yyyy"));
    }
  }, []);

  const selectedDate = value
    ? parse(value, "dd-MM-yyyy", new Date())
    : new Date();

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
          <button
            type="button"
            id="applied-date"
            className={cn(
              "h-9 w-full min-w-0 border px-3 text-base md:text-sm shadow-xs rounded-none ",
              "bg-white py-1 dark:bg-input/30 border-input",
              "transition-[color,box-shadow] outline-none ",
              "focus:border-2 focus:border-[#C7C7C7] focus:ring-0 dark:focus:border-primary/70 focus:rounded-md",
              "",
              // Layout for the date + icon
              "flex items-center justify-between text-left font-normal",
              !value && "text-muted-foreground",
              className,
            )}
          >
            {displayDate}
            <CalendarIcon className="text-gray-400" />
          </button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="center">
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
