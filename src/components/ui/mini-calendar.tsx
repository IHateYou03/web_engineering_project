import { useState } from "react";
import {
  format,
  addWeeks,
  subWeeks,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const DAYS_OF_WEEK = [
  { key: "mon", label: "Mon" },
  { key: "tue", label: "Tue" },
  { key: "wed", label: "Wed" },
  { key: "thu", label: "Thu" },
  { key: "fri", label: "Fri" },
  { key: "sat", label: "Sat" },
  { key: "sun", label: "Sun" },
];

const data = [
  { day: "Mon", value: 2 },
  { day: "Tue", value: 3 },
  { day: "Wed", value: 6 },
  { day: "Thu", value: 4 },
  { day: "Fri", value: 7 },
  { day: "Sat", value: 5 },
  { day: "Sun", value: 6 },
];

export const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date());

  const weekDays = eachDayOfInterval({
    start: startOfWeek(currentWeek, { weekStartsOn: 1 }),
    end: endOfWeek(currentWeek, { weekStartsOn: 1 }),
  });

  return (
    <div className="w-full  mt-auto bg-[#252525] text-white p-5 shadow-lg rounded-4xl">
      <div className="mb-0">
        <h2 className="text-lg font-semibold">Activity Tracking</h2>
        <p className="text-sm text-gray-400">
          {format(selectedDate, "EEEE, dd MMM")}
        </p>
      </div>

      <div className="flex justify-end gap-0 mb-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}
          className="text-white hover:bg-white/20"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
          className="text-white hover:bg-white/20"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 text-center mb-1">
        {DAYS_OF_WEEK.map((day) => (
          <div key={day.key} className="text-xs text-gray-400">
            {day.label}
          </div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 text-center mb-4">
        {weekDays.map((day) => {
          const isSelected =
            format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

          return (
            <button
              key={day.toString()}
              className={cn(
                "h-9 w-9 mx-auto flex items-center justify-center rounded-full text-sm",
                isSelected
                  ? "bg-white text-black font-bold"
                  : "text-gray-200 hover:bg-white/20"
              )}
              onClick={() => setSelectedDate(day)}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>

      {/* Chart */}
      <div className="h-25 mb-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="#fff"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Stats */}
      <div className="flex justify-between text-sm">
        <div>
          <p className="font-bold">0</p>
          <p className="text-gray-400">kcal/min</p>
        </div>
        <div className="text-right">
          <p className="font-bold">14.5</p>
          <p className="text-gray-400">kcal/min</p>
        </div>
      </div>
    </div>
  );
};
