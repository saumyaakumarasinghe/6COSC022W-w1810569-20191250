"use client"; // Marks this as a client-side component

// React and Axios imports
import { useState, useCallback, useEffect } from "react";
import { AxiosError } from "axios";

// Icon imports
import {
  CopyIcon,
  PlusIcon,
  Trash2,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

// Internal API and error handler
import api from "@/lib/api";
import { useErrorHandler } from "@/hooks/use-error-handler";

// UI components
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Spinner,
} from "@/components/ui";

// Type definitions
interface ApiKeyInteraction {
  id: number;
  apiKeyId: number;
  userId: number;
  log: string;
  createdAt: string;
  User?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  } | null;
}

interface ApiKey {
  id: number;
  key: string;
  userId: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  User?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  } | null;
}

interface ApiKeyManagerProps {
  apiKeys: ApiKey[] | null | undefined;
  onKeyAdded?: () => void;
  onKeyDeleted?: () => void;
  onError?: (error: string) => void;
}

// Main API Key Manager Component
export function ApiKeyManager({
  apiKeys = [],
  onKeyAdded,
  onKeyDeleted,
  onError,
}: ApiKeyManagerProps) {
  // State management
  const [loading, setLoading] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [currentApiKey, setCurrentApiKey] = useState<string | null>(null);
  const [expandedApiKeyId, setExpandedApiKeyId] = useState<number | null>(null);
  const [interactions, setInteractions] = useState<ApiKeyInteraction[]>([]);
  const [loadingInteractions, setLoadingInteractions] = useState(false);
  const handleError = useErrorHandler();

  // Load current API key from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedApiKey = localStorage.getItem("apiKey");
      setCurrentApiKey(storedApiKey);
    }
  }, []);

  // Generate a new API key
  const generateKey = useCallback(async () => {
    try {
      setLoading(true);
      await api.post("/api-key");
      if (typeof onKeyAdded === "function") onKeyAdded();
    } catch (err) {
      const error = err as AxiosError<{ message?: string; error?: string }>;
      if (!handleError(error) && typeof onError === "function") {
        onError(error.message || "Failed to generate API key");
      }
    } finally {
      setLoading(false);
    }
  }, [handleError, onKeyAdded, onError]);

  // Delete an existing API key
  const deleteKey = useCallback(
    async (id: number) => {
      try {
        setLoading(true);
        await api.delete(`/api-key/${id}`);
        if (typeof onKeyDeleted === "function") onKeyDeleted();
      } catch (err) {
        const error = err as AxiosError<{ message?: string; error?: string }>;
        if (!handleError(error) && typeof onError === "function") {
          onError(error.message || "Failed to delete API key");
        }
      } finally {
        setLoading(false);
      }
    },
    [handleError, onKeyDeleted, onError],
  );

  // Copy API key to clipboard
  const copyToClipboard = useCallback((key: string) => {
    if (key && navigator.clipboard) {
      navigator.clipboard.writeText(key);
      setSelectedKey(key);
      setTimeout(() => setSelectedKey(null), 2000); // Reset label after 2s
    }
  }, []);

  // Check if a key is the current API key
  const isCurrentKey = useCallback(
    (key?: string) => key != null && currentApiKey === key,
    [currentApiKey],
  );

  // Expand/collapse and fetch usage interactions for a key
  const toggleInteractions = useCallback(
    async (apiKeyId?: number) => {
      if (apiKeyId == null) return;

      if (expandedApiKeyId === apiKeyId) {
        setExpandedApiKeyId(null); // Collapse if already expanded
        return;
      }

      try {
        setLoadingInteractions(true);
        setExpandedApiKeyId(apiKeyId);
        const response = await api.get(`/api-key-interaction/${apiKeyId}`);
        setInteractions(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        const error = err as AxiosError<{ message?: string; error?: string }>;
        if (!handleError(error) && typeof onError === "function") {
          onError(error.message || "Failed to fetch API key interactions");
        }
        setExpandedApiKeyId(null); // Collapse on error
      } finally {
        setLoadingInteractions(false);
      }
    },
    [expandedApiKeyId, handleError, onError],
  );

  // Normalize API key input to always return an array
  const safeApiKeys = Array.isArray(apiKeys) ? apiKeys : [];

  // Render fallback when no API keys are available
  if (!safeApiKeys.length) {
    return (
      <div className="text-center py-6">
        <p className="text-muted-foreground mb-4">No API keys found</p>
        <Button onClick={generateKey} disabled={loading}>
          {loading ? (
            <Spinner className="mr-2" size={16} />
          ) : (
            <PlusIcon className="w-4 h-4 mr-2" />
          )}
          Generate API Key
        </Button>
      </div>
    );
  }

  // Main UI render
  return (
    <div className="space-y-4">
      {/* Generate key button */}
      <div className="flex justify-end">
        <Button onClick={generateKey} disabled={loading}>
          {loading ? (
            <Spinner className="mr-2" size={16} />
          ) : (
            <PlusIcon className="w-4 h-4 mr-2" />
          )}
          Generate API Key
        </Button>
      </div>

      {/* API key table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead style={{ width: "40px" }}></TableHead>
              <TableHead>API Key</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {safeApiKeys.map((apiKey) => (
              <>
                {/* API key row */}
                <TableRow
                  key={apiKey?.id ?? "unknown"}
                  className={isCurrentKey(apiKey?.key) ? "bg-blue-50" : ""}
                >
                  {/* Expand/collapse toggle */}
                  <TableCell style={{ padding: "0 0 0 16px" }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => toggleInteractions(apiKey?.id)}
                    >
                      {loadingInteractions &&
                      expandedApiKeyId === apiKey?.id ? (
                        <Spinner size={16} />
                      ) : expandedApiKeyId === apiKey?.id ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>

                  {/* API key preview */}
                  <TableCell className="font-mono text-sm">
                    {apiKey?.key ? `${apiKey.key.substring(0, 32)}...` : "N/A"}
                    {isCurrentKey(apiKey?.key) && (
                      <span className="ml-2 text-xs text-blue-600 font-medium">
                        (Current)
                      </span>
                    )}
                  </TableCell>

                  {/* User info */}
                  <TableCell>
                    {apiKey?.User ? (
                      <div>
                        <div className="font-medium">
                          {`${apiKey.User.firstName || ""} ${apiKey.User.lastName || ""}`.trim() ||
                            "Unnamed User"}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {apiKey.User.email || "No email"}
                        </div>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">
                        Unknown user
                      </span>
                    )}
                  </TableCell>

                  {/* Created date */}
                  <TableCell>
                    {apiKey?.createdAt
                      ? new Date(apiKey.createdAt).toLocaleDateString()
                      : "Unknown date"}
                  </TableCell>

                  {/* Status badge */}
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        apiKey?.status
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {apiKey?.status ? "Active" : "Inactive"}
                    </span>
                  </TableCell>

                  {/* Action buttons */}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          apiKey?.key && copyToClipboard(apiKey.key)
                        }
                        disabled={!apiKey?.key}
                      >
                        <CopyIcon className="w-4 h-4 mr-2" />
                        {selectedKey === apiKey?.key ? "Copied!" : "Copy"}
                      </Button>

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          apiKey?.id != null && deleteKey(apiKey.id)
                        }
                        disabled={
                          loading ||
                          isCurrentKey(apiKey?.key) ||
                          apiKey?.id == null
                        }
                        title={
                          isCurrentKey(apiKey?.key)
                            ? "Cannot delete the API key currently in use"
                            : "Delete API key"
                        }
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>

                {/* Usage history expansion row */}
                {expandedApiKeyId === apiKey?.id && (
                  <TableRow>
                    <TableCell colSpan={6} className="p-0">
                      <div className="bg-gray-50 border-t p-4">
                        <h4 className="text-sm font-medium mb-2">
                          API Key Usage History
                        </h4>

                        {loadingInteractions ? (
                          <div className="flex justify-center p-4">
                            <Spinner size={24} />
                          </div>
                        ) : interactions.length === 0 ? (
                          <p className="text-center text-muted-foreground text-sm py-4">
                            No usage history found for this API key
                          </p>
                        ) : (
                          <div className="rounded-md border overflow-hidden bg-white">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Date & Time</TableHead>
                                  <TableHead>Endpoint</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {interactions.map((interaction) => (
                                  <TableRow
                                    key={
                                      interaction?.id ??
                                      `interaction-${Math.random()}`
                                    }
                                  >
                                    <TableCell>
                                      {interaction?.createdAt
                                        ? new Date(
                                            interaction.createdAt,
                                          ).toLocaleString()
                                        : "Unknown date"}
                                    </TableCell>
                                    <TableCell className="font-mono text-xs">
                                      {interaction?.log ?? "No log data"}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
