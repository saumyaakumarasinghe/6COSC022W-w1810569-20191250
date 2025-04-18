"use client"; // This marks the component as client-side in Next.js

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useForm } from "react-hook-form"; // Hook for form management
import { z } from "zod"; // Schema-based validation library
import { zodResolver } from "@hookform/resolvers/zod"; // Resolver to connect Zod with react-hook-form

// Define the login validation schema using Zod
const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

// Infer the TypeScript type from the schema
type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login } = useAuth(); // Custom authentication context

  const [error, setError] = useState(""); // State for displaying server errors
  const [loading, setLoading] = useState(false); // Loading state

  // Set up react-hook-form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Form submission handler
  async function onSubmit(data: LoginFormData) {
    setError(""); // Reset any previous error
    setLoading(true); // Start loading indicator

    try {
      await login(data.email, data.password); // Attempt login with provided credentials
    } catch (err: any) {
      // Show error if login fails
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false); // Stop loading indicator
    }
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8">
        {/* Page title and subtitle */}
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">
            Please sign in to access your account
          </p>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Display server error */}
          {error && (
            <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
              {error}
            </div>
          )}

          {/* Email field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password field */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Submit button */}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>

          {/* Registration link */}
          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
