import { api } from "./api";

export async function getHistoryExercise(id, pageNumber, PAGE_SIZE) {
  const response = await api.get(
    `/history/${id}?page=${pageNumber}&size=${PAGE_SIZE}`,
  );
  return response;
}

export async function saveHistory(data) {
  const response = await api.post("/history", data);
  return response;
}
