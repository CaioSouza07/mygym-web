import { Helmet } from "react-helmet-async";
import LayoutPage from "../components/layout/LayoutPage";
import TitleWorkouts from "../components/TitleWorkouts";
import { useTraining } from "../hooks/useTraining";
import TrainingCard from "../components/TrainingCard";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import AlertCard from "../components/ui/AlertCard";

function WorkoutsPage() {
  const { trainings } = useTraining();

  const navigate = useNavigate();
  const location = useLocation();
  const [success, setSuccess] = useState(location.state?.success || null);

  useEffect(() => {
    if (location.state?.success) {
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <LayoutPage>
      <Helmet>
        <title>Treinos - MyGym</title>
      </Helmet>
      <TitleWorkouts />
      {trainings &&
        trainings.map((training) => {
          return (
            <TrainingCard
              key={training.id}
              training={training}
              onClick={() => navigate(`/workouts/${training.id}/edit`)}
            />
          );
        })}
      <AlertCard
        show={!!success}
        type="success"
        onClose={() => setSuccess(null)}
      >
        {success}
      </AlertCard>
    </LayoutPage>
  );
}

export default WorkoutsPage;
