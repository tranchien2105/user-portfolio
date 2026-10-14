import { skills } from '../../data/portfolio'
import { useLanguage, text } from '../../hooks/useLanguage'
export default function Skills() {
  const { language } = useLanguage()
  return <section className="section" id="skills"><p className="eyebrow">$ ls ./skills</p><h2 className="section-title">{text('KỸ NĂNG', 'SKILLS', language)}</h2><div className="skills-grid">{skills.map((group, index) => <article className="panel skill-card" key={group.title}><div className="skill-card-header"><span className="skill-index">{String(index + 1).padStart(2, '0')}</span><span className="skill-count">{String(group.skills.length).padStart(2, '0')} {text('công nghệ', 'technologies', language)}</span></div><h3>{group.title}</h3><div className="tag-list">{group.skills.map((skill) => <span className="tag" key={skill}>{skill}</span>)}</div></article>)}</div></section>
}
