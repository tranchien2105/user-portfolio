import { text, useLanguage } from "../../hooks/useLanguage";

export function LoadingState({
  variant = "page",
}: {
  variant?: "page" | "palette";
}) {
  const { language } = useLanguage();
  const palette = variant === "palette";
  return (
    <div
      className={`loading-state loading-state-${variant}`}
      role="status"
      aria-live="polite"
    >
      <div className="loading-caption">
        <span className="loading-spinner" aria-hidden="true" />
        <span>
          {palette
            ? text("Đang chuẩn bị tìm kiếm…", "Preparing search…", language)
            : text("Đang tải dự án…", "Loading projects…", language)}
        </span>
      </div>
      <div className="loading-skeleton" aria-hidden="true">
        {!palette && <div className="skeleton-heading" />}
        {Array.from({ length: palette ? 4 : 3 }, (_, index) => (
          <div className="skeleton-row" key={index}>
            <span className="skeleton-number" />
            <div>
              <span className="skeleton-title" />
              <span className="skeleton-description" />
            </div>
          </div>
        ))}
      </div>
      {!palette && (
        <p className="loading-note">
          {text(
            "Danh sách dự án và bộ lọc sẽ xuất hiện khi tải xong.",
            "Projects and filters will appear as soon as they are ready.",
            language,
          )}
        </p>
      )}
    </div>
  );
}
