import { profile } from "../../data/portfolio";
import { useLanguage, text } from "../../hooks/useLanguage";
import { SectionHeading } from "../ui/SectionHeading";

export default function Contact() {
  const { language } = useLanguage();
  return (
    <section className="section contact-section" id="contact">
      <SectionHeading title={{ vi: "Liên hệ", en: "Contact" }} />
      <div className="contact-copy">
        <p>
          {text(
            "Để trao đổi về công việc Backend / Fullstack hoặc một dự án, bạn có thể gửi email cho mình.",
            "For Backend / Fullstack roles or a conversation about a project, you can reach me by email.",
            language,
          )}
        </p>
        <a className="contact-email text-link" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <ul className="contact-links">
          <li>
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub / tranchien2105
            </a>
          </li>
          <li>
            <a href={`tel:+84${profile.phone.slice(1)}`}>{profile.phone}</a>
          </li>
          <li>
            <a href={profile.cv} download>
              {text("CV / PDF", "CV / PDF", language)}
            </a>
          </li>
        </ul>
        <p className="contact-location">{profile.location}</p>
      </div>
    </section>
  );
}
