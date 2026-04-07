import React from "react";

type Variant = "default" | "onDark";

export function NutrichefWordmark({
  className = "",
  variant = "default",
}: {
  className?: string;
  variant?: Variant;
}) {
  const nutri =
    variant === "onDark" ? "text-background" : "text-foreground";
  return (
    <span className={`font-heading font-semibold tracking-tight ${className}`}>
      <span className={nutri}>Nutri</span>
      <span className="text-primary">chef</span>
    </span>
  );
}
