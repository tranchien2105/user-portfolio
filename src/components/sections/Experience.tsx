import { projects, projectUrl } from "../../data/projects";
import { experience } from "../../data/portfolio";
import { useLanguage, text } from "../../hooks/useLanguage";
import { SectionHeading } from "../ui/SectionHeading";
export default function Experience() {
  const { language } = useLanguage();
  return (
    <section className="section experience-section" id="exp">
      <div className="experience-heading">
        <SectionHeading
          title={{ vi: "Kinh nghiệm làm việc", en: "Professional experience" }}
        />
      </div>
      <ol className="experience-list">
        {experience.map((item) => {
          const related = projects.find(
            (project) =>
              project.slug ===
              (item.company === "FinViet" ? "dms-system" : "vtech"),
          );
          return (
            <li className="experience-item" key={item.company}>
              <div className="experience-meta">
                <p className="experience-period">{item.period}</p>
              </div>
              <article className="experience-content">
                <header>
                  <div>
                    <h3>{item.company}</h3>
                    <p className="experience-role">{item.position}</p>
                  </div>
                </header>

                <ul className="detail-list">
                  {item.description.map((line) => (
                    <li key={line.en}>{line[language]}</li>
                  ))}
                </ul>
                <ul
                  className="tag-list"
                  aria-label={text("Công nghệ", "Technologies", language)}
                >
                  {item.technologies.map((tech) => (
                    <li className="tag" key={tech}>
                      {tech}
                    </li>
                  ))}
                </ul>
                {related && (
                  <div className="experience-project">
                    <p className="work-label">
                      {text("Hệ thống đã làm", "Related system", language)}
                    </p>
                    <h4>
                      <a className="text-link" href={projectUrl(related)}>
                        {related.name}
                      </a>
                      <span>{related.subtitle[language]}</span>
                    </h4>
                    <p>{related.summary[language]}</p>
                    <ul className="detail-list">
                      {related.contributions.map((line) => (
                        <li key={line.en}>{line[language]}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
