import { api } from "./api";

export const userService = {
  getMe: () => api.get("/users/me"),
  updateProfile: (data) => api.patch("/users/me", data),
  changePassword: (data) => api.patch("/users/me/password", data),
};
