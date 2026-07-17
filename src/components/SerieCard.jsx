import { Check } from "lucide-react";
import Button from "./ui/Button";
import Card from "./ui/Card";
import Input from "./ui/Input";

function SerieCard({ serie, checked, onClick, onChangeKg, valueKg }) {
  return (
    <Card
      className={`flex flex-row items-center justify-between bg-[#222] p-2! rounded-xl ${checked && "border-green-800 bg-green-900/30"}`}
    >
      <div className="flex w-full items-center gap-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2E2E2E]">
          <span className="text-lg font-bold text-white">{serie.order}</span>
        </div>

        <div>
          <p className="text-sm text-zinc-400">Repetições</p>
          <p className="text-lg font-semibold text-white">
            {serie.repetitions}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 w-[180px]">
        <Input
          placeholder="kg"
          className="text-center"
          onChange={onChangeKg}
          value={valueKg}
        />
        <Button
          className={checked && "gap-2 bg-green-800"}
          variant={!checked && "secondary"}
          onClick={onClick}
        >
          {checked ? <Check /> : "OK"}
        </Button>
      </div>
    </Card>
  );
}

export default SerieCard;
