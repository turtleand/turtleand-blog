import React from "react";

// A simple wrapper. Because your AIToolsMap handles show/hide with "tooltipContent",
// we just render children. 
export function Tooltip({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

// If you want the trigger to do something special, you can expand this component.
// For now, it just renders children directly (asChild).
export function TooltipTrigger({
  asChild,
  children,
}: {
  asChild?: boolean;
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

interface TooltipContentProps {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "end" | "center";
}

// Renders the tooltip container. 
export function TooltipContent({ children, className }: TooltipContentProps) {
  return <div className={className}>{children}</div>;
}
