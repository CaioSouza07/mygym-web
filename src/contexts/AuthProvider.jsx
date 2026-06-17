import { useCallback, useState } from "react";
import { AuthContext } from "./AuthContext";
import { api } from "../services/api";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    const userApi = JSON.parse(localStorage.getItem("user"));
    return token && userApi ? { token, user: userApi } : null;
  });

  const [loading, setLoading] = useState(false);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });

      const token = res.token;
      localStorage.setItem("token", token);
      const userApi = res.user;
      localStorage.setItem("user", JSON.stringify(userApi));

      setUser({ token, user: userApi });

      return res;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/register", { name, email, password });

      const token = res.token;
      localStorage.setItem("token", token);

      const userApi = res.user;
      localStorage.setItem("user", JSON.stringify(userApi));

      setUser({ token, user: userApi });
      return res;
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
``;
