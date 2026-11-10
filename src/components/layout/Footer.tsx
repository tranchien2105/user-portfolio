import { profile } from "../../data/portfolio";
import { useLanguage, text } from "../../hooks/useLanguage";

export default function Footer() {
  const { language } = useLanguage();
  return (
    <footer className="footer">
      <span>
        © {new Date().getFullYear()} {profile.name}
      </span>
      <span>React / TypeScript</span>
      <a href="#main">{text("Về đầu trang", "Back to top", language)} ↑</a>
    </footer>
  );
}
