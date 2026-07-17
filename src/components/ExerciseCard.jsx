import { useState } from "react";
import SerieCard from "./SerieCard";
import Card from "./ui/Card";

function ExerciseCard({ exercise }) {
  const [series, setSeries] = useState(
    exercise?.series?.map((serie) => ({
      ...serie,
      completed: false,
    })),
  );

  const handleSerieCompleted = (id) => {
    console.log("setando");
    setSeries((prev) =>
      prev.map((serie) =>
        serie.id === id ? { ...serie, completed: !serie.completed } : serie,
      ),
    );
  };

  return (
    <Card key={exercise.id} className="flex flex-col gap-4">
      <h2 className="text-white w-full font-semibold text-xl truncate">
        {exercise.name}
      </h2>
      <div className="flex flex-col w-full gap-2">
        {series.map((serie) => {
          return (
            <SerieCard
              checked={serie.completed}
              key={serie.id}
              serie={serie}
              onClick={() => handleSerieCompleted(serie.id)}
            />
          );
        })}
      </div>
    </Card>
  );
}

export default ExerciseCard;
