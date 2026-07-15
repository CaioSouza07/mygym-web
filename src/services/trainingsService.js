import { api } from "./api";

export async function getTrainings() {
  const response = await api.get("/training");
  return response;
}

export async function createTraining(data) {
  const response = await api.post("/training", data);
  return response;
}
