import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

interface Day {
  day: string;
  description: string;
  isRestDay: boolean;
}

interface WeekCalendarProps {
  weekDays: Day[];
}

export default function WeekCalendar({ weekDays }: WeekCalendarProps) {
  const today = new Date()
    .toLocaleString("pt-BR", { weekday: "short" })
    .toUpperCase()
    .substring(0, 3);

  return (
    <div className="w-[80%]">
      <h1 className="text-xl font-bold">Semana</h1>
      <div className="w-full flex flex-col gap-3">
        {weekDays.map((item, index) => (
          <div
            key={index}
            className={`w-full flex justify-between items-center p-2 rounded-xl border-2 ${
              item.day === today
                ? "bg-neutral-800 border-amber-300"
                : "bg-neutral-900 border-neutral-800"
            }`}
          >
            <div className="flex items-center gap-4">
              <h1
                className={`w-12 ${
                  item.day === today
                    ? "text-amber-300"
                    : "text-muted-foreground"
                }`}
              >
                {item.day}
              </h1>
              <p className="text-muted-foreground text-sm">
                {item.description}
              </p>
            </div>
            {!item.isRestDay && (
              <Button
                variant="outline"
                size="icon"
                className="border-amber-300 rounded-md h-6 w-6"
              >
                <ArrowRight className="text-amber-300" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
