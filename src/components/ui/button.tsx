import * as React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "premium";
  size?: "default" | "sm" | "lg" | "icon";
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-95 duration-150",
          {
            // Variants
            "bg-primary text-primary-foreground shadow hover:bg-primary/90 hover:glow-primary":
              variant === "default",
            "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90":
              variant === "destructive",
            "border border-input bg-transparent shadow-sm hover:bg-secondary hover:text-secondary-foreground":
              variant === "outline",
            "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80":
              variant === "secondary",
            "hover:bg-accent/10 hover:text-accent-foreground": variant === "ghost",
            "text-primary underline-offset-4 hover:underline bg-transparent":
              variant === "link",
            "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold hover:opacity-95 shadow-md shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98]":
              variant === "premium",
            
            // Sizes
            "h-9 px-4 py-2": size === "default",
            "h-8 rounded-md px-3 text-xs": size === "sm",
            "h-10 rounded-md px-8": size === "lg",
            "h-9 w-9": size === "icon",
          },
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
