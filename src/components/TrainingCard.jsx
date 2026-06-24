import { ChevronRight, Dumbbell } from "lucide-react";
import Card from "./ui/Card";

function TrainingCard({ training }) {
  //   const formatter = new Intl.DateTimeFormat("pt-BR", {
  //     day: "2-digit",
  //     month: "short",
  //   });
  const days = {
    SUNDAY: "DOM",
    MONDAY: "SEG",
    TUESDAY: "TER",
    WEDNESDAY: "QUA",
    THURSDAY: "QUI",
    FRIDAY: "SEX",
    SATURDAY: "SAB",
  };
  return (
    <Card className="flex-row! justify-between! items-center! py-3! px-4! gap-4 hover:opacity-90 cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="bg-[#FFCC00]/10 border border-[#FFCC00]/30 rounded-xl p-2">
          <Dumbbell className="w-6 h-6 text-[#FFCC00]" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-white font-semibold text-base">
            {training.name}
          </h2>
          <span className="text-white/40 text-sm">
            {training.weekDay && `${days[training.weekDay]}`}
            {training.exercises?.length > 0 &&
              ` • ${training.exercises.length} exercícios`}
          </span>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-white/40" />
    </Card>
  );
}

export default TrainingCard;
