import * as React from "react"
import { cn } from "@/lib/utils"

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  size?: string | number
  border?: string | number
  color?: string
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = 50, border = 5, color = "primary", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-block animate-spin rounded-full border-solid border-current border-e-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]",
          className
        )}
        style={{ width: `${size}px`, height: `${size}px`, borderWidth: `${border}px`, color: `hsl(var(--${color}))` }}

        role="status"
        {...props}
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    );
  }
);
Spinner.displayName = "Spinner";

export { Spinner };