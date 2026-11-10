import { careerHighlights, interests, profile } from "../../data/portfolio";
import { useLanguage, text } from "../../hooks/useLanguage";
import { SectionHeading } from "../ui/SectionHeading";
import { CapabilityIcon } from "../ui/CapabilityIcon";
export default function About() {
  const { language } = useLanguage();
  return (
    <section className="section about-section" id="about">
      <SectionHeading
        number="01"
        label="ENGINEERING PROFILE"
        title={{
          vi: "Kinh nghiệm & hướng phát triển",
          en: "Experience & direction",
        }}
      />
      <p className="about-introduction">
        {text(
          "Mình tập trung vào backend: API, dữ liệu và nghiệp vụ doanh nghiệp. Các dự án cá nhân là nơi mình mở rộng sang fullstack, từ giao diện đến triển khai.",
          "I focus on backend engineering: APIs, data, and business workflows. Personal projects extend that foundation into fullstack development, from interface to deployment.",
          language,
        )}
      </p>
      <div className="career-highlights">
        <div className="career-tenure">
          <div className="tenure-number">
            {String(profile.yearsExperience).padStart(2, "0")}
            <span aria-hidden="true">.</span>
          </div>
          <p>
            {text("năm kinh nghiệm", "years of experience", language)}
            <br />
            <strong>
              {text("phát triển phần mềm", "building software", language)}
            </strong>
          </p>
          <a href="#exp">
            FinViet
            <br />
            Software Shinway <span aria-hidden="true">↗</span>
          </a>
        </div>
        {careerHighlights.map((item) => (
          <article className="career-highlight" key={item.id}>
            <span className="capability-mark">
              <CapabilityIcon name={item.id} />
            </span>
            <h3>{item.title[language]}</h3>
            <p>{item.detail[language]}</p>
            <a href={item.href}>
              {item.evidence[language]} <span aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
      </div>
      <div className="about-interests">
        <span className="eyebrow">
          {text("ĐANG QUAN TÂM", "CURRENT INTERESTS", language)}
        </span>
        <ul>
          {interests.map((item) => (
            <li key={item.en}>{item[language]}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
