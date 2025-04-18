// Icon and utility imports
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

// Props definition for the error message component
interface ErrorMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string; // The error message text
  onRetry?: () => void; // Optional retry handler
}

// Reusable error display component
export function ErrorMessage({
  message,
  onRetry,
  className,
  ...props
}: ErrorMessageProps) {
  return (
    <div
      className={cn(
        "p-4 rounded-md bg-destructive/10 text-destructive flex flex-col gap-4",
        className,
      )}
      {...props}
    >
      {/* Message row with icon */}
      <div className="flex items-center gap-2">
        <AlertCircle className="h-5 w-5" />
        <p>{message}</p>
      </div>

      {/* Optional retry button */}
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="w-fit">
          Try again
        </Button>
      )}
    </div>
  );
}
