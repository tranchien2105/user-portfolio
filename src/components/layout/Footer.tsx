import { profile } from "../../data/portfolio";
import { useLanguage, text } from "../../hooks/useLanguage";

export default function Footer() {
  const { language } = useLanguage();
  return (
    <footer className="footer">
      <span>
        © {new Date().getFullYear()} {profile.name}
      </span>
      <nav
        className="footer-tools"
        aria-label={text("Liên kết khác", "More links", language)}
      >
        <a href="/#skills">{text("Kỹ năng", "Skills", language)}</a>
        <a href="/#education">{text("Học vấn", "Education", language)}</a>
        <button
          type="button"
          aria-haspopup="dialog"
          onClick={() => window.dispatchEvent(new Event("portfolio:terminal"))}
        >
          Terminal
        </button>
      </nav>
      <a href="#main">{text("Về đầu trang", "Back to top", language)}</a>
    </footer>
  );
}
