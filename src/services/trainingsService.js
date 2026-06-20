import { api } from "./api";

export async function getTrainings() {
  const data = await api.get("/training");
  return data;
}
