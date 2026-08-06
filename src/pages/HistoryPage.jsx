import { useCallback, useContext, useEffect, useState } from "react";
import LayoutPage from "../components/layout/LayoutPage";
import { Helmet } from "react-helmet-async";
import MenuDropdown from "../components/ui/MenuDropdown";
import { TrainingContext } from "../contexts/Training/TrainingContext";
import { getHistoryExercise } from "../services/historyService";
import Spinner from "../components/ui/Spinner";
import HistoryCard from "../components/HistoryCard";
import AlertCard from "../components/ui/AlertCard";
import { ChevronLeft, ChevronRight, Dumbbell } from "lucide-react";
import LoadProgressionChart from "../components/LoadProgressionChart";

const PAGE_SIZE = 10;

function HistoryPage() {
  const { exercises } = useContext(TrainingContext);

  const [exerciseView, setExerciseView] = useState(exercises[0]?.id ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [historyExercise, setHistoryExercise] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const fetchData = useCallback(
    async (pageNumber) => {
      if (!exerciseView) return;
      setLoading(true);
      setError(null);

      try {
        const data = await getHistoryExercise(
          exerciseView,
          pageNumber,
          PAGE_SIZE,
        );
        setHistoryExercise(data.content);
        setTotalPages(data.totalPages);
        setTotalElements(data.totalElements);
        setPage(data.number);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [exerciseView],
  );

  useEffect(() => {
    fetchData(0);
  }, [fetchData]);

  function handlePrevPage() {
    if (page > 0) {
      fetchData(page - 1);
    }
  }

  function handleNextPage() {
    if (page < totalPages - 1) {
      fetchData(page + 1);
    }
  }

  const selectedExercise = exercises.find((ex) => ex.id === exerciseView);
  const isEmpty = !loading && !error && historyExercise?.length === 0;

  return (
    <LayoutPage>
      <Helmet>
        <title>Histórico - MyGym</title>
      </Helmet>
      <h1 className="text-white text-2xl font-semibold w-full">
        Histórico de Treinos
      </h1>
      <div className="flex flex-col w-full">
        <h2 className="text-lg text-[#858385] font-medium">Exercício</h2>
        <MenuDropdown
          id="exercise"
          options={exercises}
          value={exerciseView}
          onChange={(e) => setExerciseView(e.target.value)}
        />
      </div>
      {loading && <Spinner />}

      {!loading && !isEmpty && (
        <>
          <LoadProgressionChart data={historyExercise} />

          <div className="flex flex-col w-full gap-2">
            <h2 className="text-xl text-white font-medium">Registros</h2>
            {historyExercise?.map((history) => (
              <HistoryCard
                key={history?.id}
                history={history}
                exerciseName={selectedExercise?.name}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t border-white/10 gap-4">
              <span className="font-poppins text-xs text-white/40">
                {totalElements} registros no total
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevPage}
                  disabled={page === 0}
                  className="p-2 rounded-lg border border-white/10 text-white/60 hover:text-white hover:border-[#FFCC00]/50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all"
                  aria-label="Página anterior"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="font-poppins text-sm text-white/70 px-2">
                  {page + 1} / {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={page >= totalPages - 1}
                  className="p-2 rounded-lg border border-white/10 text-white/60 hover:text-white hover:border-[#FFCC00]/50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all"
                  aria-label="Próxima página"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {isEmpty && (
        <div className="flex flex-col items-center justify-center text-center w-full py-12 px-4 gap-4 border border-dashed border-white/10 rounded-2xl">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#FFCC00]/10">
            <Dumbbell size={26} className="text-[#FFCC00]" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-white font-medium">Nenhum registro encontrado</p>
            <p className="text-sm text-white/50 max-w-xs">
              {selectedExercise?.name
                ? `Você ainda não registrou nenhum treino de ${selectedExercise.name}.`
                : "Você ainda não registrou nenhum treino para este exercício."}
            </p>
          </div>
        </div>
      )}

      <AlertCard show={!!error} onClose={() => setError(null)}>
        {error}
      </AlertCard>
    </LayoutPage>
  );
}

export default HistoryPage;
