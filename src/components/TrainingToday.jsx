import { ChevronRight } from "lucide-react";
import Button from "./ui/Button";
import Card from "./ui/Card";

function TrainingToday() {
  return (
    // <Card className="gap-4">
    //   <h1 className="text-base font-semibold text-white/40">
    //     Nenhum treino para hoje!
    //   </h1>
    //   <Button variant="secondary" className="max-w-1/2">
    //     Criar treino
    //   </Button>
    // </Card>
    <Card className="gap-3" variant="secondary">
      <div className="flex flex-col w-full gap-1">
        <span className="text-black/60 font-medium text-sm">
          Treino de hoje
        </span>
        <h1 className="text-black font-semibold text-xl">Treino - Teste</h1>
      </div>
      <div className="flex flex-col w-full gap-1">
        <span className="text-black/60 font-medium text-sm">2 exercícios</span>
        <Button className="font-semibold p-1!" variant="inverted">
          Iniciar treino
          <ChevronRight />
        </Button>
      </div>
    </Card>
  );
}

export default TrainingToday;
