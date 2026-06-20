import { useEffect, useState } from "react";
import { getTrainings } from "../../services/trainingsService";
import { TrainingContext } from "./TrainingContext";
import { useAuth } from "../../hooks/useAuth";

export function TrainingProvider({ children }) {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useAuth();

  async function reload() {
    try {
      setLoading(true);

      const data = await getTrainings();

      setTrainings(data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const data = await getTrainings();

        setTrainings(data);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    if (!user) return;
    fetchData();
  }, [user]);

  return (
    <TrainingContext.Provider
      value={{
        trainings,
        loading,
        error,
        reload,
      }}
    >
      {children}
    </TrainingContext.Provider>
  );
}
