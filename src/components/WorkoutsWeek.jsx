import { Link } from "react-router";
import { useTraining } from "../hooks/useTraining";
import TrainingCardDay from "./TrainingCardDay";
import Spinner from "./ui/Spinner";

function WorkoutsWeek() {
  const { trainings, loading } = useTraining();

  const getCurrentWeek = () => {
    const today = new Date();

    const todayWeek = today.getDay();

    const sunday = new Date(today);
    sunday.setDate(today.getDate() - todayWeek);

    const week = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(sunday);
      day.setDate(sunday.getDate() + i);
      week.push(day);
    }

    return week;
  };

  const assignTrainingDay = () => {
    const days = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ];

    const currentWeek = getCurrentWeek();
    const workoutsDay = [];

    currentWeek.forEach((day, index) => {
      const trainingDay = trainings?.find(
        (t) => t.weekDay === days[day.getDay()],
      );
      workoutsDay.push({
        id: index,
        day,
        training: trainingDay,
      });
    });
    return workoutsDay;
  };

  const workoutsCurrentWeek = assignTrainingDay();

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex flex-1 border items-center justify-between">
        <span className="text-white font-semibold text-xl">Sua semana</span>
        <Link
          className="text-[#FFCC00] font-medium underline hover:opacity-80"
          to="/workouts"
        >
          Ver treinos
        </Link>
      </div>
      {workoutsCurrentWeek.map((trainingDay) => (
        <TrainingCardDay key={trainingDay.id} training={trainingDay} />
      ))}
      {loading && <Spinner />}
    </div>
  );
}

export default WorkoutsWeek;
