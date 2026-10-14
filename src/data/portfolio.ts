import type { EducationItem, ExperienceItem, Profile, ProjectItem, SkillGroup } from '../types/portfolio'

export const profile: Profile = {
  name: 'Tran Minh Chien', title: 'Backend Engineer', location: 'Quan 3, Ho Chi Minh City, Vietnam',
  email: 'tranchien021@gmail.com', github: 'https://github.com/tranchien2105',
  introduction: 'Software Engineer with 4 years of experience building enterprise web applications and RESTful APIs. Strong foundation in API design, authentication, database optimization, Docker, and scalable architecture. Focused on JavaScript/TypeScript with Node.js and NestJS, with production experience in PHP/Laravel systems.',
}

export const interests = ['AI tools for software development', 'Backend technologies', 'Scalable system design', 'Open-source', 'Learning new technologies']

export const skills: SkillGroup[] = [
  { title: 'Languages & Frameworks', skills: ['PHP', 'Laravel', 'Apiato', 'Yii', 'TypeScript', 'Node.js', 'NestJS', 'Next.js', 'React', 'Vue.js'] },
  { title: 'Backend', skills: ['REST API', 'JWT', 'Sanctum', 'Passport', 'RBAC', 'Queues', 'Events', 'WebSocket', 'Socket.IO', 'Redis'] },
  { title: 'Database', skills: ['PostgreSQL', 'MySQL', 'Query Optimization', 'Indexing', 'EXPLAIN ANALYZE', 'Elasticsearch'] },
  { title: 'DevOps', skills: ['Docker', 'Docker Compose', 'Nginx', 'GitHub Actions', 'Git', 'Linux', 'Postman'] },
  { title: 'Language', skills: ['English — TOEIC 600'] },
]

export const experience: ExperienceItem[] = [
  { company: 'FinViet', position: 'Software Engineer', period: 'Aug 2024 — Dec 2025', description: ['Built backend and REST APIs for an enterprise DMS platform.', 'Worked on SQL optimization, modular architecture, API testing, and system integration. PHP, Laravel, Apiato, NestJS, PostgreSQL, Docker.'] },
  { company: 'Software Shinway', position: 'Software Engineer', period: 'Mar 2022 — Jul 2024', description: ['Developed and maintained backend features.', 'Built PDF/Excel export systems and improved existing modules and development workflows. PHP, Laravel, Yii, PostgreSQL, MySQL, Vue.js.'] },
]

export const projects: ProjectItem[] = [
  { name: 'TaskFlow', description: 'Project and task management app in the Jira/Trello style. Includes JWT authentication, project-level authorization, Socket.IO notifications, Redis caching, migrations, Docker, and CI.', github: 'https://github.com/tranchien2105/taskflow', technologies: ['NestJS 11', 'PostgreSQL 16', 'Redis 7', 'Next.js 16', 'React 19'] },
  { name: 'TeamFlow', description: 'Platform for managing profiles, portfolios, CV templates, and blog posts. Portfolios can be published by username.', github: 'https://github.com/tranchien2105/teamflow', technologies: ['Laravel 13', 'Next.js 16', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker'] },
  { name: 'DMS System', description: 'Distributor management platform built by a team of 12, including API integrations, data synchronization, SQL optimization, and Excel/PDF import/export.', github: 'https://eco-dms-dev.finviet.com.vn/', technologies: ['PHP 8.2', 'Apiato', 'Nginx', 'PostgreSQL'] },
  { name: 'VTech E-commerce', description: 'Electronics e-commerce website developed by a team of six, contributing to backend and frontend work.', github: 'https://vtechsolutions.vn/', technologies: ['PHP 8.0', 'Laravel 8', 'MySQL', 'JavaScript', 'Ajax'] },
]

export const education: EducationItem[] = [
  { institution: 'University of Information Technology · Vietnam National University, Ho Chi Minh City', degree: 'Bachelor of Computer Networks and Communications', period: '2018 — 2023', description: 'Grade: Good' },
]
