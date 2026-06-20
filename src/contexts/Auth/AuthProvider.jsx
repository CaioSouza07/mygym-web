import { useCallback, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { api } from "../../services/api";
import { tokenStorage } from "../../services/tokenStorage";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      try {
        // const refresh = await api.post("/auth/refresh");
        // tokenStorage.setToken(refresh.accessToken);

        const user = await api.get("/users/me");

        setUser(user);
      } catch {
        tokenStorage.clearToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadSession();
  }, []);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });

      const token = res.token;
      tokenStorage.setToken(token);

      const userApi = res.user;
      setUser(userApi);

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
      tokenStorage.setToken(token);

      const userApi = res.user;
      setUser(userApi);

      return res;
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error(error);
    } finally {
      tokenStorage.clearToken();
      setUser(null);
    }
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
