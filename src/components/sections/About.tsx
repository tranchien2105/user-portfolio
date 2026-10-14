import { interests, profile } from '../../data/portfolio'
import { useLanguage, text } from '../../hooks/useLanguage'
export default function About() {
  const { language } = useLanguage()
  const viInterests = ['AI tools hỗ trợ phát triển phần mềm', 'Công nghệ backend', 'Thiết kế hệ thống mở rộng', 'Open-source', 'Học hỏi công nghệ mới']
  return <section className="section" id="about"><p className="eyebrow">$ cat ./about.md</p><h2 className="section-title">{text('GIỚI THIỆU', 'ABOUT', language)}</h2><div className="about-grid"><p>{language === 'vi' ? 'Kỹ sư phần mềm với 4 năm kinh nghiệm xây dựng ứng dụng web doanh nghiệp và RESTful API. Nền tảng backend vững về thiết kế API, xác thực, tối ưu cơ sở dữ liệu, Docker và kiến trúc mở rộng. Tập trung vào JavaScript/TypeScript với Node.js, NestJS, React, Next.js, đồng thời có kinh nghiệm thực tế với hệ thống PHP/Laravel.' : profile.introduction}</p><div><p className="eyebrow">CURRENT_INTERESTS</p><ol className="interest-list">{interests.map((item, i) => <li key={item}><span>{String(i + 1).padStart(2, '0')}</span>{language === 'vi' ? viInterests[i] : item}</li>)}</ol></div></div></section>
}
