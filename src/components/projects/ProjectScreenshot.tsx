import type { ProjectItem } from "../../types/portfolio";
import { useCallback, useState } from "react";
import { text, useLanguage } from "../../hooks/useLanguage";
export function ProjectScreenshot({ project }: { project: ProjectItem }) {
  const { language } = useLanguage();
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading",
  );
  const [attempt, setAttempt] = useState(0);
  const imageRef = useCallback((image: HTMLImageElement | null) => {
    if (image?.complete && image.naturalWidth > 0) setStatus("loaded");
  }, []);
  const shot = project.screenshot;
  if (!shot) return null;
  return (
    <figure className="project-screenshot">
      <div
        className="screenshot-frame"
        data-state={status}
        style={{ aspectRatio: `${shot.width} / ${shot.height}` }}
        aria-busy={status === "loading"}
      >
        {status === "loading" && (
          <span className="screenshot-skeleton" aria-hidden="true" />
        )}
        <a
          href={shot.src}
          target="_blank"
          rel="noreferrer"
          aria-label={text(
            `Xem screenshot ${project.name} kích thước đầy đủ`,
            `Open full-size ${project.name} screenshot`,
            language,
          )}
        >
          <img
            ref={imageRef}
            src={attempt ? `${shot.src}?retry=${attempt}` : shot.src}
            width={shot.width}
            height={shot.height}
            alt={shot.alt[language]}
            loading="lazy"
            decoding="async"
            onLoad={() => setStatus("loaded")}
            onError={() => setStatus("error")}
          />
        </a>
        {status === "error" && (
          <div className="screenshot-error" role="status">
            <p>
              {text(
                "Ảnh chưa tải được. Bạn có thể thử lại.",
                "The screenshot could not load. You can try again.",
                language,
              )}
            </p>
            <button
              type="button"
              onClick={() => {
                setStatus("loading");
                setAttempt((current) => current + 1);
              }}
            >
              {text("Tải lại ảnh", "Retry image", language)}
            </button>
          </div>
        )}
      </div>
      <figcaption>{shot.caption[language]}</figcaption>
    </figure>
  );
}
