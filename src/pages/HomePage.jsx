import { Helmet } from "react-helmet-async";
import LayoutPage from "../components/layout/LayoutPage";
import TrainingToday from "../components/TrainingToday";
import WellcomeTitle from "../components/WellcomeTitle";
import WorkoutsWeek from "../components/WorkoutsWeek";

function HomePage() {
  return (
    <LayoutPage>
      <Helmet>
        <title>Home - MyGym</title>
      </Helmet>
      <WellcomeTitle />
      <TrainingToday />
      <WorkoutsWeek />
    </LayoutPage>
  );
}

export default HomePage;
