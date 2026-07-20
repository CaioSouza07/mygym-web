import { api } from "./api";

export async function getHistory() {
  const response = await api.get("/history");
  return response;
}

export async function saveHistory(data) {
  const response = await api.post("/history", data);
  return response;
}
