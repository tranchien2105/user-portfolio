import { useEffect, useId, useRef, useState } from "react";
import { commandItems, searchCommands } from "../../lib/commandSearch";
import { text, useLanguage } from "../../hooks/useLanguage";
import { Modal } from "./Modal";
const items = commandItems();
export default function CommandPalette({ onClose }: { onClose: () => void }) {
  const { language } = useLanguage();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const results = searchCommands(items, query);
  const active = results.length ? activeIndex % results.length : -1;
  const id = useId();
  const resultRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  useEffect(() => {
    if (active >= 0)
      resultRefs.current[active]?.scrollIntoView({ block: "nearest" });
  }, [active, query]);
  return (
    <Modal
      title={text(
        "Tìm nhanh trong portfolio",
        "Explore the portfolio",
        language,
      )}
      onClose={onClose}
      className="command-dialog"
    >
      <div className="command-search">
        <label className="sr-only" htmlFor={`${id}-input`}>
          {text(
            "Tìm dự án, công nghệ hoặc mục nội dung",
            "Find a project, technology, or section",
            language,
          )}
        </label>
        <input
          id={`${id}-input`}
          data-modal-focus
          type="search"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded="true"
          aria-controls={`${id}-results`}
          aria-activedescendant={
            active >= 0 ? `${id}-option-${active}` : undefined
          }
          autoComplete="off"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
          }}
          onKeyDown={(event) => {
            if (event.nativeEvent.isComposing) return;
            if (
              ["ArrowDown", "ArrowUp"].includes(event.key) &&
              results.length
            ) {
              event.preventDefault();
              setActiveIndex(
                (active +
                  (event.key === "ArrowDown" ? 1 : -1) +
                  results.length) %
                  results.length,
              );
            } else if (event.key === "Enter" && active >= 0) {
              event.preventDefault();
              onClose();
              const url = new URL(results[active].href, window.location.href);
              if (
                url.pathname !== location.pathname ||
                url.search !== location.search
              ) {
                window.dispatchEvent(new Event("portfolio:navigating"));
              }
              window.location.assign(results[active].href);
            }
          }}
          placeholder={text(
            "Tìm dự án, công nghệ, section…",
            "Projects, technologies, sections…",
            language,
          )}
        />
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {results.length} {text("kết quả", "results", language)}
      </p>
      <ul
        className="command-results"
        role="listbox"
        aria-label={text("Kết quả tìm kiếm", "Search results", language)}
        id={`${id}-results`}
      >
        {results.map((item, index) => (
          <li role="presentation" key={item.id}>
            <a
              ref={(element) => {
                resultRefs.current[index] = element;
              }}
              id={`${id}-option-${index}`}
              role="option"
              aria-selected={index === active}
              tabIndex={-1}
              href={item.href}
              onClick={onClose}
              onPointerMove={() => setActiveIndex(index)}
            >
              <span className="command-kind">
                {item.kind === "project"
                  ? "PROJECT"
                  : item.kind === "technology"
                    ? "TECH"
                    : "SECTION"}
              </span>
              <span>
                <strong>{item.label[language]}</strong>
                <small>{item.detail[language]}</small>
              </span>
              <span aria-hidden="true">↵</span>
            </a>
          </li>
        ))}
      </ul>
      {results.length === 0 && (
        <p className="command-empty">
          {text(
            "Không tìm thấy kết quả. Thử tên dự án hoặc công nghệ khác.",
            "No matches. Try another project or technology.",
            language,
          )}
        </p>
      )}
      <footer className="command-help">
        <span>
          <kbd>↑</kbd>
          <kbd>↓</kbd> {text("di chuyển", "navigate", language)}
        </span>
        <span>
          <kbd>Enter</kbd> {text("mở", "open", language)}
        </span>
        <span>
          <kbd>Esc</kbd> {text("đóng", "close", language)}
        </span>
      </footer>
    </Modal>
  );
}
