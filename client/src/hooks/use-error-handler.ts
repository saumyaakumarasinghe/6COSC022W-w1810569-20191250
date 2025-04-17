import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useAuth } from "@/contexts/auth-context";

export function useErrorHandler() {
  const router = useRouter();
  const { logout } = useAuth();

  return useCallback(
    (error: AxiosError<{ message?: string; error?: string }>) => {
      if (error.response?.status === 401) {
        logout();
        return true;
      }
      if (error.response?.status === 403) {
        router.push("/countries");
        return true;
      }
      return false;
    },
    [router, logout],
  );
}
