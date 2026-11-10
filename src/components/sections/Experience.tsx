import { experience } from "../../data/portfolio";
import { useLanguage, text } from "../../hooks/useLanguage";
import { SectionHeading } from "../ui/SectionHeading";
export default function Experience() {
  const { language } = useLanguage();
  return (
    <section className="section experience-section" id="exp">
      <div className="experience-heading">
        <SectionHeading
          number="02"
          label="PROFESSIONAL EXPERIENCE"
          title={{ vi: "Kinh nghiệm làm việc", en: "Professional experience" }}
        />
        <p>
          {text(
            "Phát triển và duy trì phần mềm theo yêu cầu nghiệp vụ thực tế.",
            "Developing and maintaining software around real business requirements.",
            language,
          )}
        </p>
      </div>
      <ol className="experience-list">
        {experience.map((item, index) => (
          <li className="experience-item" key={item.company}>
            <div className="experience-meta">
              <p className="experience-period">{item.period}</p>
              <p className="experience-step">
                0{experience.length - index} /{" "}
                {text("HÀNH TRÌNH", "CAREER", language)}
              </p>
            </div>
            <article className="experience-content">
              <header>
                <div>
                  <h3>{item.company}</h3>
                  <p className="experience-role">{item.position}</p>
                </div>
                <span className="experience-domain">
                  {text(
                    "Ứng dụng doanh nghiệp",
                    "Enterprise applications",
                    language,
                  )}
                </span>
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
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
