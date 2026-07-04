export type RetrievalMode = 'lexical' | 'semantic' | 'hybrid';

export type ArchitectureNode = {
  id: string;
  label: string;
  type: string;
  layer: string;
  x: number;
  y: number;
  description: string;
  evidence: string;
};

export type ArchitectureEdge = {
  from: string;
  to: string;
  modes: RetrievalMode[];
};

export type ArchitectureLayer = {
  id: string;
  label: string;
  color: string;
};

export type ArchitectureData = {
  systemName: string;
  subtitle: string;
  version: string;
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
  layers: ArchitectureLayer[];
};

export type StorySection = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  activeNodes: string[];
  mode: RetrievalMode;
};
