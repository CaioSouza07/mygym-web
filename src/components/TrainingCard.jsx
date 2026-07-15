import { Dumbbell, Pencil, Trash2 } from "lucide-react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import { useNavigate } from "react-router";
import { useState } from "react";
import ModalConfirmation from "./ModalConfirmation";
import { useTraining } from "../hooks/useTraining";
import { deleteTraining } from "../services/trainingsService";
import AlertCard from "./ui/AlertCard";

function TrainingCard({ training, onDeleteSuccess }) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { reload } = useTraining();

  const days = {
    SUNDAY: "DOM",
    MONDAY: "SEG",
    TUESDAY: "TER",
    WEDNESDAY: "QUA",
    THURSDAY: "QUI",
    FRIDAY: "SEX",
    SATURDAY: "SAB",
  };

  const [openModal, setOpenModal] = useState(false);

  const handleRemoveTraining = async () => {
    try {
      await deleteTraining(training.id);
      onDeleteSuccess();
      reload();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return (
    <Card className="flex-row! justify-between! items-center! py-3! px-4! gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <div className="bg-[#FFCC00]/10 border border-[#FFCC00]/30 rounded-xl p-2 shrink-0">
          <Dumbbell className="w-6 h-6 text-[#FFCC00]" />
        </div>
        <div className="flex flex-col min-w-0">
          <h2 className="text-white font-semibold text-base truncate">
            {training.name}
          </h2>
          <span className="text-white/40 text-sm">
            {training.weekDay && `${days[training.weekDay]}`}
            {training.exercises?.length > 0 &&
              ` • ${training.exercises.length} exercícios`}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="secondary"
          className="max-w-fit"
          onClick={() => navigate(`/workouts/${training.id}/edit`)}
        >
          <Pencil />
        </Button>
        <Button
          variant="danger"
          className="max-w-fit border border-red-500 hover:opacity-30"
          onClick={() => setOpenModal(true)}
        >
          <Trash2 />
        </Button>
      </div>
      {openModal && (
        <ModalConfirmation
          handleNo={() => setOpenModal(false)}
          handleClose={() => setOpenModal(false)}
          handleYes={handleRemoveTraining}
          title="Deseja excluir esse treino?"
          description="Não poderá acessá-lo novamente."
          yesText="Excluir"
        />
      )}
      <AlertCard show={!!error} onClose={() => setError(null)}>
        {error}
      </AlertCard>
    </Card>
  );
}

export default TrainingCard;
