import { ArrowRight, BedDouble } from "lucide-react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import { useNavigate } from "react-router";

function TrainingCardDay({ training }) {
  const navigate = useNavigate();

  const days = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
  const formatter = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  });
  const trainingDay = training.training ? true : false;
  const today = new Date();
  return (
    <Card
      className={`flex flex-row  justify-between! p-2! gap-10 ${today.getDay() === training.day.getDay() ? "border-[#FFCC00]" : ""}`}
    >
      <div className="flex flex-col items-center">
        <span
          className={`${today.getDay() === training.day.getDay() ? "text-[#FFCC00]" : "text-white/50 "} text-lg font-medium`}
        >
          {days[training.day.getDay()]}
        </span>
        <p className="text-white/40">{formatter.format(training.day)}</p>
      </div>
      <div className="flex w-full text-white/90 font-medium text-lg truncate">
        {trainingDay ? (
          <p>{training.training.name}</p>
        ) : (
          <p className="text-white/40">Descanso</p>
        )}
      </div>

      {trainingDay ? (
        <Button
          onClick={() => navigate(`/workouts/${training.training.id}/execute`)}
          variant="secondary"
          className="w-fit! bg-transparent"
        >
          <ArrowRight />
        </Button>
      ) : (
        <div className="border border-zinc-1000 flex p-2 bg-zinc-800 rounded-full">
          <BedDouble className="text-white/40 w-6 h-6" />
        </div>
      )}
    </Card>
  );
}

export default TrainingCardDay;
