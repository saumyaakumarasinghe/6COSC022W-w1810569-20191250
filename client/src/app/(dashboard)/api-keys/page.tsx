"use client"; // Specifies that this is a client-side component in Next.js

import { useState, useEffect, useCallback } from "react"; // React hooks for state and lifecycle
import { AxiosError } from "axios"; // For handling Axios-specific error types
import api from "@/lib/api"; // Preconfigured Axios instance for API calls
import { useErrorHandler } from "@/hooks/use-error-handler"; // Custom hook to handle API errors
import { ApiKeyManager } from "@/components/common/api-key-manager"; // Component for managing API keys
import { Spinner, ErrorMessage } from "@/components/ui"; // Reusable UI components

// Interface for the shape of an API key object
interface ApiKey {
  id: number;
  key: string;
  userId: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  User?: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export default function ApiKeysPage() {
  // State for storing fetched API keys
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  // State to track loading status
  const [loading, setLoading] = useState(true);
  // State to hold any error messages
  const [error, setError] = useState("");

  const handleError = useErrorHandler(); // Hook for centralized error handling

  // Function to fetch API keys from backend
  const fetchApiKeys = useCallback(async () => {
    try {
      const response = await api.get("/api-key/"); // API call to fetch API keys
      setApiKeys(response.data); // Store data in state
      setError(""); // Clear previous errors
    } catch (err) {
      const error = err as AxiosError<{ message?: string; error?: string }>;
      // Use custom error handler; fallback to setting error message manually
      if (!handleError(error)) {
        setError(error.message || "Failed to fetch API keys");
      }
    } finally {
      setLoading(false); // Stop loading spinner
    }
  }, [handleError]);

  // Fetch API keys on component mount
  useEffect(() => {
    fetchApiKeys();
  }, [fetchApiKeys]);

  // Show error UI if fetching failed
  if (error) {
    return (
      <div className="p-6">
        <ErrorMessage message={error} onRetry={fetchApiKeys} />
      </div>
    );
  }

  // Show loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <Spinner size={32} />
      </div>
    );
  }

  // Render the API key manager with fetched data
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">API Keys</h1>
      <ApiKeyManager
        apiKeys={apiKeys}
        onKeyAdded={fetchApiKeys} // Refresh list after a key is added
        onKeyDeleted={fetchApiKeys} // Refresh list after a key is deleted
        onError={setError} // Allow child to report errors back to this component
      />
    </div>
  );
}
