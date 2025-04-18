"use client"; // Marks this as a client-side component

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label"; // Accessible label primitive from Radix UI

import { cn } from "@/lib/utils"; // Utility for conditional className merging

// Custom Label component built on top of Radix's LabelPrimitive
function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label" // Slot attribute for styling or testing
      className={cn(
        // Base styles: alignment, font, and disabled handling
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className, // Allow additional class names via props
      )}
      {...props} // Spread remaining props like `htmlFor`, `children`, etc.
    />
  );
}

// Export the custom Label component
export { Label };
