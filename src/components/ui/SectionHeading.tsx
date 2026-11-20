import { useLanguage } from "../../hooks/useLanguage";
import type { Localized } from "../../types/portfolio";

export function SectionHeading({ title }: { title: Localized }) {
  const { language } = useLanguage();
  return (
    <div className="section-heading">
      <h2 className="section-title">{title[language]}</h2>
    </div>
  );
}
