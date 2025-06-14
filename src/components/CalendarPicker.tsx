import React, { useEffect, useRef } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format, addDays } from "date-fns";
import { cn } from "@/lib/utils";
import "./calendar-styles.css";

interface CalendarPickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export const CalendarPicker: React.FC<CalendarPickerProps> = ({
  selectedDate,
  onDateChange,
}) => {
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Force reflow to ensure proper rendering of calendar grid
    if (calendarRef.current) {
      const element = calendarRef.current;
      // This forces a reflow
      element.style.display = "none";
      // This is needed to prevent the browser from optimizing the two style changes into one
      void element.offsetHeight;
      element.style.display = "";
    }
  }, []);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      onDateChange(date);
    }
  };
  return (
    <div className="calendar-wrapper" ref={calendarRef}>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleDateSelect}
        disabled={(date) => date < new Date() || date > addDays(new Date(), 30)}
        className="rounded-md border-none bg-white select-none"
        classNames={{
          months: "flex flex-col space-y-4",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center mb-2",
          caption_label: "text-sm font-medium text-gray-900",
          nav: "space-x-1 flex items-center",
          nav_button:
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-green-100 rounded-md",
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",          head_row: "flex w-full",
          head_cell:
            "text-muted-foreground rounded-md font-normal text-[0.8rem] flex-1 text-center",
          row: "flex w-full mt-2",
          cell:
            "h-9 w-9 text-center text-sm relative p-0 focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-green-50",
          day:
            "h-8 w-8 p-0 mx-auto font-normal aria-selected:opacity-100 hover:bg-green-100 hover:rounded-md transition-all rounded-full flex items-center justify-center",
          day_selected:
            "bg-green-600 text-white hover:bg-green-700 hover:text-white focus:bg-green-600 focus:text-white rounded-full",
          day_today: "bg-green-100 text-green-900 rounded-full font-semibold",
          day_outside: "text-gray-300 opacity-50",
          day_disabled: "text-gray-300 opacity-30 hover:bg-transparent",
          day_range_middle:
            "aria-selected:bg-green-100 aria-selected:text-green-900",
          day_hidden: "invisible",
        }}
        components={{
          IconLeft: ({ ...props }) => (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              {...props}
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          ),
          IconRight: ({ ...props }) => (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              {...props}
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          ),
        }}
        initialFocus
      />
    </div>
  );
};
