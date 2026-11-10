import { text, useLanguage } from "../hooks/useLanguage";
export default function NotFoundPage() {
  const { language } = useLanguage();
  return (
    <section className="not-found">
      <p className="eyebrow">404 / PAGE NOT FOUND</p>
      <h1>{text("Không tìm thấy trang", "Page not found", language)}</h1>
      <p>
        {text(
          "Đường dẫn này không thuộc portfolio hiện tại.",
          "This URL does not belong to the current portfolio.",
          language,
        )}
      </p>
      <a className="button button-primary" href="/projects/">
        {text("Khám phá dự án", "Explore projects", language)} ↗
      </a>
    </section>
  );
}
