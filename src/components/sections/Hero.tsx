import { profile } from '../../data/portfolio'
import { useLanguage, text } from '../../hooks/useLanguage'
import { useMemo } from 'react'
import { useTypewriter } from '../../hooks/useTypewriter'
import { Terminal } from '../ui/Terminal'

export default function Hero() {
  const { language } = useLanguage()
  const roleWords = useMemo(() => language === 'vi'
    ? ['Kỹ sư Backend', 'Lập trình viên PHP / Laravel', 'Kỹ sư Node.js / NestJS', 'Lập trình viên TypeScript']
    : ['Backend Engineer', 'PHP / Laravel Developer', 'Node.js / NestJS Engineer', 'TypeScript Developer'], [language])
  const role = useTypewriter(roleWords)
  return <section className="hero section" id="home"><div className="hero-copy">
    <p className="eyebrow">$ whoami</p><h1>TRAN MINH<br />CHIEN</h1>
    <h2 className="hero-role" aria-label={roleWords.join(', ')}><span aria-hidden="true">{role}</span><span className="terminal-cursor" aria-hidden="true">_</span></h2>
    <p className="hero-meta">PHP/Laravel · NestJS · TypeScript — {profile.location}</p>
    <p className="hero-description">{language === 'vi' ? 'Kỹ sư phần mềm với 4 năm kinh nghiệm xây dựng ứng dụng web doanh nghiệp và RESTful API. Có nền tảng vững về thiết kế API, xác thực, tối ưu cơ sở dữ liệu, Docker và kiến trúc mở rộng.' : profile.introduction}</p>
    <div className="hero-status"><p>● {text('KỸ SƯ BACKEND', 'BACKEND ENGINEER', language)}</p><p>● {text('TP. HỒ CHÍ MINH', 'HO CHI MINH CITY', language)}</p><p>● {text('SẴN SÀNG CHO CƠ HỘI MỚI', 'OPEN TO WORK', language)}</p></div>
    <div className="hero-actions"><a className="button button-primary" href="#projects">{text('[ XEM DỰ ÁN ]', '[ VIEW PROJECTS ]', language)}</a><a className="button button-secondary" href="#contact">{text('[ LIÊN HỆ ]', '[ CONTACT ]', language)}</a></div>
    <div className="hero-stats"><span><b>04+</b> {text('năm kinh nghiệm', 'years experience', language)}</span><span><b>02</b> {text('công ty', 'companies', language)}</span><span><b>04</b> {text('dự án tiêu biểu', 'selected projects', language)}</span></div>
  </div><Terminal title="chien@portfolio: ~"><pre className="terminal-screen"><span className="terminal-prompt">$</span> neofetch{'\n\n'}<strong className="terminal-name">TRAN MINH CHIEN</strong>{'\n'}Backend Engineer{'\n\n'}<span className="terminal-label">OS　　 </span> Linux / WSL{'\n'}<span className="terminal-label">Runtime</span> Node.js / PHP{'\n'}<span className="terminal-label">DB　　 </span> PostgreSQL / MySQL{'\n'}<span className="terminal-label">Cache　</span> Redis{'\n'}<span className="terminal-label">Infra　</span> Docker / Nginx{'\n\n'}<span className="terminal-prompt">$</span> status{'\n'}<span className="accent">●</span> OPEN TO WORK{'\n'}<span className="terminal-prompt">$</span> uptime{'\n'}4+ years building software</pre></Terminal></section>
}
