import * as React from "react"
import { cn } from "@/lib/utils"

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  size?: string | number
  border?: string | number
  text?: string
  darkText?: string
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = 6, border = 2, text = "primary", darkText = "foreground", ...props }, ref) => {
    const customClass = `size-${size} border-${border} text-${text} dark:text-${darkText}`;
    return (
      <div
        ref={ref}
        className={cn(
          "inline-block animate-spin rounded-full border-solid border-current border-e-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]",
          customClass,
          className
        )}
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