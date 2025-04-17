"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { api } from "@/lib/api";

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const PUBLIC_ROUTES = ["/", "/login", "/register"];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const storedApiKey = localStorage.getItem("apiKey");

    if (storedToken && storedUser && !PUBLIC_ROUTES.includes(pathname)) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      if (storedApiKey) {
        api.defaults.headers.common["x-api-key"] = storedApiKey;
      }
    } else if (!PUBLIC_ROUTES.includes(pathname) && !storedToken) {
      router.push("/login");
    }
  }, [pathname, router]);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await api.post("/oauth/login", { email, password });
        const {
          token: newToken,
          user: userData,
          apiKey: userApiKey,
        } = response.data;

        setToken(newToken);
        setUser(userData);

        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("apiKey", userApiKey);

        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        api.defaults.headers.common["x-api-key"] = userApiKey;

        router.push("/countries");
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    },
    [router],
  );

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("apiKey");
    delete api.defaults.headers.common["Authorization"];
    delete api.defaults.headers.common["x-api-key"];
    router.push("/login");
  }, [router]);

  const value = useMemo(
    () => ({
      isAuthenticated: !!token,
      user,
      token,
      login,
      logout,
    }),
    [token, user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
