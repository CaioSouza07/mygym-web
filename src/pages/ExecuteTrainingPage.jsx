import { useNavigate, useParams } from "react-router";
import { useContext, useCallback, useEffect, useState } from "react";
import { getTrainingById } from "../services/trainingsService";
import LayoutPage from "../components/layout/LayoutPage";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Trophy } from "lucide-react";
import ExerciseCard from "../components/ExerciseCard";
import ModalConfirmation from "../components/ModalConfirmation";
import ModalCongratulations from "../components/ModalCongratulations";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";
import AlertCard from "../components/ui/AlertCard";
import { saveHistory } from "../services/historyService";
import TimerTraining from "../components/TimerTraining";
import { AuthContext } from "../contexts/Auth/AuthContext";

function ExecuteTrainingPage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [training, setTraining] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timer, setTimer] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [timestampTimer, setTimestampTimer] = useState(null);

  const navigate = useNavigate();

  const [seriesState, setSeriesState] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getTrainingById(id);
        setTraining(data);

        const initialState = {};
        data.exercises.forEach((exercise) => {
          initialState[exercise.id] = {};
          exercise.series.forEach((serie) => {
            initialState[exercise.id][serie.id] = {
              completed: false,
              kg: "",
              reps: "",
            };
          });
        });
        setSeriesState(initialState);

        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const handleToggleCompleted = (exerciseId, serieId) => {
    setSeriesState((prev) => {
      const currentCompleted = prev[exerciseId][serieId].completed;

      const newCompleted = !currentCompleted;

      if (newCompleted) {
        setTimer(true);
        setTimestampTimer(Date.now())
      }

      return {
        ...prev,
        [exerciseId]: {
          ...prev[exerciseId],
          [serieId]: {
            ...prev[exerciseId][serieId],
            completed: newCompleted,
          },
        },
      };
    });
  };

  const handleChangeKg = (exerciseId, serieId, value) => {
    setSeriesState((prev) => ({
      ...prev,
      [exerciseId]: {
        ...prev[exerciseId],
        [serieId]: {
          ...prev[exerciseId][serieId],
          kg: value,
        },
      },
    }));
  };

  const handleChangeReps = (exerciseId, serieId, value) => {
    setSeriesState((prev) => ({
      ...prev,
      [exerciseId]: {
        ...prev[exerciseId],
        [serieId]: {
          ...prev[exerciseId][serieId],
          reps: value,
        },
      },
    }));
  };

  const handleExecuteTraining = async () => {
    setLoading(true);
    const estimate1RM = (kg, reps) => kg * (1 + reps / 30);

    try {
      const payload = {
        trainingId: id,
        exercises: training.exercises
          .map((exercise) => {
            const seriesData = exercise.series.map((serie) => {
              const state = seriesState[exercise.id]?.[serie.id];
              return {
                serieId: serie.id,
                order: serie.order,
                targetReps: serie.repetitions,
                actualReps: state?.reps || null,
                kg: state?.kg || null,
                completed: state?.completed || false,
              };
            });

            const completedSeries = seriesData.filter(
              (s) =>
                s.completed && s.kg != null && s.kg > 0 && s.actualReps != null,
            );

            let weight = 0;
            if (completedSeries.length > 0) {
              const best = completedSeries.reduce(
                (acc, s) => {
                  const score = estimate1RM(s.kg, s.actualReps);
                  return score > acc.score ? { score, kg: s.kg } : acc;
                },
                { score: -Infinity, kg: 0 },
              );

              weight = best.kg; // salva o PESO da melhor série, não o 1RM calculado
            }

            return {
              exerciseId: exercise.id,
              weight,
            };
          })
          .filter((exercise) => exercise.weight > 0),
      };

      if (payload.exercises.length === 0) {
        throw new Error(
          "Complete pelo menos uma série com peso maior que zero.",
        );
      }

      await saveHistory({ exercises: payload.exercises });
      setShowCongrats(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const totalSeries =
    training?.exercises.reduce((acc, ex) => acc + ex.series.length, 0) || 0;
  const completedSeries = Object.values(seriesState).reduce(
    (acc, exercise) =>
      acc + Object.values(exercise).filter((s) => s.completed).length,
    0,
  );

  const handleGoHome = useCallback(() => {
    navigate("/");
  }, [navigate]);
  console.log(user);
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
        <div className="flex items-center justify-between w-full">
          <h3 className="text-white/70">Sessão ativa</h3>
          {totalSeries > 0 && (
            <span className="text-xs text-zinc-400 font-medium">
              {completedSeries}/{totalSeries} séries
            </span>
          )}
        </div>
      </div>

      {timer && (
        <TimerTraining
          duration={user?.preferences?.defaultRestTime}
          onFinish={() => setTimer(false)}
          timestamp={timestampTimer}
        />
      )}

      {training?.exercises.map((exercise) => (
        <ExerciseCard
          key={exercise.id}
          exercise={exercise}
          seriesState={seriesState[exercise.id] || {}}
          onToggleCompleted={(serieId) =>
            handleToggleCompleted(exercise.id, serieId)
          }
          onChangeKg={(serieId, value) =>
            handleChangeKg(exercise.id, serieId, value)
          }
          onChangeReps={(serieId, value) =>
            handleChangeReps(exercise.id, serieId, value)
          }
        />
      ))}

      <Button className="max-w-1/2 gap-2" onClick={() => setOpenModal(true)}>
        <Trophy size={18} />
        Finalizar Treino
      </Button>

      {loading && <Spinner />}
      <AlertCard show={!!error} onClose={() => setError(false)}>
        {error}
      </AlertCard>
      {openModal && (
        <ModalConfirmation
          handleYes={() => {
            setOpenModal(false);
            handleExecuteTraining();
          }}
          handleClose={() => setOpenModal(false)}
          handleNo={() => setOpenModal(false)}
          title="Finalizar Treino"
          description="Deseja finalizar o treino de hoje? "
          yesText="Sim"
        />
      )}

      <ModalCongratulations
        open={showCongrats}
        onClose={handleGoHome}
        onGoHome={handleGoHome}
        completedSeries={completedSeries}
        totalSeries={totalSeries}
      />
    </LayoutPage>
  );
}

export default ExecuteTrainingPage;
