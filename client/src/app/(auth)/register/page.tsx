"use client"; // This marks the component as a client-side component in Next.js

// UI component imports
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Core dependencies
import { useState } from "react";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

// Form handling and validation libraries
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the schema for form validation using Zod
const registerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  mobile: z.string().min(10, "Please enter a valid mobile number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Infer the TypeScript type from the schema
type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  // Local state for managing error and loading states
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Navigation hook

  // useForm hook for managing form data and validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema), // Use Zod as the validation resolver
  });

  // Form submission handler
  async function onSubmit(data: RegisterFormData) {
    setError("");
    setLoading(true);

    try {
      // Send form data to the API for registration
      await api.post("oauth/register", data);

      // Redirect to login page on success
      router.push("/login");
    } catch (error) {
      // Handle API error responses
      if (error instanceof AxiosError) {
        setError(error.response?.data?.message || "Registration failed");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false); // Stop loading indicator
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      {/* Wrapper card for the registration form */}
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Enter your details below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Registration form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                {/* First Name field */}
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    {...register("firstName")}
                    id="firstName"
                    type="text"
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-500">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                {/* Last Name field */}
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input {...register("lastName")} id="lastName" type="text" />
                  {errors.lastName && (
                    <p className="text-sm text-red-500">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>

                {/* Email field */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Mobile Number field */}
                <div className="grid gap-2">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input
                    {...register("mobile")}
                    id="mobile"
                    type="tel"
                    placeholder="+1234567890"
                  />
                  {errors.mobile && (
                    <p className="text-sm text-red-500">
                      {errors.mobile.message}
                    </p>
                  )}
                </div>

                {/* Password field */}
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...register("password")}
                    id="password"
                    type="password"
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Display form submission error */}
                {error && <div className="text-sm text-red-500">{error}</div>}

                {/* Submit button */}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating account..." : "Create account"}
                </Button>
              </div>

              {/* Navigation link to login page */}
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Login here
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
