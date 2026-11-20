# Visual assets and composition — updated 2026-11-20

## Technology logos

The monochrome SVG brand marks in `public/technology/` are unmodified files from [Simple Icons](https://github.com/simple-icons/simple-icons/tree/1bb2f6e6ea50f920de8d2f3d273ae48564a5eaee/icons), pinned to commit `1bb2f6e6ea50f920de8d2f3d273ae48564a5eaee`. These original assets are retained for reference. The current skills section uses text lists and does not load brand logos.

Files: php, laravel, yii, nodedotjs, nestjs, typescript, javascript, react, nextdotjs, vuedotjs, postgresql, mysql, redis, docker, linux, nginx, githubactions and git. Each source follows `https://raw.githubusercontent.com/simple-icons/simple-icons/1bb2f6e6ea50f920de8d2f3d273ae48564a5eaee/icons/<slug>.svg`.

Apiato and general capabilities such as REST APIs, Authentication, RBAC, Queues, Database Design and Query Optimization use text labels. No substitute brand marks have been invented. The redesigned skills section uses text lists rather than capability icons or technology badges; original SVG assets remain available. No new brand marks were added during the redesign.

## Actual project screenshots

- Technest: unchanged 1440×900 image from the deployment evidence identified in `projects-audit.md`.
- Papertrail: actual 1440×1000 Chromium capture of `https://papertrail-dev.duckdns.org/` on 2026-11-10, saved as `public/projects/screenshots/papertrail.png`. The app was viewed without changing data. This is an application screenshot, not a template thumbnail or generated mockup.
- TaskFlow: no screenshot available; its expanded overview uses a technical workflow based on JWT, project membership and Socket.IO features already documented in the CV. Source-backed membership and notification decisions are visible alongside the contributions.

## Layout decisions

The page uses horizontal navigation and a centered container capped at 1200px, with responsive side margins. The introduction sits beside a concise career profile. About separates readable prose from directly visible engineering evidence. Experience places dates beside responsibilities and the related DMS/VTech system context, with contributions sourced from existing project data. TechNest has an overview, actual screenshot, implementation details and engineering decisions. TaskFlow and Papertrail each have an expanded editorial overview, visible contributions and source-backed decisions; the remaining five projects are compact rows with optional details. Skills are plain domain groups, and Contact uses direct links. Breakpoints at 1050px, 760px and 600px adapt the layouts to mobile.

TechNest displays its current Express 5/Drizzle implementation stack. The original CV stack and contributions remain accessible in an explicit comparison disclosure; the implementation history is not inferred. No achievements or production metrics were invented.

The audit identified repeated identity information, oversized type, repeated uppercase labels and two-column sections, equal section spacing, and decorative image/About containers. The implementation removes those structures rather than adding another theme. Section gaps are compact and individually sized. Paragraph measures remain limited for readability while project and domain layouts use the available width. Existing utility controls are available through the Options disclosure. No new dependency, decoration, badge or animation was added.

The palette uses a bright white canvas, graphite navigation and vermilion actions. Be Vietnam Pro provides the stronger heading hierarchy; existing monospace faces are used for role and technical metadata. Header and primary-button contrast were checked alongside the muted body text. Newsreader and Be Vietnam Pro WOFF2 subsets are served locally with their SIL OFL licenses. The actual project screenshots, all source data and routes remain intact. Reduced-motion support, command palette, terminal, preferences and clock are retained.

## Validation

- Lint, typecheck, production build and all existing Node test suites passed after the redesign.
- Chromium checked the updated home at 320px, 390px, 768px, 1024px, 1100px, 1440px and 1920px. All eight case studies were additionally checked at 320px, 390px, 768px and 1440px. The archive retains its search/filter interaction checks. No document-level horizontal overflow or runtime errors were observed.
- Desktop and mobile screenshots were inspected. Images preserve explicit dimensions and aspect-ratio frames; screenshots are loaded lazily.
- Interaction checks covered language/theme preferences, command palette and Escape, terminal input with Enter, search/category/reset, URL state, CV download, 404 metadata and architecture node selection.
- Reduced-motion checks confirmed instant scrolling and no hidden entrance-animation sections. Modal controls and terminal input were checked at narrow mobile widths.
- Existing content gaps and the DMS website's unavailable state remain documented in `projects-audit.md`. No field Core Web Vitals measurement or accessibility certification is claimed.
