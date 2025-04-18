"use client"; // Indicates this is a client-side component

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator"; // Radix UI separator primitive

import { cn } from "@/lib/utils"; // Utility to merge class names conditionally

// Reusable separator component for horizontal or vertical dividers
function Separator({
  className,
  orientation = "horizontal", // Default orientation
  decorative = true, // Marks separator as visual-only (not meaningful for screen readers)
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root" // Used for styling/testing
      decorative={decorative} // ARIA property for non-semantic use
      orientation={orientation} // Determines visual direction (horizontal or vertical)
      className={cn(
        // Style based on orientation
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className, // Allow extra custom styles
      )}
      {...props} // Spread other props like `role`, `aria-orientation`, etc.
    />
  );
}

// Export the separator for use in layouts and UI components
export { Separator };
