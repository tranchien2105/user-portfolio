import { education } from "../../data/portfolio";
import { useLanguage } from "../../hooks/useLanguage";
import { SectionHeading } from "../ui/SectionHeading";
export default function Education() {
  const { language } = useLanguage();
  return (
    <section className="section education-section" id="education">
      <SectionHeading title={{ vi: "Học vấn", en: "Education" }} />
      {education.map((item) => (
        <article className="education-entry" key={item.institution.en}>
          <div className="education-copy">
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
