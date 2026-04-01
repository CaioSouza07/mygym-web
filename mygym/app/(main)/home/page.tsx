import TodayExercise from "@/components/today-exercise";
import WeekCalendar from "@/components/week-calendar";

const todayWorkout = {
  name: "Treino - Braço Teste",
  exerciseCount: 2,
};

  const weekDays = [
    { day: "DOM", description: "Descanso", isRestDay: true },
    { day: "SEG", description: "Treino A", isRestDay: false },
    { day: "TER", description: "Treino B", isRestDay: false },
    { day: "QUA", description: "Treino C", isRestDay: false },
    { day: "QUI", description: "Descanso", isRestDay: true },
    { day: "SEX", description: "Treino A", isRestDay: false },
    { day: "SAB", description: "Treino B", isRestDay: false },
  ];

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen gap-4">
      <TodayExercise todayWorkout={todayWorkout} />
      <WeekCalendar weekDays={weekDays}/>
    </div>
  );
}
