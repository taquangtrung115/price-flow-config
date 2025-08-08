import { 
  GitBranch, 
  Filter, 
  Settings, 
  BarChart3, 
  CheckCircle, 
  Calculator 
} from 'lucide-react';
import { StepType } from '@/types/pipeline';

interface StepIconProps {
  stepType: StepType;
  className?: string;
}

export const StepIcon = ({ stepType, className = "w-4 h-4" }: StepIconProps) => {
  const iconMap = {
    BranchSubcases: GitBranch,
    FilterByCategory: Filter,
    AdjustmentRound1: Settings,
    AdjustmentRound2: BarChart3,
    Validation: CheckCircle,
    Rounding: Calculator,
  };

  const Icon = iconMap[stepType];
  return <Icon className={className} />;
};