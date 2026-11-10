import { useEffect, useState, useSyncExternalStore } from "react";

const reducedQuery = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)");
function subscribeMotion(callback: () => void) {
  const query = reducedQuery();
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

export function useTypewriter(words: string[], enabled = true): string {
  const [text, setText] = useState(words[0] ?? "");

  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    () => reducedQuery().matches,
    () => true,
  );
  useEffect(() => {
    if (!enabled || words.length < 2 || reducedMotion) return;

    let wordIndex = 0;
    let charIndex = words[0]?.length ?? 0;
    let deleting = true;
    let timeout = 0;

    const tick = () => {
      const current = words[wordIndex] ?? "";
      if (deleting) {
        charIndex -= 1;
        setText(current.slice(0, Math.max(charIndex, 0)));
        if (charIndex <= 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          timeout = window.setTimeout(tick, 280);
          return;
        }
        timeout = window.setTimeout(tick, 32);
        return;
      }

      const nextWord = words[wordIndex] ?? "";
      charIndex += 1;
      setText(nextWord.slice(0, charIndex));
      if (charIndex >= nextWord.length) {
        deleting = true;
        timeout = window.setTimeout(tick, 1700);
        return;
      }
      timeout = window.setTimeout(tick, 72);
    };

    timeout = window.setTimeout(tick, 1700);
    return () => window.clearTimeout(timeout);
  }, [enabled, words, reducedMotion]);

  return !enabled || reducedMotion || words.length < 2
    ? (words[0] ?? "")
    : text;
}
