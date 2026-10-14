import { useLanguage, text } from '../../hooks/useLanguage'
import { ClockWidget } from '../ui/ClockWidget'
import { useTheme } from '../../hooks/useTheme'

const items = [
  { vi: 'GIỚI THIỆU', en: 'ABOUT', href: '#about' }, { vi: 'KỸ NĂNG', en: 'SKILLS', href: '#skills' },
  { vi: 'KINH NGHIỆM', en: 'EXPERIENCE', href: '#exp' }, { vi: 'DỰ ÁN', en: 'PROJECTS', href: '#projects' },
  { vi: 'HỌC VẤN', en: 'EDUCATION', href: '#education' }, { vi: 'LIÊN HỆ', en: 'CONTACT', href: '#contact' },
]

export default function Navbar() {
  const { language, toggleLanguage } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  return <header className="site-header"><nav className="nav container" aria-label={text('Điều hướng chính', 'Main navigation', language)}>
    <a className="brand" href="#home">~/chien</a>
    <div className="nav-links">{items.map((item) => <a key={item.href} href={item.href}>{text(item.vi, item.en, language)}</a>)}</div>
    <div className="nav-tools"><ClockWidget /><button className="language-button" type="button" onClick={toggleTheme} aria-label={text('Đổi giao diện sáng/tối', 'Toggle light/dark theme', language)}>{theme === 'light' ? '☾' : '☀'}</button><button className="language-button" type="button" onClick={toggleLanguage} aria-label={text('Chuyển ngôn ngữ', 'Switch language', language)}>{language === 'vi' ? <><b>VI</b> / EN</> : <>VI / <b>EN</b></>}</button></div>
  </nav></header>
}
