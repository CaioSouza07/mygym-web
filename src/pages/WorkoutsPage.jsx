import { Helmet } from "react-helmet-async";
import LayoutPage from "../components/layout/LayoutPage";
import TitleWorkouts from "../components/TitleWorkouts";
import { useTraining } from "../hooks/useTraining";
import TrainingCard from "../components/TrainingCard";

function WorkoutsPage() {
  const { trainings } = useTraining();
  return (
    <LayoutPage>
      <Helmet>
        <title>Workouts - MyGym</title>
      </Helmet>
      <TitleWorkouts />
      {trainings &&
        trainings.map((training) => {
          return <TrainingCard key={training.id} training={training} />;
        })}
    </LayoutPage>
  );
}

export default WorkoutsPage;
