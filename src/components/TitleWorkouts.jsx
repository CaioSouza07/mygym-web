import { Plus } from "lucide-react";
import Button from "./ui/Button";

function TitleWorkouts() {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <div className="flex flex-col">
        <h1 className="text-white text-2xl font-semibold">Meus Treinos</h1>
        <span className="text-white/50 text-sm lg:text-lg">
          Acompanhe seus treinos e evolua todos os dias
        </span>
      </div>
      <Button className=" p-3! max-w-fit   gap-2">
        <Plus className="w-6 h-6" />
        <p className="hidden lg:inline">Criar treino</p>
      </Button>
    </div>
  );
}

export default TitleWorkouts;
