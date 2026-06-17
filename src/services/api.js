const API_BASE = import.meta.env.VITE_API_BASE;

class ApiError extends Error {
  constructor(message, status, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const res = await fetch(`${API_BASE}${endpoint}`, config);

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
