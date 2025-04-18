"use client"; // Marks this file as a client-side component

// Imports for authentication and routing
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Props definition: children to render and allowed user roles
interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: ("ADMIN" | "USER")[];
}

// Role-based access control wrapper
export function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const { user } = useAuth(); // Access current authenticated user
  const router = useRouter(); // Router for redirecting

  // Redirect to /countries if user is not logged in or not in allowedRoles
  useEffect(() => {
    if (!user || !allowedRoles.includes(user.role)) {
      router.push("/countries");
    }
  }, [user, allowedRoles, router]);

  // Prevent rendering if user is not authorized
  if (!user || !allowedRoles.includes(user.role)) {
    return null;
  }

  // Render protected content if user has access
  return <>{children}</>;
}
