import { useId, type SelectHTMLAttributes } from "react";
import { Icon } from "@/components/ui/Icon";

export type SelectOption = { label: string; value: string };
type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: SelectOption[];
  hint?: string;
  labelClassName?: string;
};

export default function Select({ id, label, options, hint, labelClassName = "", className = "", ...props }: Props) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const hintId = `${selectId}-hint`;

  return (
    <div className="min-w-0">
      <label htmlFor={selectId} className={`mb-1.5 block text-xs font-medium text-slate-700 ${labelClassName}`}>{label}</label>
      <div className="relative">
        <select
          id={selectId}
          className={`h-10 w-full appearance-none rounded-control border border-line bg-white pl-3 pr-9 text-sm text-ink shadow-sm outline-none hover:border-slate-300 focus-visible:border-brand-600 focus-visible:ring-2 focus-visible:ring-brand-600/15 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 ${className}`}
          {...props}
          aria-describedby={hint ? hintId : props["aria-describedby"]}
        >
          {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
        <Icon name="down" size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
      </div>
      {hint ? <p id={hintId} className="mt-1.5 text-xs text-muted">{hint}</p> : null}
    </div>
  );
}
