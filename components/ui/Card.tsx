import type { HTMLAttributes, ReactNode } from "react";

export default function Card({ children, className = "", ...props }: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return <div className={`rounded-panel border border-line bg-white shadow-[0_1px_2px_rgba(20,35,25,0.04)] ${className}`} {...props}>{children}</div>;
}
