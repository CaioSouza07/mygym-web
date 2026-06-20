import { tokenStorage } from "./tokenStorage";

const API_BASE = import.meta.env.VITE_API_BASE;

class ApiError extends Error {
  constructor(message, status, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

async function refreshAccessToken() {
  const res = await fetch(`${API_BASE}/auth/refresh`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);

    tokenStorage.clearToken();

    throw new Error(errorData?.message || "Falha ao renovar sessão");
  }

  const data = await res.json();

  tokenStorage.setToken(data.accessToken);

  return data.accessToken;
}

async function request(endpoint, options = {}) {
  const token = tokenStorage.getToken();
  const config = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const res = await fetch(`${API_BASE}${endpoint}`, config);

  const publicEndpoints = ["/auth/login", "/auth/register", "/auth/refresh"];

  if (res.status === 401 && !publicEndpoints.includes(endpoint)) {
    try {
      const newToken = await refreshAccessToken();

      const retryConfig = {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${newToken}`,
        },
      };

      const retryRes = await fetch(`${API_BASE}${endpoint}`, retryConfig);

      if (!retryRes.ok) {
        const errorData = await retryRes.json().catch(() => null);

        throw new ApiError(
          errorData?.message || `Erro HTTP ${retryRes.status}`,
          retryRes.status,
          errorData?.details || null,
        );
      }

      return retryRes.status === 204 ? null : retryRes.json();
    } catch (error) {
      tokenStorage.clearToken();

      // window.location.href = "/login";

      throw error;
    }
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new ApiError(
      errorData?.message || `Erro HTTP ${res.status}`,
      res.status,
      errorData?.details || null,
    );
  }

  return res.status === 204 ? null : res.json();
}

export const api = {
  get: (endpoint) => request(endpoint),
  post: (endpoint, data) =>
    request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  put: (endpoint, data) =>
    request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (endpoint) => request(endpoint, { method: "DELETE" }),
};
