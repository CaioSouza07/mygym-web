import { Check } from "lucide-react";
import Card from "./ui/Card";
import Button from "./ui/Button";

function SerieCard({
  serie,
  checked,
  onClick,
  onChangeReps,
  onChangeKg,
  valueReps,
  valueKg,
}) {
  const canCheck = valueReps && valueKg;
  return (
    <Card
      className={`p-3! rounded-xl gap-0 transition-all duration-200 ${
        checked
          ? "border-green-700 bg-green-900/20"
          : "bg-[#1A1A1A] border-[#2A2A2A]"
      }`}
    >
      <div className="flex w-full items-center gap-3">
        <div
          className={`flex h-9 w-9 min-w-9 items-center justify-center rounded-full transition-colors ${
            checked
              ? "bg-green-800 text-green-200"
              : "bg-[#2E2E2E] text-zinc-300"
          }`}
        >
          <span className="text-sm font-bold">{serie.order}</span>
        </div>

        <div className="flex flex-col leading-tight">
          <span className="text-[11px] uppercase tracking-wide text-zinc-500">
            Alvo
          </span>
          <span className="text-sm font-semibold text-white">
            {serie.repetitions} reps
          </span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="flex flex-col items-center">
            <label className="text-[10px] uppercase text-zinc-500 mb-0.5">
              Reps
            </label>
            <input
              type="number"
              inputMode="numeric"
              placeholder="—"
              className={`w-14 rounded-lg border bg-black/60 px-2 py-1.5 text-center text-sm font-medium text-white outline-none transition-colors ${
                checked
                  ? "border-green-700/50"
                  : "border-[#333] focus:border-zinc-500"
              }`}
              onChange={onChangeReps}
              value={valueReps ?? ""}
            />
          </div>

          <div className="flex flex-col items-center">
            <label className="text-[10px] uppercase text-zinc-500 mb-0.5">
              Kg
            </label>
            <input
              type="number"
              inputMode="decimal"
              placeholder="—"
              className={`w-14 rounded-lg border bg-black/60 px-2 py-1.5 text-center text-sm font-medium text-white outline-none transition-colors ${
                checked
                  ? "border-green-700/50"
                  : "border-[#333] focus:border-zinc-500"
              }`}
              onChange={onChangeKg}
              value={valueKg ?? ""}
            />
          </div>

          <Button
            disabled={!canCheck}
            onClick={onClick}
            variant="secondary"
            className={`mt-3.5 flex h-9 w-9 min-w-9 items-center justify-center rounded-lg transition-all duration-200 ${
              checked
                ? "bg-green-700 text-white shadow-md shadow-green-900/30"
                : "border border-[#444] bg-[#2A2A2A]  hover:border-zinc-500 hover:text-white"
            }`}
          >
            <Check size={18} strokeWidth={checked ? 3 : 2} />
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default SerieCard;
