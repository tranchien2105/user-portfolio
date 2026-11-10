import { useLanguage } from "../../hooks/useLanguage";
import type { Localized } from "../../types/portfolio";

export function SectionHeading({
  number,
  title,
  label,
}: {
  number: string;
  title: Localized;
  label: string;
}) {
  const { language } = useLanguage();
  return (
    <div className="section-heading">
      <p className="eyebrow">
        <span>{number}</span> / {label}
      </p>
      <h2 className="section-title">{title[language]}</h2>
    </div>
  );
}
