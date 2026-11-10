import { useEffect, useRef, type ReactNode } from "react";
import { text, useLanguage } from "../../hooks/useLanguage";
export function Modal({
  title,
  onClose,
  children,
  className = "",
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}) {
  const { language } = useLanguage();
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current!;
    const opener =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const oldOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    dialog.querySelector<HTMLElement>("[data-modal-focus]")?.focus();
    return () => {
      dialog.close();
      document.body.style.overflow = oldOverflow;
      if (opener?.isConnected) opener.focus();
    };
  }, [onClose]);
  return (
    <dialog
      className={`portfolio-dialog ${className}`}
      ref={ref}
      aria-labelledby="portfolio-dialog-title"
      onKeyDownCapture={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          event.stopPropagation();
          onClose();
        } else if (event.key === "Tab") {
          const focusable = Array.from(
            event.currentTarget.querySelectorAll<HTMLElement>(
              "a[href], button, input, select, textarea, summary, [tabindex]",
            ),
          ).filter(
            (element) =>
              element.tabIndex >= 0 &&
              !element.matches(":disabled") &&
              element.getClientRects().length > 0,
          );
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }
      }}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="dialog-panel">
        <header className="dialog-header">
          <h2 id="portfolio-dialog-title">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={text("Đóng cửa sổ", "Close dialog", language)}
          >
            ×
          </button>
        </header>
        {children}
      </div>
    </dialog>
  );
}
