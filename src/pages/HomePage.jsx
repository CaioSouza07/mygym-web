import Header from "../components/layout/Header";
import TrainingToday from "../components/TrainingToday";

function HomePage() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="flex w-full flex-col items-center min-h-screen p-4 gap-6 max-w-250">
        <Header />
        <TrainingToday />
      </div>
    </div>
  );
}

export default HomePage;
