import { useState } from 'react';
import { StepList } from '@/components/StepList';
import { ConfigurationPanel } from '@/components/ConfigurationPanel';
import { Step } from '@/types/pipeline';
import { mockSteps, getMockDataForStep } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [steps] = useState<Step[]>(mockSteps);
  const [selectedStep, setSelectedStep] = useState<Step | null>(null);
  const [stepData, setStepData] = useState<any>(null);

  const handleSelectStep = (step: Step) => {
    setSelectedStep(step);
    const data = getMockDataForStep(step.id, step.stepKey);
    setStepData(data);
  };

  const handleAddStep = () => {
    toast({
      title: "Add Step",
      description: "Step creation functionality would be implemented here",
    });
  };

  const handleStepDataChange = (data: any) => {
    setStepData(data);
  };

  const handleSave = () => {
    toast({
      title: "Configuration Saved",
      description: `Successfully saved ${selectedStep?.stepKey} configuration`,
    });
  };

  return (
    <div className="h-screen flex bg-background">
      <StepList
        steps={steps}
        selectedStepId={selectedStep?.id}
        onSelectStep={handleSelectStep}
        onAddStep={handleAddStep}
      />
      <ConfigurationPanel
        selectedStep={selectedStep}
        stepData={stepData}
        onStepDataChange={handleStepDataChange}
        onSave={handleSave}
      />
    </div>
  );
};

export default Index;
