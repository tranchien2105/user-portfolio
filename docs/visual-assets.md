# Visual assets and composition — 2026-11-10

## Technology logos

The monochrome SVG brand marks in `public/technology/` are unmodified files from [Simple Icons](https://github.com/simple-icons/simple-icons/tree/1bb2f6e6ea50f920de8d2f3d273ae48564a5eaee/icons), pinned to commit `1bb2f6e6ea50f920de8d2f3d273ae48564a5eaee`. They are served locally with explicit 20×20 image dimensions and decorative empty alt text beside visible technology names.

Files: php, laravel, yii, nodedotjs, nestjs, typescript, javascript, react, nextdotjs, vuedotjs, postgresql, mysql, redis, docker, linux, nginx, githubactions and git. Each source follows `https://raw.githubusercontent.com/simple-icons/simple-icons/1bb2f6e6ea50f920de8d2f3d273ae48564a5eaee/icons/<slug>.svg`.

Apiato and general capabilities such as REST APIs, Authentication, RBAC, Queues, Database Design and Query Optimization use text labels. No substitute brand marks have been invented. Generic line icons in `CapabilityIcon.tsx` describe capability groups and are not presented as brand logos. Docker Compose uses the Docker brand mark.

## Actual project screenshots

- Technest: unchanged 1440×900 image from the deployment evidence identified in `projects-audit.md`.
- Papertrail: actual 1440×1000 Chromium capture of `https://papertrail-dev.duckdns.org/` on 2026-11-10, saved as `public/projects/screenshots/papertrail.png`. The app was viewed without changing data. This is an application screenshot, not a template thumbnail or generated mockup.
- TaskFlow: no screenshot available; its featured presentation uses a labeled technical workflow based on JWT, project membership and Socket.IO features already documented in the CV.

## Layout decisions

About uses one brief introduction, a four-year experience figure and three evidence-linked capability highlights. Skills uses four differently sized capability groups, with separate descriptions of workplace and personal-project experience. Experience uses a continuous timeline. Featured projects pair technical contributions with real screenshots or an explicitly labeled workflow. Education is compact; Contact has a direct email CTA.

The light design tokens match the requested palette: white, #F8FAFC surfaces, #111827 text, #475569 secondary text, #2563EB accent and #E2E8F0 borders. The existing optional dark mode remains supported. No UI library, generated screenshot or raster illustration has been added.

## Validation

- Lint, typecheck, production build, Prettier check and existing project/filter tests passed.
- Chromium checked Vietnamese and English layouts at 375px, 768px and 1440px. No document-level horizontal overflow or runtime errors were observed.
- All 19 rendered brand-image instances loaded successfully from the 18 local SVG assets.
- Regression checks covered the terminal (including supplemental technologies), clock controls, theme/language preferences, CV download, eight-project archive, combined filters, URL persistence, reset focus, permalinks and per-page metadata.
- Screenshots of actual viewports were inspected for Hero, About, Skills, Projects and Contact. Homepage content appears immediately; below-fold reveal uses viewport entry rather than waiting for a percentage of a long section. Reduced-motion preferences remain supported.
- Existing content gaps and the DMS website's unavailable state remain documented in `projects-audit.md`. No field Core Web Vitals measurement or accessibility certification is claimed.
