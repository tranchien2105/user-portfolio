import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { text, useLanguage } from "../../hooks/useLanguage";

interface MenuPosition {
  x: number;
  y: number;
}

export function ContextMenu({
  onSearch,
  onTerminal,
}: {
  onSearch: () => void;
  onTerminal: () => void;
}) {
  const { language } = useLanguage();
  const [position, setPosition] = useState<MenuPosition | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const close = useCallback((restoreFocus = false) => {
    setPosition(null);
    if (restoreFocus && openerRef.current?.isConnected) {
      openerRef.current.focus({ preventScroll: true });
    }
  }, []);

  useEffect(() => {
    const open = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      // Preserve editing/selection tools and an explicit native-menu escape hatch.
      if (
        event.shiftKey ||
        target?.closest(
          'input, textarea, select, [contenteditable]:not([contenteditable="false"]), dialog',
        ) ||
        window.getSelection()?.toString()
      )
        return;
      event.preventDefault();
      openerRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      const bounds = target?.getBoundingClientRect();
      setPosition({
        x: event.clientX || (bounds?.left ?? 8),
        y: event.clientY || (bounds?.top ?? 8),
      });
    };
    window.addEventListener("contextmenu", open);
    return () => window.removeEventListener("contextmenu", open);
  }, []);

  useLayoutEffect(() => {
    const menu = menuRef.current;
    if (!position || !menu) return;
    const bounds = menu.getBoundingClientRect();
    menu.style.left = `${Math.max(8, Math.min(position.x, window.innerWidth - bounds.width - 8))}px`;
    menu.style.top = `${Math.max(8, Math.min(position.y, window.innerHeight - bounds.height - 8))}px`;
    menu
      .querySelector<HTMLElement>('[role="menuitem"]')
      ?.focus({ preventScroll: true });
  }, [position]);

  useEffect(() => {
    if (!position) return;
    const outside = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) close();
    };
    const dismiss = () => close();
    const scroll = (event: Event) => {
      if (!menuRef.current?.contains(event.target as Node)) close();
    };
    document.addEventListener("pointerdown", outside);
    window.addEventListener("resize", dismiss);
    document.addEventListener("scroll", scroll, true);
    return () => {
      document.removeEventListener("pointerdown", outside);
      window.removeEventListener("resize", dismiss);
      document.removeEventListener("scroll", scroll, true);
    };
  }, [position, close]);

  if (!position) return null;
  const links = [
    {
      href: "/#home",
      vi: "Trang chủ",
      en: "Home",
      icon: "M3 10 12 3l9 7M5 9v12h14V9M9 21v-8h6v8",
    },
    {
      href: "/projects/",
      vi: "Khám phá dự án",
      en: "Explore projects",
      icon: "M3 7h7l2 2h9v12H3ZM3 7V4h7l2 3",
    },
    {
      href: "/#contact",
      vi: "Liên hệ với mình",
      en: "Get in touch",
      icon: "M3 5h18v14H3ZM3 5l9 8 9-8",
    },
  ];
  return createPortal(
    <div
      className="portfolio-context-menu"
      ref={menuRef}
      role="menu"
      aria-label={text("Menu portfolio", "Portfolio menu", language)}
      style={{ left: position.x, top: position.y }}
      onKeyDown={(event) => {
        const items = Array.from(
          event.currentTarget.querySelectorAll<HTMLElement>(
            '[role="menuitem"]',
          ),
        );
        const index = items.indexOf(document.activeElement as HTMLElement);
        let next: number;
        if (event.key === "Escape") {
          event.preventDefault();
          close(true);
          return;
        }
        if (event.key === "Tab") {
          close();
          return;
        }
        if (event.key === " ") {
          event.preventDefault();
          items[index]?.click();
          return;
        }
        if (event.key === "ArrowDown") next = (index + 1) % items.length;
        else if (event.key === "ArrowUp")
          next = (index - 1 + items.length) % items.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = items.length - 1;
        else return;
        event.preventDefault();
        items[next]?.focus();
      }}
    >
      <div className="context-menu-heading" role="presentation">
        <img src="/cursors/arrow.svg" alt="" width="23" height="23" />
        <span>
          mc<span className="context-menu-dot">.</span> /{" "}
          {text("Lối tắt", "Shortcuts", language)}
        </span>
      </div>
      <button
        role="menuitem"
        type="button"
        onClick={() => {
          close(true);
          onSearch();
        }}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="10" cy="10" r="6" />
          <path d="m15 15 6 6" />
        </svg>
        <span>{text("Tìm nhanh", "Quick search", language)}</span>
        <kbd>⌘ / Ctrl K</kbd>
      </button>
      <div className="context-menu-divider" role="separator" />
      {links.map((link) => (
        <a
          role="menuitem"
          key={link.href}
          href={link.href}
          onClick={() => close()}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d={link.icon} />
          </svg>
          <span>{link[language]}</span>
        </a>
      ))}
      <div className="context-menu-divider" role="separator" />
      <button
        role="menuitem"
        type="button"
        onClick={() => {
          close(true);
          onTerminal();
        }}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m4 5 6 6-6 6m9 0h7" />
        </svg>
        <span>{text("Mở terminal", "Open terminal", language)}</span>
      </button>
      <p className="context-menu-hint" role="presentation">
        {text(
          "Shift + chuột phải: menu trình duyệt",
          "Shift + right-click: browser menu",
          language,
        )}
      </p>
    </div>,
    document.body,
  );
}
