import { useNavigate } from "react-router";
import LayoutPage from "../components/layout/LayoutPage";
import { ArrowLeft, Plus } from "lucide-react";
import Label from "../components/ui/Label";
import Input from "../components/ui/Input";
import MenuDropdown from "../components/ui/MenuDropdown";
import Button from "../components/ui/Button";
import ExerciseCardCreate from "../components/ExerciseCardCreate";

function WorkoutsCreatePage() {
  const navigate = useNavigate();
  const weekDays = [
    { value: "sunday", name: "Domingo" },
    { value: "monday", name: "Segunda" },
    { value: "tuesday", name: "Terça" },
    { value: "wednesday", name: "Quarta" },
    { value: "thursday", name: "Quinta" },
    { value: "friday", name: "Sexta" },
    { value: "saturday", name: "Sábado" },
  ];

  return (
    <LayoutPage>
      <button
        onClick={() => navigate("/workouts")}
        className="flex items-center gap-2 text-white/70 hover:text-white cursor-pointer self-start"
      >
        <ArrowLeft size={20} />
        <span>Voltar</span>
      </button>

      <div className="flex w-full flex-col lg:flex-row gap-8">
        <div className="flex flex-col gap-4 w-full lg:w-80 lg:sticky lg:top-4 lg:self-start">
          <h1 className="text-white text-2xl font-semibold">Novo Treino</h1>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <Label htmlFor="name" className="text-white/70">
                Nome do Treino
              </Label>
              <Input placeholder="Ex: Costas e Bíceps" id="name" />
            </div>
            <MenuDropdown
              id="weekDay"
              label="Dia da Semana"
              options={weekDays}
              className="text-white/70"
            />
          </div>
          <Button className="mt-2 hidden lg:flex">Salvar Treino</Button>
        </div>

        <div className="flex flex-col gap-4 flex-1">
          <Label className="text-white/70 text-lg!">Exercícios</Label>

          <ExerciseCardCreate
            exercise={{
              name: "Cadeira Extensora",
              series: [
                { order: 1, repetitions: 12 },
                { order: 2, repetitions: 12 },
                { order: 3, repetitions: 12 },
              ],
            }}
          />

          <ExerciseCardCreate
            exercise={{
              name: "Leg Press 45°",
              series: [
                { order: 1, repetitions: 10 },
                { order: 2, repetitions: 10 },
                { order: 3, repetitions: 8 },
                { order: 4, repetitions: 8 },
              ],
            }}
          />

          <div className="flex gap-3 items-center">
            <Input placeholder="Nome do exercício" />
            <Button
              className="whitespace-nowrap max-w-fit gap-2"
              variant="secondary"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden lg:inline">Adicionar</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Botão fixo no rodapé para mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/95 to-transparent lg:hidden">
        <Button>Salvar Treino</Button>
      </div>
    </LayoutPage>
  );
}

export default WorkoutsCreatePage;
