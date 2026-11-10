import { useMemo } from "react";
import { profile } from "../../data/portfolio";
import { useLanguage, text } from "../../hooks/useLanguage";
import { useTypewriter } from "../../hooks/useTypewriter";
import { Terminal } from "../ui/Terminal";

export default function Hero() {
  const { language } = useLanguage();
  const roles = useMemo(
    () => [
      "Software Engineer",
      "PHP / Laravel Developer",
      "Fullstack Developer",
    ],
    [],
  );
  const role = useTypewriter(roles);
  return (
    <section className="hero section" id="home" aria-labelledby="hero-title">
      <div className="hero-topline">
        <p className="eyebrow">SOFTWARE ENGINEER / PORTFOLIO</p>
        <span className="hero-location">HO CHI MINH CITY, VN · UTC+7</span>
      </div>
      <div className="hero-grid">
        <div className="hero-copy">
          <h1 id="hero-title">
            Tran Minh
            <br />
            <span>Chien.</span>
          </h1>
          <p className="hero-focus">
            BACKEND ENGINEERING · FULLSTACK DEVELOPMENT
          </p>
          <p className="hero-role">
            <span className="sr-only">{roles.join(", ")}</span>
            <span aria-hidden="true">{role}</span>
            <span className="role-cursor" aria-hidden="true">
              |
            </span>
          </p>
          <p className="hero-description">
            {text(
              "Xây dựng ứng dụng web từ API đến giao diện. 4 năm làm việc với hệ thống doanh nghiệp, cùng sự tập trung vào backend vững chắc và trải nghiệm sử dụng rõ ràng.",
              "Building web applications from API to interface. Four years working on enterprise systems, with a focus on solid backend engineering and clear user experiences.",
              language,
            )}
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              {text("Khám phá dự án", "Explore projects", language)}{" "}
              <span aria-hidden="true">↘</span>
            </a>
            <a className="button button-secondary" href={profile.cv} download>
              {text("Tải CV", "Download CV", language)}{" "}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <aside className="hero-aside">
          <div className="aside-label">
            <span>DEVELOPER’S DESK</span>
            <span>01 — INDEX</span>
          </div>
          <Terminal title="chien / interactive console">
            <pre className="terminal-screen">
              <span className="terminal-prompt">$</span> whoami{"\n"}
              <strong>{profile.name}</strong>
              {"\n"}Software Engineer{"\n\n"}
              <span className="terminal-label">Focus </span> Backend & Fullstack
              {"\n"}
              <span className="terminal-label">Stack </span> PHP / Laravel /
              NestJS{"\n"}
              <span className="terminal-label">Frontend </span> React / Next.js
              {"\n"}
              <span className="terminal-label">Data </span> PostgreSQL / MySQL
              {"\n"}
              <span className="terminal-prompt">$</span> help{"\n"}
              {text(
                "Nhập lệnh để khám phá portfolio.",
                "Type a command to explore this portfolio.",
                language,
              )}
            </pre>
          </Terminal>
          <p className="aside-note">
            {text(
              "Một chút terminal, dành cho người thích khám phá.",
              "A little terminal, for the curious.",
              language,
            )}
          </p>
        </aside>
      </div>
      <nav
        className="hero-index"
        aria-label={text("Khám phá chuyên môn", "Explore my work", language)}
      >
        <a href="/projects/?category=Backend">
          <span>01 / BACKEND</span>
          <strong>
            {text("APIs & nghiệp vụ", "APIs & business logic", language)}
          </strong>
          <span aria-hidden="true">↗</span>
        </a>
        <a href="/projects/?category=Fullstack">
          <span>02 / FULLSTACK</span>
          <strong>
            {text("Sản phẩm cá nhân", "Personal products", language)}
          </strong>
          <span aria-hidden="true">↗</span>
        </a>
        <a href="#exp">
          <span>03 / EXPERIENCE</span>
          <strong>
            {text("Hệ thống doanh nghiệp", "Enterprise systems", language)}
          </strong>
          <span aria-hidden="true">↓</span>
        </a>
      </nav>
    </section>
  );
}
