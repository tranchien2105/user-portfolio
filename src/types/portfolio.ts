export interface Profile {
  name: string;
  title: string;
  location: string;
  email: string;
  github: string;
  introduction: string;
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export interface ExperienceItem {
  company: string;
  position: string;
  period: string;
  description: string[];
}

export interface ProjectItem {
  name: string;
  description: string;
  technologies: string[];
  github: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  description?: string;
}