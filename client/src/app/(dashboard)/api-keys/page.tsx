"use client";

import { useState, useEffect, useCallback } from "react";
import { AxiosError } from "axios";
import api from "@/lib/api";
import { useErrorHandler } from "@/hooks/use-error-handler";
import { ApiKeyManager } from "@/components/common/api-key-manager";
import { Spinner, ErrorMessage } from "@/components/ui";

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
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const handleError = useErrorHandler();

  const fetchApiKeys = useCallback(async () => {
    try {
      const response = await api.get("/api-key/");
      setApiKeys(response.data);
      setError("");
    } catch (err) {
      const error = err as AxiosError<{ message?: string; error?: string }>;
      if (!handleError(error)) {
        setError(error.message || "Failed to fetch API keys");
      }
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  useEffect(() => {
    fetchApiKeys();
  }, [fetchApiKeys]);

  if (error) {
    return (
      <div className="p-6">
        <ErrorMessage message={error} onRetry={fetchApiKeys} />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <Spinner size={32} />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">API Keys</h1>
      <ApiKeyManager
        apiKeys={apiKeys}
        onKeyAdded={fetchApiKeys}
        onKeyDeleted={fetchApiKeys}
        onError={setError}
      />
    </div>
  );
}
