import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2 } from 'lucide-react';
import { BranchSubcase } from '@/types/pipeline';

interface BranchSubcasesFormProps {
  data: BranchSubcase[];
  onChange: (data: BranchSubcase[]) => void;
  onSave: () => void;
}

export const BranchSubcasesForm = ({ data, onChange, onSave }: BranchSubcasesFormProps) => {
  const addSubcase = () => {
    const newSubcase: BranchSubcase = {
      id: crypto.randomUUID(),
      stepId: '', // Will be set by parent
      subcaseCode: '',
      nextSequence: 1,
    };
    onChange([...data, newSubcase]);
  };

  const updateSubcase = (index: number, field: keyof BranchSubcase, value: string | number) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeSubcase = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Branch Subcases Configuration
          <Badge variant="outline">TH2.1, TH2.2...</Badge>
        </CardTitle>
        <CardDescription>
          Map each sub-case to its next sequence in the pipeline
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((subcase, index) => (
          <div key={subcase.id} className="flex items-center gap-4 p-4 border border-border rounded-lg">
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`subcase-${index}`}>Sub-case Code</Label>
                <Input
                  id={`subcase-${index}`}
                  value={subcase.subcaseCode}
                  onChange={(e) => updateSubcase(index, 'subcaseCode', e.target.value)}
                  placeholder="e.g., TH2.1"
                />
              </div>
              <div>
                <Label htmlFor={`sequence-${index}`}>Next Sequence</Label>
                <Input
                  id={`sequence-${index}`}
                  type="number"
                  value={subcase.nextSequence}
                  onChange={(e) => updateSubcase(index, 'nextSequence', parseInt(e.target.value) || 1)}
                  min="1"
                />
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeSubcase(index)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={addSubcase}>
            <Plus className="w-4 h-4 mr-2" />
            Add Subcase
          </Button>
          <Button onClick={onSave} className="bg-gradient-primary">
            Save Configuration
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};