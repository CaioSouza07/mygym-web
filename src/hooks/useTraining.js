import { useContext } from "react";
import { TrainingContext } from "../contexts/Training/TrainingContext";

export function useTraining() {
  const context = useContext(TrainingContext);
  if (!context) {
    throw new Error("useTraining deve ser usado dentro de TrainingProvider");
  }
  return context;
}
