import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authApi } from "../services/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    authApi.me()
      .then(({ user: sessionUser }) => {
        if (active) setUser(sessionUser || null);
      })
      .catch(() => {
        if (active) setUser(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  async function login(username, password) {
    const data = await authApi.login(username, password);
    setUser(data.user);
    return data.user;
  }

  async function logout() {
    await authApi.logout();
    setUser(null);
  }

  const value = useMemo(() => ({ user, loading, login, logout }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth phải được dùng trong AuthProvider");
  return context;
}
