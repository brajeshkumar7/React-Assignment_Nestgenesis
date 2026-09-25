import { Icon } from "@/components/ui/Icon";
import Button from "@/components/ui/Button";

export default function ErrorState({
  title = "Something went wrong",
  message = "We couldn’t load this view. Try again in a moment.",
  onRetry,
}: {
  title?: string;
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center px-6 py-12 text-center" role="alert">
      <span className="mb-4 grid size-11 place-items-center rounded-xl bg-danger-50 text-danger-700">
        <Icon name="close" size={20} />
      </span>
      <h2 className="font-display text-lg font-medium text-ink">{title}</h2>
      <p className="mt-2 max-w-sm text-sm leading-6 text-muted">{message}</p>
      {onRetry ? <Button variant="outline" size="sm" className="mt-5" onClick={onRetry}>Try again</Button> : null}
    </div>
  );
}
