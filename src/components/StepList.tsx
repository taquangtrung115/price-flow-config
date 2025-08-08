import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StepIcon } from './StepIcon';
import { Step } from '@/types/pipeline';
import { Plus, GripVertical } from 'lucide-react';

interface StepListProps {
  steps: Step[];
  selectedStepId?: string;
  onSelectStep: (step: Step) => void;
  onAddStep: () => void;
}

export const StepList = ({ steps, selectedStepId, onSelectStep, onAddStep }: StepListProps) => {
  return (
    <div className="w-80 bg-card border-r border-border h-screen overflow-y-auto">
      <div className="p-6 border-b border-border bg-gradient-subtle">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Pipeline Steps</h2>
          <Button onClick={onAddStep} size="sm" className="shadow-soft">
            <Plus className="w-4 h-4 mr-1" />
            Add Step
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Configure your pricing pipeline sequence
        </p>
      </div>
      
      <div className="p-4 space-y-2">
        {steps.map((step, index) => (
          <Card
            key={step.id}
            className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-soft ${
              selectedStepId === step.id 
                ? 'border-primary bg-accent shadow-elegant' 
                : 'hover:border-muted-foreground/30'
            }`}
            onClick={() => onSelectStep(step)}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <GripVertical className="w-4 h-4 text-muted-foreground" />
                <Badge variant="outline" className="text-xs">
                  {index + 1}
                </Badge>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <StepIcon stepType={step.stepKey} className="w-4 h-4 text-primary" />
                  <span className="font-medium text-sm text-foreground truncate">
                    {step.name}
                  </span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {step.stepKey}
                </Badge>
                {step.description && (
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          </Card>
        ))}
        
        {steps.length === 0 && (
          <div className="text-center py-8">
            <div className="text-muted-foreground text-sm">
              No steps configured yet
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onAddStep}
              className="mt-2"
            >
              Create First Step
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};