import { useLanguage, text } from "../../hooks/useLanguage";
import { ClockWidget } from "../ui/ClockWidget";
import { useTheme } from "../../hooks/useTheme";

const items = [
  { vi: "Giới thiệu", en: "About", href: "#about" },
  { vi: "Kinh nghiệm", en: "Experience", href: "#exp" },
  { vi: "Kỹ năng", en: "Skills", href: "#skills" },
  { vi: "Dự án", en: "Projects", href: "#projects" },
  { vi: "Học vấn", en: "Education", href: "#education" },
  { vi: "Liên hệ", en: "Contact", href: "#contact" },
];
export default function Navbar({
  projectsPage = false,
}: {
  projectsPage?: boolean;
}) {
  const { language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="site-header">
      <nav
        className="nav container"
        aria-label={text("Điều hướng chính", "Main navigation", language)}
      >
        <a className="brand" href="/#home" aria-label="Tran Minh Chien — Home">
          mc<span>.</span>
        </a>
        <div className="nav-links">
          {items.map((item) => (
            <a
              key={item.href}
              href={
                projectsPage
                  ? item.href === "#projects"
                    ? "/projects/"
                    : `/${item.href}`
                  : item.href
              }
              aria-current={
                projectsPage && item.href === "#projects" ? "page" : undefined
              }
            >
              {text(item.vi, item.en, language)}
            </a>
          ))}
        </div>
        <div className="nav-tools">
          <ClockWidget />
          <button
            className="language-button theme-button"
            type="button"
            onClick={toggleTheme}
            aria-label={text(
              "Đổi giao diện sáng/tối",
              "Toggle light/dark theme",
              language,
            )}
            aria-pressed={theme === "dark"}
          >
            {theme === "light" ? "◐" : "◑"}
          </button>
          <button
            className="language-button"
            type="button"
            onClick={toggleLanguage}
            aria-label={text(
              "Switch to English",
              "Chuyển sang tiếng Việt",
              language,
            )}
          >
            {language.toUpperCase()} <span aria-hidden="true">↔</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
