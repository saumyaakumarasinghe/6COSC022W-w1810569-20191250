"use client"; // This module must run on the client side

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

// Define the shape of the user object
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

// Define the shape of the authentication context
interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the context with an undefined default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// List of routes that can be accessed without authentication
const PUBLIC_ROUTES = ["/", "/login", "/register"];

// AuthProvider wraps the application and provides auth state
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Initialize auth state from localStorage (client-only)
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

  // Route protection: redirect users based on their auth state
  useEffect(() => {
    if (!isInitialized) return;

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
    const isLoggedIn = !!token;

    if (!isLoggedIn && !isPublicRoute) {
      router.push("/login"); // Redirect unauthenticated users
    } else if (isLoggedIn && isPublicRoute && pathname !== "/") {
      router.push("/countries"); // Redirect logged-in users away from login/register
    }
  }, [isInitialized, token, pathname, router]);

  // Login function to authenticate the user
  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await api.post("oauth/login", { email, password });
        const {
          token: newToken,
          user: userData,
          apiKey: userApiKey,
        } = response.data;

        // Update state and persist data to localStorage
        setToken(newToken);
        setUser(userData);
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("apiKey", userApiKey);

        // Attach tokens to all outgoing requests
        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        api.defaults.headers.common["x-api-key"] = userApiKey;

        // Redirect to dashboard
        router.push("/countries");
      } catch (error) {
        if (error instanceof AxiosError) {
          // Custom error handling for deactivated users
          if (
            error.response?.status === 403 &&
            error.response?.data?.message === "User not active"
          ) {
            throw new Error(
              "Your account has been deactivated. Please contact an administrator.",
            );
          }
          throw new Error(error.response?.data?.message || "Login failed");
        }
        throw new Error("Login failed");
      }
    },
    [router],
  );

  // Logout function to clear state and storage
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("apiKey");

    delete api.defaults.headers.common["Authorization"];
    delete api.defaults.headers.common["x-api-key"];

    router.push("/login"); // Redirect to login
  }, [router]);

  // Memoized context value to prevent unnecessary re-renders
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

  // Prevent rendering children until initialization is complete
  if (!isInitialized) {
    return null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook for using the auth context in any component
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
