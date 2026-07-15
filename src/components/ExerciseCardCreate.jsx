import { Plus, Trash2 } from "lucide-react";
import Card from "./ui/Card";

function ExerciseCardCreate({
  exercise,
  onRemove,
  onAddSerie,
  onChangeRepetitions,
}) {
  return (
    <Card className="p-4! gap-3! items-start!">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-white font-semibold text-lg">{exercise.name}</h3>
        <button
          onClick={onRemove}
          className="text-red-400 hover:text-red-300 cursor-pointer p-1"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2 w-full">
        {exercise.series.map((serie, index) => (
          <div
            key={serie.order}
            className="flex items-center gap-2 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2"
          >
            <span className="text-white/50 text-sm font-medium">
              S{serie.order}
            </span>
            <input
              type="number"
              value={serie.repetitions}
              onChange={(e) => onChangeRepetitions(index, e.target.value)}
              className="bg-transparent text-white text-center w-10 text-sm font-semibold outline-none border-b border-zinc-600 focus:border-[#FFCC00]"
            />
            <span className="text-white/40 text-xs">reps</span>
          </div>
        ))}
        <button
          onClick={onAddSerie}
          className="flex items-center justify-center bg-zinc-900 border border-dashed border-zinc-600 hover:border-[#FFCC00]/50 rounded-lg px-3 py-2 cursor-pointer transition-colors"
        >
          <Plus className="w-4 h-4 text-white/40" />
        </button>
      </div>
    </Card>
  );
}

export default ExerciseCardCreate;
