import { education } from "../../data/portfolio";
import { useLanguage, text } from "../../hooks/useLanguage";

export default function Education() {
  const { language } = useLanguage();
  return (
    <section className="section" id="education">
      <p className="eyebrow">$ cat ./education.txt</p>
      <h2 className="section-title">{text('HỌC VẤN', 'EDUCATION', language)}</h2>

      <div className="education-list">
        {education.map((item) => (
          <article
            className="panel education-card"
            key={`${item.institution}-${item.degree}`}
          >
            <div className="education-header">
              <div>
                <h3>{item.degree}</h3>
                <p className="accent">{item.institution}</p>
              </div>

              <span className="education-period">{item.period}</span>
            </div>

            {item.description && <p>{item.description}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}
