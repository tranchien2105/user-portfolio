import { profile } from "../../data/portfolio";
import { useLanguage, text } from "../../hooks/useLanguage";
export default function Contact() {
  const { language } = useLanguage();
  return (
    <section className="section contact-section" id="contact">
      <div className="contact-grid">
        <div className="contact-copy">
          <p className="eyebrow">06 / CONTACT</p>
          <h2>
            {text("Trao đổi về dự án", "Talk about a project", language)}
            <br />
            <span>
              {text("hoặc cơ hội mới.", "or an opportunity.", language)}
            </span>
          </h2>
          <p>
            {text(
              "Kết nối với mình để trao đổi về phát triển backend, fullstack hoặc một sản phẩm bạn đang xây dựng.",
              "Connect with me to discuss backend or fullstack development, or a product you are building.",
              language,
            )}
          </p>
          <a
            className="button button-primary contact-cta"
            href={`mailto:${profile.email}`}
          >
            {text("Gửi email cho mình", "Send me an email", language)}{" "}
            <span aria-hidden="true">↗</span>
          </a>
          <p className="contact-location">{profile.location}</p>
        </div>
        <div className="contact-links">
          <p className="contact-links-label">
            {text("KẾT NỐI TRỰC TIẾP", "DIRECT CONNECTIONS", language)}
          </p>
          <a className="contact-email" href={`mailto:${profile.email}`}>
            {profile.email} <span aria-hidden="true">↗</span>
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub <span>tranchien2105 ↗</span>
          </a>
          <a href={`tel:+84${profile.phone.slice(1)}`}>
            {text("Điện thoại", "Phone", language)}{" "}
            <span>{profile.phone} ↗</span>
          </a>
          <a href={profile.cv} download>
            {text("Tải CV", "Download CV", language)} <span>PDF ↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
