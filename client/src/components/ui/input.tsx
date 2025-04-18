import * as React from "react";

// Utility for combining conditional class names
import { cn } from "@/lib/utils";

// Reusable Input component with Tailwind styling
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type} // Allow dynamic input types (text, email, password, etc.)
      data-slot="input" // Used for component targeting (e.g., theming or testing)
      className={cn(
        // Base styles for size, spacing, text, and transition
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        // Focus ring styling
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        // Validation error styling using ARIA attributes
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className, // Allow additional custom styles via props
      )}
      {...props} // Spread other standard input props (e.g., value, onChange)
    />
  );
}

// Export the Input component
export { Input };
