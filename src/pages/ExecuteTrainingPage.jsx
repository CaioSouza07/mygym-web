import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { getTrainingById } from "../services/trainingsService";
import LayoutPage from "../components/layout/LayoutPage";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Trophy } from "lucide-react";
import ExerciseCard from "../components/ExerciseCard";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";
import AlertCard from "../components/ui/AlertCard";

function ExecuteTrainingPage() {
  const { id } = useParams();
  const [training, setTraining] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const data = await getTrainingById(id);
        setTraining(data);

        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  return (
    <LayoutPage>
      <Helmet>
        <title>Executar Treino - MyGym</title>
      </Helmet>
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-white/70 hover:text-white cursor-pointer self-start"
      >
        <ArrowLeft size={20} />
        <span>Voltar</span>
      </button>

      <div className="flex flex-col w-full">
        <h1 className="text-white text-2xl font-semibold w-full">
          {training?.name}
        </h1>
        <h3 className="text-white/70 w-full">Sessão ativa</h3>
      </div>
      {training?.exercises.map((exercise) => {
        return <ExerciseCard key={exercise.id} exercise={exercise} />;
      })}
      <Button className="max-w-1/2 gap-2">Finalizar Treino</Button>
      {loading && <Spinner />}
      <AlertCard show={!!error}>{error}</AlertCard>
    </LayoutPage>
  );
}

export default ExecuteTrainingPage;
