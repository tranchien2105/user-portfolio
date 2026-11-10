export interface Localized {
  vi: string;
  en: string;
}

export interface Profile {
  name: string;
  title: string;
  yearsExperience: number;
  location: string;
  email: string;
  github: string;
  phone: string;
  summary: Localized;
  cv: string;
}

export type Capability = "backend" | "frontend" | "database" | "infrastructure";
export interface SkillGroup {
  id: Capability;
  description: Localized;
  supportingSkills?: string[];
  title: Localized;
  skills: string[];
  note?: Localized;
}

export interface ExperienceItem {
  company: string;
  position: string;
  period: string;
  description: Localized[];
  technologies: string[];
}

export type ProjectCategory = "Backend" | "Fullstack" | "Frontend";
export interface ProjectScreenshot {
  src: string;
  width: number;
  height: number;
  alt: Localized;
  caption: Localized;
}
export interface ProjectItem {
  slug: string;
  subtitle: Localized;
  category: ProjectCategory;
  featured: boolean;
  flow?: string[];
  problem: Localized;
  screenshot?: ProjectScreenshot;
  notes?: Localized[];
  sources: string[];
  name: string;
  summary: Localized;
  contributions: Localized[];
  role?: string;
  period?: string;
  kind: Localized;
  technologies: string[];
  github?: string;
  live?: string;
  liveStatus?: "unavailable";
}

export interface EducationItem {
  institution: Localized;
  degree: Localized;
  period: string;
  description: Localized;
}
