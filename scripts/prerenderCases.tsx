import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { renderToString } from "react-dom/server";
import type { Plugin } from "vite";
import { projects } from "../src/data/projects";
import { pageMetadata } from "../src/lib/pageMetadata";
import { LanguageProvider } from "../src/hooks/LanguageProvider";
import Navbar from "../src/components/layout/Navbar";
import Footer from "../src/components/layout/Footer";
import ProjectCaseStudy from "../src/pages/ProjectCaseStudy";
import NotFoundPage from "../src/pages/NotFoundPage";
function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ]!,
  );
}
function withMetadata(
  template: string,
  title: string,
  description: string,
  robots: string,
): string {
  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[^"]*("\s*\/?\s*>)/,
      (_, a, b) => a + escapeHtml(description) + b,
    )
    .replace(
      /(<meta\s+property="og:title"\s+content=")[^"]*("\s*\/?\s*>)/,
      (_, a, b) => a + escapeHtml(title) + b,
    )
    .replace(
      /(<meta\s+property="og:description"\s+content=")[^"]*("\s*\/?\s*>)/,
      (_, a, b) => a + escapeHtml(description) + b,
    )
    .replace("</head>", `<meta name="robots" content="${robots}" /></head>`);
}
export function prerenderCases(): Plugin {
  let outputDirectory = "";
  return {
    name: "portfolio-case-studies",
    apply: "build",
    enforce: "post",
    configResolved(config) {
      outputDirectory = join(config.root, config.build.outDir);
    },
    async writeBundle() {
      const template = await readFile(
        join(outputDirectory, "projects/index.html"),
        "utf8",
      );
      if (!template.includes('<div id="root"></div>')) {
        throw new Error("Missing root container in case-study HTML template");
      }
      for (const project of projects) {
        const meta = pageMetadata(
          { kind: "case-study", slug: project.slug },
          "vi",
        );
        const content = renderToString(
          <LanguageProvider>
            <Navbar projectsPage />
            <main className="container" id="main" tabIndex={-1}>
              <ProjectCaseStudy project={project} />
            </main>
            <div className="container">
              <Footer />
            </div>
          </LanguageProvider>,
        );
        const html = withMetadata(
          template,
          meta.title,
          meta.description,
          meta.robots,
        ).replace(
          '<div id="root"></div>',
          () => `<div id="root">${content}</div>`,
        );
        const directory = join(outputDirectory, "projects", project.slug);
        await mkdir(directory, { recursive: true });
        await writeFile(join(directory, "index.html"), html);
      }
      const meta = pageMetadata({ kind: "not-found" }, "vi");
      const content = renderToString(
        <LanguageProvider>
          <Navbar projectsPage />
          <main className="container" id="main">
            <NotFoundPage />
          </main>
          <div className="container">
            <Footer />
          </div>
        </LanguageProvider>,
      );
      await writeFile(
        join(outputDirectory, "404.html"),
        withMetadata(
          template,
          meta.title,
          meta.description,
          meta.robots,
        ).replace(
          '<div id="root"></div>',
          () => `<div id="root">${content}</div>`,
        ),
      );
    },
  };
}
