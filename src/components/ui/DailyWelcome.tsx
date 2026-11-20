import { useEffect, useState, type CSSProperties } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import {
  localDayKey,
  millisecondsUntilNextLocalDay,
  requestDailyWelcome,
  wishForDate,
  WELCOME_ENTER_MS,
  WELCOME_HOLD_MS,
  WELCOME_EXIT_MS,
} from "../../lib/dailyWelcome";

export function DailyWelcome() {
  const { language } = useLanguage();
  const [welcome, setWelcome] = useState<{
    day: string;
    wish: ReturnType<typeof wishForDate>;
    leaving: boolean;
  } | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    let checking = false;
    let midnight: ReturnType<typeof setTimeout>;
    let leaving: ReturnType<typeof setTimeout>;
    let removal: ReturnType<typeof setTimeout>;
    const visible = () => document.visibilityState === "visible";
    const check = () => {
      if (checking || controller.signal.aborted || !visible()) return;
      checking = true;
      void requestDailyWelcome(controller.signal, visible, (date) => {
        clearTimeout(leaving);
        clearTimeout(removal);
        setWelcome({
          day: localDayKey(date),
          wish: wishForDate(date),
          leaving: false,
        });
        leaving = setTimeout(() => {
          setWelcome((current) =>
            current ? { ...current, leaving: true } : null,
          );
        }, WELCOME_ENTER_MS + WELCOME_HOLD_MS);
        removal = setTimeout(
          () => setWelcome(null),
          WELCOME_ENTER_MS + WELCOME_HOLD_MS + WELCOME_EXIT_MS,
        );
      }).finally(() => {
        checking = false;
      });
    };
    const schedule = () => {
      clearTimeout(midnight);
      midnight = setTimeout(() => {
        check();
        schedule();
      }, millisecondsUntilNextLocalDay() + 50);
    };
    const resume = () => {
      check();
      schedule();
    };
    document.addEventListener("visibilitychange", resume);
    window.addEventListener("focus", resume);
    window.addEventListener("pageshow", resume);
    // Async claiming also makes React StrictMode's setup/cleanup replay safe.
    check();
    schedule();
    return () => {
      controller.abort();
      clearTimeout(midnight);
      clearTimeout(leaving);
      clearTimeout(removal);
      document.removeEventListener("visibilitychange", resume);
      window.removeEventListener("focus", resume);
      window.removeEventListener("pageshow", resume);
    };
  }, []);
  if (!welcome) return null;
  return (
    <aside
      key={welcome.day}
      className={`daily-welcome${welcome.leaving ? " daily-welcome-leaving" : ""}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      style={
        {
          "--welcome-enter": `${WELCOME_ENTER_MS}ms`,
          "--welcome-exit": `${WELCOME_EXIT_MS}ms`,
        } as CSSProperties
      }
    >
      <p className="daily-welcome-message">{welcome.wish[language]}</p>
    </aside>
  );
}
