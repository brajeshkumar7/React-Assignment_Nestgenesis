import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";

export default function EmptyState({
  title = "No products found",
  text = "Try adjusting your search or filters.",
  action,
}: {
  title?: string;
  text?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center px-6 py-12 text-center">
      <span className="mb-4 grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-700">
        <Icon name="box" size={21} />
      </span>
      <h2 className="font-display text-lg font-medium text-ink">{title}</h2>
      <p className="mt-2 max-w-sm text-sm leading-6 text-muted">{text}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
