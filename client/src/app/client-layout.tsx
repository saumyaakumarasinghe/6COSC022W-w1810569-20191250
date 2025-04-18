"use client"; // Marks this component as a client-side component in Next.js

// Import the authentication context provider
import { AuthProvider } from "@/contexts/auth-context";

// Wraps children components with AuthProvider to give them access to auth context
export function ClientLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
