"use client";

import { useState, useCallback } from "react";
import { AxiosError } from "axios";
import { CopyIcon, PlusIcon, Trash2 } from "lucide-react";
import api from "@/lib/api";
import { useErrorHandler } from "@/hooks/use-error-handler";
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

interface ApiKey {
  id: number;
  key: string;
  userId: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ApiKeyManagerProps {
  apiKeys: ApiKey[];
  onKeyAdded?: () => void;
  onKeyDeleted?: () => void;
  onError?: (error: string) => void;
}

export function ApiKeyManager({
  apiKeys,
  onKeyAdded,
  onKeyDeleted,
  onError,
}: ApiKeyManagerProps) {
  const [loading, setLoading] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const handleError = useErrorHandler();

  const generateKey = useCallback(async () => {
    try {
      setLoading(true);
      await api.post("/api-key");
      onKeyAdded?.();
    } catch (err) {
      const error = err as AxiosError<{ message?: string; error?: string }>;
      if (!handleError(error)) {
        onError?.(error.message || "Failed to generate API key");
      }
    } finally {
      setLoading(false);
    }
  }, [handleError, onKeyAdded, onError]);

  const deleteKey = useCallback(
    async (id: number) => {
      try {
        setLoading(true);
        await api.delete(`/api-key/${id}`);
        onKeyDeleted?.();
      } catch (err) {
        const error = err as AxiosError<{ message?: string; error?: string }>;
        if (!handleError(error)) {
          onError?.(error.message || "Failed to delete API key");
        }
      } finally {
        setLoading(false);
      }
    },
    [handleError, onKeyDeleted, onError],
  );

  const copyToClipboard = useCallback((key: string) => {
    navigator.clipboard.writeText(key);
    setSelectedKey(key);
    setTimeout(() => setSelectedKey(null), 2000);
  }, []);

  if (!apiKeys?.length) {
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

  return (
    <div className="space-y-4">
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

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>API Key</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apiKeys.map((apiKey) => (
              <TableRow key={apiKey.id}>
                <TableCell className="font-mono text-sm">
                  {apiKey.key.substring(0, 32)}...
                </TableCell>
                <TableCell>
                  {new Date(apiKey.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      apiKey.status
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {apiKey.status ? "Active" : "Inactive"}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(apiKey.key)}
                    >
                      <CopyIcon className="w-4 h-4 mr-2" />
                      {selectedKey === apiKey.key ? "Copied!" : "Copy"}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteKey(apiKey.id)}
                      disabled={loading}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
