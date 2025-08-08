import { Step, BranchSubcase, FilterCategory, AdjustmentRound1Action, AdjustmentRound2Rule, ValidationConfig, RoundingStep } from '@/types/pipeline';

export const mockSteps: Step[] = [
  {
    id: '1',
    stepKey: 'BranchSubcases',
    sequence: 1,
    name: 'Branch Routing',
    description: 'Route different sub-cases to appropriate sequences'
  },
  {
    id: '2',
    stepKey: 'FilterByCategory',
    sequence: 2,
    name: 'Category Filter',
    description: 'Filter materials by category types (VT, VTTH, HC, HCC)'
  },
  {
    id: '3',
    stepKey: 'AdjustmentRound1',
    sequence: 3,
    name: 'First Adjustment',
    description: 'Initial price adjustments based on thresholds'
  },
  {
    id: '4',
    stepKey: 'AdjustmentRound2',
    sequence: 4,
    name: 'Priority Adjustments',
    description: 'Secondary adjustments with priority ordering'
  },
  {
    id: '5',
    stepKey: 'Validation',
    sequence: 5,
    name: 'Price Validation',
    description: 'Validate prices against MIN/NY thresholds'
  },
  {
    id: '6',
    stepKey: 'Rounding',
    sequence: 6,
    name: 'Final Rounding',
    description: 'Apply VAT and rounding to get final prices'
  }
];

export const mockBranchSubcases: BranchSubcase[] = [
  {
    id: 'bs1',
    stepId: '1',
    subcaseCode: 'TH2.1',
    nextSequence: 2
  },
  {
    id: 'bs2',
    stepId: '1',
    subcaseCode: 'TH2.2',
    nextSequence: 3
  }
];

export const mockFilterCategories: FilterCategory[] = [
  {
    id: 'fc1',
    stepId: '2',
    categoryCode: 'VT',
    nextSequence: 3
  },
  {
    id: 'fc2',
    stepId: '2',
    categoryCode: 'VTTH',
    nextSequence: 4
  }
];

export const mockAdjustmentRound1: AdjustmentRound1Action[] = [
  {
    id: 'ar1_1',
    stepId: '3',
    branch: 'lt',
    threshold: 1000,
    actionCode: 'decrease_percent',
    value: 5
  },
  {
    id: 'ar1_2',
    stepId: '3',
    branch: 'ge',
    threshold: 1000,
    actionCode: 'keep'
  }
];

export const mockAdjustmentRound2: AdjustmentRound2Rule[] = [
  {
    id: 'ar2_1',
    stepId: '4',
    categoryCode: 'VT',
    fromPct: 0,
    toPct: 50,
    decreasePct: 3,
    sortLevel1: 1,
    sortLevel2: 1
  },
  {
    id: 'ar2_2',
    stepId: '4',
    categoryCode: 'VT',
    fromPct: 51,
    toPct: 100,
    decreasePct: 5,
    sortLevel1: 1,
    sortLevel2: 2
  }
];

export const mockValidation: ValidationConfig[] = [
  {
    id: 'val1',
    stepId: '5',
    minField: 100,
    maxField: 10000,
    warningEnabled: true,
    errorMessage: 'Price is outside acceptable range'
  }
];

export const mockRounding: RoundingStep[] = [
  {
    id: 'round1',
    stepId: '6',
    vatRate: 10,
    roundingMethod: 'round',
    floorThreshold: undefined
  }
];

export const getMockDataForStep = (stepId: string, stepKey: string) => {
  switch (stepKey) {
    case 'BranchSubcases':
      return mockBranchSubcases.filter(item => item.stepId === stepId);
    case 'FilterByCategory':
      return mockFilterCategories.filter(item => item.stepId === stepId);
    case 'AdjustmentRound1':
      return mockAdjustmentRound1.filter(item => item.stepId === stepId);
    case 'AdjustmentRound2':
      return mockAdjustmentRound2.filter(item => item.stepId === stepId);
    case 'Validation':
      return mockValidation.filter(item => item.stepId === stepId);
    case 'Rounding':
      return mockRounding.filter(item => item.stepId === stepId);
    default:
      return [];
  }
};