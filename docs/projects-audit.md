# Projects audit — 2026-11-10

Primary CV: `docs/Tran-Minh-Chien-SortWareEngineer.pdf`. The four existing CV projects retain their roles, periods, stacks, responsibilities and URLs. The expanded archive has **8 projects**, with **3 featured** on the homepage: Technest, TaskFlow and Papertrail.

| Project | Evidence | Category | Missing information |
| --- | --- | --- | --- |
| Technest | CV; current README/backend source; `../technest/docs/deployments/2026-11-05/inset-correction/1440-top.png` | Fullstack | CV lists NestJS; current source uses Express 5/Drizzle. Framework change history needs confirmation |
| TaskFlow | CV | Fullstack | Public demo and screenshot |
| DMS System | CV, including the 12-person team | Backend | GitHub and screenshot; CV website returned 404 in the earlier HTTP check |
| VTech | CV, including the 6-person team | Fullstack | GitHub and screenshot |
| Papertrail | `../document-template-library/README.md`, backend template service, package files, Git origin | Fullstack | Explicit role title and dates |
| PayFlow | `../payflow/backend/src/payments/payments.service.ts`, payment controller, migrations, tests, README, package file | Backend | Explicit role title, dates, GitHub, public demo and screenshot |
| SubFlow | `../subflow/README.md`, video processor/service, package files and Git origin | Fullstack | Explicit role title, dates, public demo and screenshot |
| TeamFlow | `../teamflow/README.md` and Git origin; also present in the portfolio's earlier source | Fullstack | Explicit role title, dates, public demo and screenshot |

Sibling source paths refer to the user's local workspace and are not bundled into the website. Additional project categories describe implementation scope, rather than an undocumented job title. Missing roles/dates are shown explicitly in the expanded technical details.

## Verified scope

- **Papertrail:** Next.js, React, NestJS, TypeScript, PostgreSQL, TypeORM, JSZip, Docker and Caddy. Template search/preview, Office placeholder replacement, independent output files, upload validation and document history are supported. It uses a shared Demo User and does not implement authentication.
- **PayFlow:** NestJS/TypeScript/PostgreSQL/TypeORM backend with mock payment callbacks and MoMo Sandbox. Idempotency keys, unique constraints, transactions, pessimistic locks and signed IPN verification are present. No frontend, Stripe integration, production-payment claims or repository URL is inferred.
- **SubFlow:** Next.js/React/NestJS, PostgreSQL/TypeORM, Redis/BullMQ, Python/faster-whisper, FFmpeg and Ollama. Japanese video transcription, Vietnamese translation, subtitle editing, streaming and persisted checkpoints are documented/implemented. The URL-import processing pipeline is not supported yet.
- **TeamFlow:** Laravel/PHP/Sanctum, Next.js/React/TypeScript/Tailwind, PostgreSQL, Redis, Docker Compose and Nginx. The Git origin is `https://github.com/tranchien2105-dotcom/teamflow`, rather than the previously assumed account URL. No localhost address is presented as a public demo.
- No standalone Frontend-only project is documented in this selection. The Frontend filter provides an honest empty state and can display future entries without a layout change.

## Screenshot provenance

`public/projects/screenshots/technest.png` is an unchanged copy of the actual 1440×900 deployment screenshot at `../technest/docs/deployments/2026-11-05/inset-correction/1440-top.png`. It is displayed with explicit dimensions, lazy loading and a source date. Product illustration placeholders inside the running app are part of that app's captured interface.

Papertrail now also has a real 1440×1000 screenshot captured from its public demo on 2026-11-10 (`public/projects/screenshots/papertrail.png`). Six projects still lack screenshots. Other repository image assets were template thumbnails or an avatar and were not used as application screenshots. No generated image or mock screenshot was added. See `visual-assets.md` for provenance.

## Architecture and URLs

`src/data/projects.ts` holds common project facts. `src/data/caseStudies.ts` holds audited technical explanations, architecture connections and source references. Featured entries, archive rows, terminal project output and filter options use that dataset. Existing general profile/experience/education data remains in `src/data/portfolio.ts`.

The Vite build produces `/projects/` and prerendered `/projects/[slug]/index.html` for all eight projects, with individual metadata and readable HTML. Unknown routes use `404.html`. Six projects have interactive logical architecture diagrams; DMS/VTech explicitly show missing architecture information.

## Link and browser verification

HTTP checks on 2026-11-10 returned 200 for all five provided GitHub repositories and the Technest, Papertrail and VTech demos. DMS returned 404. Its original URL is preserved in the dataset with `liveStatus: "unavailable"`; the interface presents an unavailable state in place of a working-demo link.

Validation passed: lint, typecheck, production build, Prettier check and six project/filter regression tests. Chromium tested the production files through a plain static HTTP server, including direct `/projects` access, per-page metadata, homepage/archive navigation, combined filters, query persistence, empty/reset states, keyboard focus after reset, accent-insensitive search, project permalinks, VI/EN metadata, theme controls, screenshot/PDF responses and the terminal's complete project list. Both languages were checked for horizontal overflow at 320, 375, 600, 768, 1024 and 1440px. No runtime errors were observed. Desktop/mobile screenshots were reviewed.

## Interactive case studies — source reconciliation

Technest's current README, backend package and implementation use Express 5, Drizzle ORM, PostgreSQL, Redis and BullMQ, with COD checkout and inventory reservations. The CV entry uses NestJS. The discrepancy is retained in the audit data/docs rather than a public-facing banner. Implementation details describe current source; no migration history or production metrics are inferred. TaskFlow architecture is supported by its current README (REST/JWT, TypeORM, Redis cache, Socket.IO user rooms). Other architecture references are stored beside each graph in `caseStudies.ts`. These are logical application connections, not claims about production deployment topology.
