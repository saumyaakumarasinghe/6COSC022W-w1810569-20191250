// Icon and utility imports
import { Loader2 } from "lucide-react"; // Spinning loader icon
import { cn } from "@/lib/utils"; // Utility to merge class names

// Props interface for Spinner
interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number; // Optional icon size, defaults to 16
}

// Reusable spinner component for loading indicators
export function Spinner({ className, size = 16, ...props }: SpinnerProps) {
  return (
    <div
      className={cn("animate-spin text-muted-foreground", className)} // Spin animation + styling
      {...props} // Spread additional div props (e.g., style, aria)
    >
      <Loader2 size={size} /> {/* Spinner icon with configurable size */}
    </div>
  );
}
