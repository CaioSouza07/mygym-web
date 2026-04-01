import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

interface TodayExerciseProps {
  todayWorkout?: {
    name: string;
    exerciseCount: number;
  };
}

export default function TodayExercise({ todayWorkout }: TodayExerciseProps) {
  const hasWorkout = todayWorkout;

  return (
    <div
      className={`w-[80%] p-4 border-2 rounded-xl ${
        hasWorkout
          ? "bg-amber-300"
          : "bg-neutral-900 border-neutral-800"
      }`}
    >
      {hasWorkout ? (
        <div className="flex flex-col items-start justify-center gap-4">
          <div>
            <h1 className="text-muted">Treino de hoje</h1>
            <h1 className="text-xl font-bold text-black">{todayWorkout.name}</h1>
            <p className="text-muted">
              {todayWorkout.exerciseCount} exercícios
            </p>
          </div>
          <Button
            variant="outline"
            className="border-black text-black rounded-md" size="lg"
          >
            Iniciar Treino
            <ArrowRight/>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <div>
            <h1 className="text-muted-foreground">Nenhum treino para hoje!</h1>
          </div>
          <Button variant="outline" className="border-amber-400 rounded-md">
            Criar Treino
          </Button>
        </div>
      )}
    </div>
  );
}
