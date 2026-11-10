import { education } from "../../data/portfolio";
import { useLanguage, text } from "../../hooks/useLanguage";
import { SectionHeading } from "../ui/SectionHeading";
export default function Education() {
  const { language } = useLanguage();
  return (
    <section className="section education-section" id="education">
      <SectionHeading
        number="05"
        label="EDUCATION"
        title={{ vi: "Học vấn", en: "Education" }}
      />
      {education.map((item) => (
        <article className="education-entry" key={item.institution.en}>
          <div className="education-symbol" aria-hidden="true">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            >
              <path d="m2 8 10-5 10 5-10 5-10-5Zm4 2v7c4 3 8 3 12 0v-7M22 8v8" />
            </svg>
          </div>
          <div className="education-copy">
            <p className="eyebrow">
              {text("BẰNG CỬ NHÂN", "BACHELOR’S DEGREE", language)}
            </p>
            <h3>{item.institution[language]}</h3>
            <p>{item.degree[language]}</p>
          </div>
          <div className="education-dates">
            <p>{item.period}</p>
            <span>{item.description[language]}</span>
          </div>
        </article>
      ))}
    </section>
  );
}
