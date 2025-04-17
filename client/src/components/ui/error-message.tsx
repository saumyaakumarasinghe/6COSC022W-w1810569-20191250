import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface ErrorMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string;
  onRetry?: () => void;
}

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
      <div className="flex items-center gap-2">
        <AlertCircle className="h-5 w-5" />
        <p>{message}</p>
      </div>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="w-fit">
          Try again
        </Button>
      )}
    </div>
  );
}
