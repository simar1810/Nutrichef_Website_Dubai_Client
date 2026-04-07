import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "onDark";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className = "", variant = "primary", size = "md", children, ...props },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-45";

    const variants = {
      primary:
        "bg-primary text-white hover:bg-primary-hover border border-transparent shadow-sm",
      outline:
        "border-2 border-foreground/20 bg-transparent text-foreground hover:border-foreground/40 hover:bg-foreground/[0.04]",
      ghost: "text-foreground hover:bg-foreground/[0.06] border border-transparent",
      onDark:
        "border-2 border-background/35 bg-transparent text-background hover:border-background hover:bg-background/10",
    };

    const sizes = {
      sm: "h-10 rounded-lg px-4 text-sm",
      md: "h-12 rounded-xl px-6 text-[0.9375rem]",
      lg: "h-14 rounded-xl px-8 text-base",
    };

    return (
      <button
        ref={ref}
        type="button"
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";
