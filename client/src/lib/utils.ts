import { clsx, type ClassValue } from "clsx"; // Utility to conditionally join class names
import { twMerge } from "tailwind-merge"; // Tailwind-aware merge to avoid conflicting classes

// Combines multiple class names intelligently:
// - `clsx` handles conditional logic
// - `twMerge` resolves Tailwind class conflicts (e.g., "p-2 p-4" => "p-4")
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
