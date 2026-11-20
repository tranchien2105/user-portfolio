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
    const openTerminal = () => setActive("terminal");
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
    window.addEventListener("portfolio:terminal", openTerminal);
    return () => {
      window.removeEventListener("keydown", key);
      window.removeEventListener("portfolio:command", openPalette);
      window.removeEventListener("portfolio:terminal", openTerminal);
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
