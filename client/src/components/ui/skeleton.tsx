// Utility to conditionally merge class names
import { cn } from "@/lib/utils";

// Skeleton loader component — used to show placeholder content while loading
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton" // Slot attribute for styling or testing
      className={cn(
        "bg-accent animate-pulse rounded-md", // Default styling: background, animation, border radius
        className, // Custom classes passed from parent
      )}
      {...props} // Spread any additional props (e.g., style, id)
    />
  );
}

// Export the Skeleton component
export { Skeleton };
