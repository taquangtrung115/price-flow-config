import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StepIcon } from './StepIcon';
import { BranchSubcasesForm } from './forms/BranchSubcasesForm';
import { FilterCategoriesForm } from './forms/FilterCategoriesForm';
import { AdjustmentRound1Form } from './forms/AdjustmentRound1Form';
import { AdjustmentRound2Form } from './forms/AdjustmentRound2Form';
import { ValidationForm } from './forms/ValidationForm';
import { RoundingForm } from './forms/RoundingForm';
import { Step } from '@/types/pipeline';

interface ConfigurationPanelProps {
  selectedStep: Step | null;
  stepData: any;
  onStepDataChange: (data: any) => void;
  onSave: () => void;
}

export const ConfigurationPanel = ({ 
  selectedStep, 
  stepData, 
  onStepDataChange, 
  onSave 
}: ConfigurationPanelProps) => {
  if (!selectedStep) {
    return (
      <div className="flex-1 bg-gradient-subtle border-l border-border">
        <div className="h-full flex items-center justify-center">
          <div className="text-center p-8">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <StepIcon stepType="BranchSubcases" className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Select a Step to Configure
            </h3>
            <p className="text-muted-foreground">
              Choose a step from the left panel to start configuring your pipeline
            </p>
          </div>
        </div>
      </div>
    );
  }

  const renderForm = () => {
    switch (selectedStep.stepKey) {
      case 'BranchSubcases':
        return (
          <BranchSubcasesForm
            data={stepData || []}
            onChange={onStepDataChange}
            onSave={onSave}
          />
        );
      case 'FilterByCategory':
        return (
          <FilterCategoriesForm
            data={stepData || []}
            onChange={onStepDataChange}
            onSave={onSave}
          />
        );
      case 'AdjustmentRound1':
        return (
          <AdjustmentRound1Form
            data={stepData || []}
            onChange={onStepDataChange}
            onSave={onSave}
          />
        );
      case 'AdjustmentRound2':
        return (
          <AdjustmentRound2Form
            data={stepData || []}
            onChange={onStepDataChange}
            onSave={onSave}
          />
        );
      case 'Validation':
        return (
          <ValidationForm
            data={stepData || []}
            onChange={onStepDataChange}
            onSave={onSave}
          />
        );
      case 'Rounding':
        return (
          <RoundingForm
            data={stepData || []}
            onChange={onStepDataChange}
            onSave={onSave}
          />
        );
      default:
        return <div>Unknown step type</div>;
    }
  };

  return (
    <div className="flex-1 bg-gradient-subtle overflow-y-auto">
      <div className="p-6 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <StepIcon stepType={selectedStep.stepKey} className="w-6 h-6 text-primary" />
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {selectedStep.name}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline">{selectedStep.stepKey}</Badge>
              <Badge variant="secondary">Sequence: {selectedStep.sequence}</Badge>
            </div>
          </div>
        </div>
        {selectedStep.description && (
          <p className="text-muted-foreground mt-2">{selectedStep.description}</p>
        )}
      </div>
      
      <div className="p-6 animate-slide-in">
        {renderForm()}
      </div>
    </div>
  );
};