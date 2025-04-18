import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useAuth } from "@/contexts/auth-context";

// Custom hook to handle common API error responses (e.g., auth issues)
export function useErrorHandler() {
  const router = useRouter();
  const { logout } = useAuth();

  return useCallback(
    (error: AxiosError<{ message?: string; error?: string }>): boolean => {
      // If unauthorized (401), log out the user and return handled = true
      if (error.response?.status === 401) {
        logout();
        return true;
      }

      // If forbidden (403), redirect to safe route and return handled = true
      if (error.response?.status === 403) {
        router.push("/countries");
        return true;
      }

      // Otherwise, the error wasn't handled here
      return false;
    },
    [router, logout],
  );
}
