"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import Button from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export default function Modal({
  open,
  title,
  description,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;
      const dialog = document.getElementById(dialogId);
      const focusable = dialog?.querySelectorAll<HTMLElement>("button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex='-1'])");
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [dialogId, onClose, open]);

  if (!open) return null;
  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 grid place-items-center bg-slate-950/35 p-4 backdrop-blur-[2px]"
      onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <section
        id={dialogId}
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        aria-modal="true"
        className="relative w-full max-w-lg rounded-panel border border-line bg-white p-6 shadow-xl sm:p-7"
        role="dialog"
      >
        <Button ref={closeButtonRef} type="button" variant="ghost" size="sm" className="absolute right-4 top-4 size-8 px-0" onClick={onClose} aria-label="Close dialog">
          <Icon name="close" size={17} />
        </Button>
        <h2 id={titleId} className="pr-9 font-display text-xl font-medium text-ink">{title}</h2>
        {description ? <p id={descriptionId} className="mt-2 text-sm leading-6 text-muted">{description}</p> : null}
        <div className="mt-5">{children}</div>
      </section>
    </div>
  );
}
