import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: "sm" | "md";
  children: ReactNode;
};

const variants: Record<Variant, string> = {
  primary: "bg-brand-700 text-white shadow-sm hover:bg-brand-800 focus-visible:ring-brand-600",
  secondary: "bg-brand-50 text-brand-800 hover:bg-brand-100 focus-visible:ring-brand-600",
  outline: "border border-line bg-white text-ink hover:bg-slate-50 focus-visible:ring-brand-600",
  ghost: "bg-transparent text-muted hover:bg-slate-100 hover:text-ink focus-visible:ring-brand-600",
  danger: "bg-danger-700 text-white hover:bg-red-800 focus-visible:ring-danger-700",
};

const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { variant = "primary", size = "md", className = "", children, ...props },
  ref,
) {
  const dimensions = size === "sm" ? "h-9 px-3 text-xs" : "h-10 px-4 text-sm";
  return (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center gap-2 rounded-control font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${dimensions} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;
