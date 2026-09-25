import { useId, type InputHTMLAttributes, type ReactNode } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  leading?: ReactNode;
};

export default function Input({ id, label, hint, leading, className = "", ...props }: Props) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = `${inputId}-hint`;

  return (
    <div className="min-w-0">
      <label htmlFor={inputId} className="mb-1.5 block text-xs font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        {leading ? <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">{leading}</span> : null}
        <input
          id={inputId}
          className={`h-10 w-full rounded-control border border-line bg-white px-3 text-sm text-ink shadow-sm outline-none placeholder:text-slate-400 hover:border-slate-300 focus-visible:border-brand-600 focus-visible:ring-2 focus-visible:ring-brand-600/15 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 ${leading ? "pl-9" : ""} ${className}`}
          {...props}
          aria-describedby={hint ? hintId : props["aria-describedby"]}
        />
      </div>
      {hint ? <p id={hintId} className="mt-1.5 text-xs text-muted">{hint}</p> : null}
    </div>
  );
}
