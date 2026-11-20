import { profile } from "../../data/portfolio";
import { useLanguage, text } from "../../hooks/useLanguage";

export default function Hero() {
  const { language } = useLanguage();
  return (
    <section className="hero section" id="home" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="hero-role">Software Engineer / Backend & Fullstack</p>
        <h1 id="hero-title">
          Tran Minh <span className="hero-title-surname">Chien</span>
        </h1>
        <p className="hero-focus">
          {text(
            "API, dữ liệu và nghiệp vụ doanh nghiệp.",
            "APIs, data, and enterprise business logic.",
            language,
          )}
        </p>
        <p className="hero-description">{profile.summary[language]}</p>
        <nav
          className="hero-actions"
          aria-label={text(
            "Liên kết giới thiệu",
            "Introduction links",
            language,
          )}
        >
          <a className="button button-primary" href="#projects">
            {text("Xem dự án", "View projects", language)}
          </a>
          <a className="button button-secondary" href={profile.cv} download>
            {text("Tải CV", "Download CV", language)}
          </a>
          <a className="text-link" href="#contact">
            {text("Liên hệ", "Contact", language)}
          </a>
        </nav>
      </div>
      <aside
        className="hero-profile"
        aria-label={text(
          "Thông tin nghề nghiệp",
          "Professional profile",
          language,
        )}
      >
        <h2>{text("Hồ sơ nhanh", "At a glance", language)}</h2>
        <dl>
          <div>
            <dt>{text("Kinh nghiệm", "Experience", language)}</dt>
            <dd>
              {profile.yearsExperience}{" "}
              {text(
                "năm phát triển phần mềm",
                "years building software",
                language,
              )}
              <span>FinViet · Software Shinway</span>
            </dd>
          </div>
          <div>
            <dt>{text("Trong công việc", "Professional work", language)}</dt>
            <dd>
              PHP / Laravel<span>REST APIs · PostgreSQL / MySQL</span>
            </dd>
          </div>
          <div>
            <dt>
              {text("Qua dự án cá nhân", "Through personal projects", language)}
            </dt>
            <dd>
              NestJS · React · Next.js
              <span>
                {text(
                  "API, giao diện và triển khai",
                  "APIs, interfaces, and deployment",
                  language,
                )}
              </span>
            </dd>
          </div>
          <div>
            <dt>{text("Địa điểm", "Based in", language)}</dt>
            <dd>{profile.location}</dd>
          </div>
        </dl>
      </aside>
    </section>
  );
}
