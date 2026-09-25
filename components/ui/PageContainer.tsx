import type { HTMLAttributes, ReactNode } from "react";

export default function PageContainer({ children, className = "", ...props }: HTMLAttributes<HTMLElement> & { children: ReactNode }) {
  return <section className={`mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 sm:py-9 lg:px-10 ${className}`} {...props}>{children}</section>;
}
