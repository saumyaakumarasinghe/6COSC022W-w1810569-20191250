import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
}

export function Spinner({ className, size = 24, ...props }: SpinnerProps) {
  return (
    <div
      className={cn("animate-spin text-muted-foreground", className)}
      {...props}
    >
      <Loader2 size={size} />
    </div>
  );
}
