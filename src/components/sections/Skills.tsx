import { skills } from "../../data/portfolio";
import { useLanguage, text } from "../../hooks/useLanguage";
import { SectionHeading } from "../ui/SectionHeading";

const orderedSkills = [...skills].sort(
  (a, b) =>
    ["backend", "database", "infrastructure", "frontend"].indexOf(a.id) -
    ["backend", "database", "infrastructure", "frontend"].indexOf(b.id),
);

export default function Skills() {
  const { language } = useLanguage();
  return (
    <section className="section capabilities-section" id="skills">
      <SectionHeading
        title={{ vi: "Công nghệ trong công việc", en: "Tools I work with" }}
      />
      <dl className="skill-domains">
        {orderedSkills.map((group) => (
          <div className="skill-domain" key={group.id}>
            <dt>{group.title[language]}</dt>
            <dd>
              <p>{group.description[language]}</p>
              <p className="skill-tools">{group.skills.join(", ")}</p>
              {group.supportingSkills && (
                <p className="supporting-skills">
                  {text("Thêm", "Also", language)}:{" "}
                  {group.supportingSkills.join(", ")}
                </p>
              )}
              {group.note && (
                <p className="skill-context">{group.note[language]}</p>
              )}
            </dd>
          </div>
        ))}
      </dl>
      <p className="skills-language">
        {text("Ngoại ngữ", "Language", language)}:{" "}
        <strong>English · TOEIC 600</strong>{" "}
        <span>
          {text(
            "Theo CV hiện tại",
            "As documented in the current CV",
            language,
          )}
        </span>
      </p>
    </section>
  );
}
