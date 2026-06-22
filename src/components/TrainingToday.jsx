import { ChevronRight, CirclePlus, ClipboardList } from "lucide-react";
import dumbbell from "../assets/dumbbell.png";
import Button from "./ui/Button";
import Card from "./ui/Card";
import { useTraining } from "../hooks/useTraining";

function TrainingToday() {
  const { trainings } = useTraining();
  const days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  const today = new Date();
  const weekDay = days[today.getDay()];

  const todayTraining = trainings?.find((t) => t.weekDay === weekDay);

  return !todayTraining ? (
    <Card className="gap-4">
      <div className="flex w-full justify-between gap-4 lg:flex-row">
        <div className="flex items-center gap-4 text-[#FFCC00] flex-2">
          <ClipboardList className="w-12 h-12 md:w-8 md:h-8 lg:w-14 lg:h-14 " />
          <div className="flex w-full items-center justify-center lg:flex-col lg:items-start">
            <h1 className="text-lg font-semibold text-white/50 lg:text-white">
              Nenhum treino para hoje!
            </h1>
            <span className="text-white/40 wrap-break-word hidden md:inline">
              Crie um treino personalizável para cumprir com seus objetivos e
              manter constância!
            </span>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <Button className="gap-2 max-w-2/3">
            <CirclePlus className="w-8 h-8" />
            <p className="hidden md:inline">Criar treino</p>
          </Button>
        </div>
      </div>
    </Card>
  ) : (
    <Card className="relative overflow-hidden rounded-3xl p-6">
      <img
        src={dumbbell}
        alt=""
        className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-25 pointer-events-none"
      />

      <div className="absolute inset-0 bg-linear-to-r from-zinc-950 via-zinc-950/70 to-[#FFCC00]/20" />

      <div className="relative z-10 flex flex-col gap-4 w-full">
        <span className="text-black bg-[#FFCC00] text-sm font-semibold px-3 py-1 rounded-full w-fit">
          TREINO DE HOJE
        </span>

        <div>
          <h1 className="text-white font-bold text-2xl lg:text-4xl">
            {todayTraining.name}
          </h1>
        </div>

        <div className="flex items-center gap-3 border-t border-zinc-700 pt-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-1">
            <span className="text-[#FFCC00] text-2xl font-bold">
              {todayTraining.exercises?.length ?? 0}
            </span>
          </div>

          <span className="text-zinc-300">exercícios</span>
        </div>

        <Button className="max-w-fit font-semibold">
          Iniciar treino
          <ChevronRight />
        </Button>
      </div>
    </Card>
  );
}

export default TrainingToday;
