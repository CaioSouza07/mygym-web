import SerieCard from "./SerieCard";
import Card from "./ui/Card";

function ExerciseCard({
  exercise,
  seriesState,
  onToggleCompleted,
  onChangeKg,
  onChangeReps,
}) {
  const completedCount = Object.values(seriesState).filter(
    (s) => s.completed,
  ).length;

  return (
    <Card key={exercise.id} className="gap-3">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-white font-semibold text-lg truncate max-w-[70%]">
          {exercise.name}
        </h2>
        <span className="text-xs text-zinc-500 font-medium">
          {completedCount}/{exercise.series.length}
        </span>
      </div>

      <div className="flex flex-col w-full gap-2">
        {exercise.series.map((serie) => {
          const state = seriesState[serie.id] || {};
          return (
            <SerieCard
              key={serie.id}
              serie={serie}
              checked={state.completed}
              valueKg={state.kg}
              valueReps={state.reps}
              onChangeKg={(e) => onChangeKg(serie.id, e.target.value)}
              onChangeReps={(e) => onChangeReps(serie.id, e.target.value)}
              onClick={() => onToggleCompleted(serie.id)}
            />
          );
        })}
      </div>
    </Card>
  );
}

export default ExerciseCard;
