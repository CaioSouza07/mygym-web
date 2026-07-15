import { api } from "./api";

export async function getTrainings() {
  const response = await api.get("/training");
  return response;
}

export async function getTrainingById(id) {
  const response = await api.get(`/training/${id}`);
  return response;
}

export async function createTraining(data) {
  const response = await api.post("/training", data);
  return response;
}

export async function updateTraining(id, data) {
  const response = await api.put(`/training/${id}`, data);
  return response;
}
