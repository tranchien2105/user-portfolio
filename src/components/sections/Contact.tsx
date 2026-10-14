import { profile } from '../../data/portfolio'
import { useLanguage, text } from '../../hooks/useLanguage'

export default function Contact() {
  const { language } = useLanguage()
  return <section className="section contact-section" id="contact"><p className="eyebrow">$ ./contact.sh</p><h2 className="section-title">{text('CÙNG XÂY DỰNG ĐIỀU HỮU ÍCH.', "LET'S BUILD SOMETHING USEFUL.", language)}</h2><p>{text('Nếu bạn đang tìm một Backend Engineer, hãy kết nối với mình.', 'If you are looking for a Backend Engineer, let’s connect.', language)}</p><div className="contact-actions"><a className="button button-primary" href={`mailto:${profile.email}`}>✉ {profile.email}</a><a className="button button-secondary" href={profile.github} target="_blank" rel="noreferrer">GitHub Profile ↗</a></div><p className="contact-location"><span className="status-dot" />{text('Sống tại', 'Based in', language)} {profile.location}</p></section>
}
