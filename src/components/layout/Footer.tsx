import { profile } from "../../data/portfolio";

export default function Footer() {
  return (
    <footer className="footer">
      <span>
        © {new Date().getFullYear()} {profile.name}
      </span>

      <a
        href={profile.github}
        target="_blank"
        rel="noreferrer"
        aria-label="Visit GitHub profile"
      >
        Built with React + TypeScript ↗
      </a>
    </footer>
  );
}