import React from "react";
import { cn } from "./utils";
// Or import the "cn" function from wherever you keep your className utility.
// If you don’t have one, see the note below for a minimal version.

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  className?: string;
  children?: React.ReactNode;
}

export function Button({
  variant = "default",
  className,
  children,
  ...props
}: ButtonProps) {
  // Basic styling logic for the "variant" prop
  const baseStyles =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 border border-transparent",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-100",
  };

  return (
    <button
      {...props}
      className={cn(baseStyles, variants[variant], className)}
    >
      {children}
    </button>
  );
}
