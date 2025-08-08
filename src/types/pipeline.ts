export type StepType = 
  | 'BranchSubcases'
  | 'FilterByCategory' 
  | 'AdjustmentRound1'
  | 'AdjustmentRound2'
  | 'Validation'
  | 'Rounding';

export interface Step {
  id: string;
  stepKey: StepType;
  sequence: number;
  name: string;
  description?: string;
}

export interface BranchSubcase {
  id: string;
  stepId: string;
  subcaseCode: string;
  nextSequence: number;
}

export interface FilterCategory {
  id: string;
  stepId: string;
  categoryCode: 'VT' | 'VTTH' | 'HC' | 'HCC';
  nextSequence: number;
}

export interface AdjustmentRound1Action {
  id: string;
  stepId: string;
  branch: 'lt' | 'ge';
  threshold?: number;
  actionCode: 'keep' | 'decrease_percent' | 'set_value';
  value?: number;
}

export interface AdjustmentRound2Rule {
  id: string;
  stepId: string;
  categoryCode: string;
  fromPct: number;
  toPct: number;
  decreasePct: number;
  sortLevel1: number;
  sortLevel2: number;
}

export interface ValidationConfig {
  id: string;
  stepId: string;
  minField?: number;
  maxField?: number;
  warningEnabled: boolean;
  errorMessage?: string;
}

export interface RoundingStep {
  id: string;
  stepId: string;
  vatRate: number;
  roundingMethod: 'round' | 'floor' | 'ceil';
  floorThreshold?: number;
}

export interface PipelineRule {
  id: string;
  name: string;
  description?: string;
  steps: Step[];
}