import type { ReactNode } from "react";

export default function Section({
  title,
  description,
  action,
  children,
  className = "",
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      {title || description || action ? (
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {title ? <h2 className="text-base font-semibold tracking-tight text-ink">{title}</h2> : null}
            {description ? <p className="mt-1 text-sm text-muted">{description}</p> : null}
          </div>
          {action}
        </div>
      ) : null}
      {children}
    </section>
  );
}
