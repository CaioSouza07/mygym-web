import { useEffect, useState } from "react";

function useWorkoutSession(trainingId, training) {
  const storageKey = `active-workout-${trainingId}`;

  const [seriesState, setSeriesState] = useState({});
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!training) return;

    const saved = localStorage.getItem(storageKey);

    if (saved) {
      try {
        const session = JSON.parse(saved);

        setSeriesState(session.seriesState ?? {});
        setInitialized(true);

        return;
      } catch {
        localStorage.removeItem(storageKey);
      }
    }

    const initialState = {};

    training.exercises.forEach((exercise) => {
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
    setInitialized(true);
  }, [storageKey, training]);

  useEffect(() => {
    if (!initialized) return;

    const session = {
      seriesState,
      lastUpdatedAt: Date.now(),
    };

    localStorage.setItem(storageKey, JSON.stringify(session));
  }, [storageKey, seriesState, initialized]);

  const clearSession = () => {
    localStorage.removeItem(storageKey);
    setSeriesState({});
  };

  return {
    seriesState,
    setSeriesState,
    clearSession,
    initialized,
  };
}

export default useWorkoutSession;
