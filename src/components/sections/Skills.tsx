import { skills } from "../../data/portfolio";
import { useLanguage, text } from "../../hooks/useLanguage";
import { SectionHeading } from "../ui/SectionHeading";
import { CapabilityIcon } from "../ui/CapabilityIcon";
import { TechnologyBadge } from "../ui/TechnologyBadge";
export default function Skills() {
  const { language } = useLanguage();
  return (
    <section className="section capabilities-section" id="skills">
      <div className="capabilities-heading">
        <SectionHeading
          number="03"
          label="ENGINEERING CAPABILITIES"
          title={{
            vi: "Năng lực & công nghệ",
            en: "Capabilities & technologies",
          }}
        />
        <p>
          {text(
            "Công cụ gắn với công việc cụ thể. Kinh nghiệm doanh nghiệp là nền tảng; các dự án cá nhân mở rộng phạm vi thực hành.",
            "Tools connected to real work. Enterprise experience is the foundation; personal projects expand the scope of practice.",
            language,
          )}
        </p>
      </div>
      <div className="capabilities-grid">
        {skills.map((group, index) => (
          <article
            className={`capability capability-${group.id}`}
            key={group.id}
          >
            <header className="capability-header">
              <span className="capability-mark">
                <CapabilityIcon name={group.id} />
              </span>
              <span className="capability-index">
                0{index + 1} /{" "}
                {group.id === "backend" ? "CORE FOCUS" : "CAPABILITY"}
              </span>
            </header>
            <h3>{group.title[language]}</h3>
            <p className="capability-description">
              {group.description[language]}
            </p>
            <ul className="technology-list">
              {group.skills.map((skill) => (
                <li key={skill}>
                  <TechnologyBadge name={skill} />
                </li>
              ))}
            </ul>
            {group.supportingSkills && (
              <p className="supporting-skills">
                <span>{text("Thêm", "Also", language)}</span>{" "}
                {group.supportingSkills.join(" · ")}
              </p>
            )}
            {group.note && (
              <p className="capability-context">{group.note[language]}</p>
            )}
          </article>
        ))}
      </div>
      <div className="skills-language">
        <span>{text("Ngoại ngữ", "Language", language)}</span>
        <strong>
          English <span>TOEIC 600</span>
        </strong>
        <p>
          {text(
            "Thông tin theo CV hiện tại",
            "As documented in the current CV",
            language,
          )}
        </p>
      </div>
    </section>
  );
}
