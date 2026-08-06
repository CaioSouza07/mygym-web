import Card from "./ui/Card";
import { Dumbbell } from "lucide-react";

function HistoryCard({ history, exerciseName }) {
  const date = new Date(history.createdAt.replace(" ", "T"));
  let formattedDate = date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  formattedDate =
    formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  const formattedHour = date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card className="flex-row justify-between! items-center! p-3!">
      <div className="flex flex-col gap-1 min-w-0">
        <span className="text-white text-base font-medium">
          {formattedDate}
        </span>
        <p className="text-[#858385] text-sm truncate">{exerciseName}</p>
      </div>
      <div className="flex flex-col items-end gap-1 shrink-0">
        <div className="flex items-center gap-1.5 text-[#FFCC00]">
          <Dumbbell size={14} />
          <span className="font-semibold text-sm">{history.weight} kg</span>
        </div>
        <span className="text-[#858385] text-xs">{formattedHour}</span>
      </div>
    </Card>
  );
}

export default HistoryCard;
