import { careerHighlights, interests } from "../../data/portfolio";
import { useLanguage, text } from "../../hooks/useLanguage";
import { SectionHeading } from "../ui/SectionHeading";

export default function About() {
  const { language } = useLanguage();
  return (
    <section className="section about-section" id="about">
      <SectionHeading
        title={{
          vi: "Chuyên môn & cách làm việc",
          en: "My engineering practice",
        }}
      />
      <div className="about-reading">
        <div className="about-copy">
          <p className="about-introduction">
            {text(
              "Công việc của mình tập trung vào phần phía sau giao diện: thiết kế API, xử lý nghiệp vụ, đồng bộ dữ liệu và tối ưu truy vấn. Tại FinViet và Software Shinway, mình phát triển và bảo trì những module được sử dụng trong quy trình doanh nghiệp.",
              "My work focuses on what sits behind an interface: API design, business logic, data synchronization, and query optimization. At FinViet and Software Shinway, I developed and maintained modules used in enterprise workflows.",
              language,
            )}
          </p>
          <p>
            {text(
              "Các dự án cá nhân giúp mình làm trọn luồng sản phẩm: từ phân quyền và cấu trúc dữ liệu đến giao diện, tác vụ nền và triển khai. Những phần bên dưới tách rõ kinh nghiệm trong công việc với phạm vi thực hành ở từng dự án.",
              "Personal projects let me work across the product: from authorization and data structures to interfaces, background jobs, and deployment. The work below distinguishes professional experience from the scope of each personal project.",
              language,
            )}
          </p>
          <div className="about-interests">
            <h3>
              {text("Đang tìm hiểu thêm", "Currently exploring", language)}
            </h3>
            <ul>
              {interests.map((item) => (
                <li key={item.en}>{item[language]}</li>
              ))}
            </ul>
          </div>
        </div>
        <dl className="practice-list">
          {careerHighlights.map((item) => (
            <div key={item.id}>
              <dt>{item.title[language]}</dt>
              <dd>
                <p>{item.detail[language]}</p>
                <a className="text-link" href={item.href}>
                  {item.evidence[language]}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
