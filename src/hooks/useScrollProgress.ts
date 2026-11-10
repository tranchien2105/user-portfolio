import { useEffect } from "react";

const sections = [
  "home",
  "about",
  "exp",
  "skills",
  "projects",
  "education",
  "contact",
];

export function useScrollProgress() {
  useEffect(() => {
    const bar = document.querySelector<HTMLElement>(".scroll-progress-fill");
    let frame = 0;

    const update = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      if (bar) {
        bar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
      }

      const activeLine =
        window.scrollY + Math.max(130, window.innerHeight * 0.28);
      let activeId = "home";
      for (const id of sections) {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= activeLine) activeId = id;
      }
      document
        .querySelectorAll<HTMLAnchorElement>('.nav-links a[href^="#"]')
        .forEach((link) => {
          const active = link.hash === `#${activeId}`;
          link.classList.toggle("active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      frame = 0;
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    scheduleUpdate();
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
}
