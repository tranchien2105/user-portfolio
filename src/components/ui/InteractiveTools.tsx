import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { text, useLanguage } from "../../hooks/useLanguage";
import { Modal } from "./Modal";
import { Terminal } from "./Terminal";
import { ContextMenu } from "./ContextMenu";
import { LoadingState } from "./LoadingState";
const CommandPalette = lazy(() => import("./CommandPalette"));
export default function InteractiveTools() {
  const { language } = useLanguage();
  const [active, setActive] = useState<"palette" | "terminal" | null>(null);
  const close = useCallback(() => setActive(null), []);
  useEffect(() => {
    const openPalette = () => setActive("palette");
    const key = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k" &&
        !event.isComposing &&
        !event.repeat
      ) {
        event.preventDefault();
        setActive((current) => (current === "palette" ? null : "palette"));
      }
    };
    window.addEventListener("keydown", key);
    window.addEventListener("portfolio:command", openPalette);
    return () => {
      window.removeEventListener("keydown", key);
      window.removeEventListener("portfolio:command", openPalette);
    };
  }, []);
  return (
    <>
      {!active && (
        <ContextMenu
          onSearch={() => setActive("palette")}
          onTerminal={() => setActive("terminal")}
        />
      )}
      <button
        className="terminal-launcher"
        type="button"
        aria-haspopup="dialog"
        aria-expanded={active === "terminal"}
        onClick={() => setActive("terminal")}
      >
        <span aria-hidden="true">&gt;_</span> Terminal
      </button>
      {active === "palette" && (
        <Suspense
          fallback={
            <Modal
              title={text(
                "Tìm nhanh trong portfolio",
                "Explore the portfolio",
                language,
              )}
              onClose={close}
              className="command-dialog"
            >
              <LoadingState variant="palette" />
            </Modal>
          }
        >
          <CommandPalette onClose={close} />
        </Suspense>
      )}
      {active === "terminal" && (
        <Modal
          title="Portfolio terminal"
          onClose={close}
          className="terminal-dialog"
        >
          <Terminal title="chien / portfolio console" focusOnOpen>
            <p className="terminal-welcome">
              {text(
                "Khám phá portfolio bằng lệnh help, about, skills, projects, contact và clear.",
                "Explore with help, about, skills, projects, contact, and clear.",
                language,
              )}
            </p>
          </Terminal>
        </Modal>
      )}
    </>
  );
}
