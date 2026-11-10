import { projects } from "../data/projects.ts";
export type PortfolioRoute =
  | { kind: "home" }
  | { kind: "projects" }
  | { kind: "case-study"; slug: string }
  | { kind: "not-found" };
export function resolveRoute(pathname: string): PortfolioRoute {
  const path = pathname.replace(/\/index\.html$/, "").replace(/\/+$/, "");
  if (!path) return { kind: "home" };
  if (path === "/projects") return { kind: "projects" };
  const match = /^\/projects\/([a-z0-9]+(?:-[a-z0-9]+)*)$/.exec(path);
  if (match && projects.some((project) => project.slug === match[1]))
    return { kind: "case-study", slug: match[1] };
  return { kind: "not-found" };
}
