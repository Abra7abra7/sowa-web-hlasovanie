import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "flex w-full rounded-lg border bg-background px-4 py-2.5 text-sm transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:border-gold hover:border-gold/40",
        luxury:
          "glass-dark border-gold/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:border-gold hover:border-gold/40 shadow-lg",
        error:
          "border-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:border-destructive",
      },
      inputSize: {
        default: "h-10",
        sm: "h-8 text-xs px-3",
        lg: "h-12 text-base px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, error, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`${inputVariants({
          variant: error ? "error" : variant,
          inputSize,
        })} ${className || ""}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };

