import { experience } from '../../data/portfolio'
import { text, useLanguage } from '../../hooks/useLanguage'
export default function Experience() {
  const { language } = useLanguage()
  return <section className="section" id="exp"><p className="eyebrow">$ git log --experience</p><h2 className="section-title">{text('KINH NGHIỆM', 'EXPERIENCE', language)}</h2><ol className="experience-list">{experience.map((item) => <li className="experience-item" key={item.company}><p className="experience-period">commit {item.period}</p><h3>{item.company}</h3><p className="experience-role">{item.position}</p><ul>{item.description.map((line, i) => <li key={i}>{line}</li>)}</ul></li>)}</ol></section>
}
