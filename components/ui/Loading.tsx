export default function Loading({ label = "Loading products" }: { label?: string }) {
  return (
    <div className="flex min-h-56 items-center justify-center gap-3 text-sm text-muted" role="status" aria-live="polite">
      <span className="size-5 animate-spin rounded-full border-2 border-slate-200 border-t-brand-700" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
