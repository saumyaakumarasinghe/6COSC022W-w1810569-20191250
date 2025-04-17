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
import { AxiosError } from "axios";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  role: "ADMIN" | "USER";
  status: boolean;
  lastActivateAt: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
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
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const storedApiKey = localStorage.getItem("apiKey");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      if (storedApiKey) {
        api.defaults.headers.common["x-api-key"] = storedApiKey;
      }
    }
    setIsInitialized(true);
  }, []);

  // Handle routing based on auth state
  useEffect(() => {
    if (!isInitialized) return;

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
    const isLoggedIn = !!token;

    if (!isLoggedIn && !isPublicRoute) {
      router.push("/login");
    } else if (isLoggedIn && isPublicRoute && pathname !== "/") {
      router.push("/countries");
    }
  }, [isInitialized, token, pathname, router]);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await api.post("oauth/login", { email, password });
        const {
          token: newToken,
          user: userData,
          apiKey: userApiKey,
        } = response.data;

        // Update state and storage in a single batch
        setToken(newToken);
        setUser(userData);
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("apiKey", userApiKey);

        // Update API headers
        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        api.defaults.headers.common["x-api-key"] = userApiKey;

        router.push("/countries");
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(error.response?.data?.message || "Login failed");
        }
        throw new Error("Login failed");
      }
    },
    [router],
  );

  const logout = useCallback(() => {
    // Clear state and storage in a single batch
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("apiKey");

    // Clean up API headers
    delete api.defaults.headers.common["Authorization"];
    delete api.defaults.headers.common["x-api-key"];

    router.push("/login");
  }, [router]);

  const value = useMemo(
    () => ({
      isLoggedIn: !!token,
      user,
      token,
      login,
      logout,
    }),
    [token, user, login, logout],
  );

  if (!isInitialized) {
    return null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
