import type { HTMLAttributes, ReactNode } from "react";

type Tone = "neutral" | "success" | "warning" | "danger" | "info";
const tones: Record<Tone, string> = {
  neutral: "bg-slate-100 text-slate-700 ring-slate-200",
  success: "bg-emerald-50 text-emerald-800 ring-emerald-100",
  warning: "bg-warning-50 text-warning-700 ring-amber-100",
  danger: "bg-danger-50 text-danger-700 ring-red-100",
  info: "bg-sky-50 text-sky-800 ring-sky-100",
};

export default function Badge({ tone = "neutral", className = "", children, ...props }: HTMLAttributes<HTMLSpanElement> & { tone?: Tone; children: ReactNode }) {
  return <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium leading-none ring-1 ring-inset ${tones[tone]} ${className}`} {...props}>{children}</span>;
}
