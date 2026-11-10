import type { Localized } from "./portfolio";
export interface ArchitectureNode {
  id: string;
  label: string;
  description: Localized;
  column: number;
  row: number;
}
export interface ArchitectureEdge {
  from: string;
  to: string;
  label: Localized;
}
export interface Architecture {
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
  source: string;
}
export interface TechnicalChallenge {
  title: Localized;
  approach: Localized;
}
export interface CaseStudy {
  solution?: Localized[];
  architecture?: Architecture;
  challenges: TechnicalChallenge[];
  implementationStack?: string[];
  evidenceNote?: Localized;
  references: string[];
}
