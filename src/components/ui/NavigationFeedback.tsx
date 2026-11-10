import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { text, useLanguage } from "../../hooks/useLanguage";

export function NavigationFeedback() {
  const { language } = useLanguage();
  const [pending, setPending] = useState(false);
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const reset = () => {
      clearTimeout(timeout);
      setPending(false);
    };
    const start = () => {
      // Commit before the browser leaves this document for a native link.
      flushSync(() => setPending(true));
      clearTimeout(timeout);
      // Release feedback if a navigation is cancelled by the browser.
      timeout = setTimeout(reset, 15000);
    };
    const click = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
      )
        return;
      const link =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a[href]")
          : null;
      if (
        !link ||
        link.hasAttribute("download") ||
        (link.target && link.target !== "_self")
      )
        return;
      const url = new URL(link.href);
      if (
        url.origin === location.origin &&
        (url.pathname !== location.pathname || url.search !== location.search)
      )
        start();
    };
    const restore = (event: PageTransitionEvent) => {
      if (event.persisted) reset();
    };
    document.addEventListener("click", click);
    window.addEventListener("portfolio:navigating", start);
    window.addEventListener("pageshow", restore);
    window.addEventListener("pagehide", reset);
    return () => {
      clearTimeout(timeout);
      document.removeEventListener("click", click);
      window.removeEventListener("portfolio:navigating", start);
      window.removeEventListener("pageshow", restore);
      window.removeEventListener("pagehide", reset);
    };
  }, []);
  if (!pending) return null;
  return (
    <div className="navigation-feedback" role="status">
      <span className="navigation-loading-bar" aria-hidden="true" />
      <span className="navigation-loading-label">
        <span className="loading-spinner" aria-hidden="true" />
        {text("Đang mở trang…", "Opening page…", language)}
      </span>
    </div>
  );
}
