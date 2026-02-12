
export interface Phase {
  name: string;
  description: string;
  durationWeeks: number;
  tasks: string[];
}

export interface Material {
  item: string;
  category: string;
  estimatedQuantity: string;
  unit: string;
  estimatedCost: number;
}

export interface CostBreakdown {
  category: string;
  estimatedAmount: number;
  notes: string;
}

export interface TimelineEntry {
  phaseName: string;
  startWeek: number;
  endWeek: number;
}

export interface Risk {
  risk: string;
  severity: 'High' | 'Medium' | 'Low';
  mitigation: string;
}

export interface SustainabilityFeature {
  feature: string;
  benefit: string;
  score: number;
}

export interface Optimization {
  suggestion: string;
  impact: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface ConstructionReport {
  projectOverview: string;
  totalEstimatedCost: number;
  totalDurationWeeks: number;
  phases: Phase[];
  materials: Material[];
  costs: CostBreakdown[];
  timeline: TimelineEntry[];
  risks: Risk[];
  sustainability: SustainabilityFeature[];
  optimizations: Optimization[];
}

export interface ProjectInput {
  name: string;
  type: string;
  size: string;
  budget: string;
  location: string;
  description: string;
}
