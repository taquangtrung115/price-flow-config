import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2 } from 'lucide-react';
import { AdjustmentRound1Action } from '@/types/pipeline';

const ACTION_OPTIONS = [
  { value: 'keep', label: 'Keep Original' },
  { value: 'decrease_percent', label: 'Decrease by Percentage' },
  { value: 'set_value', label: 'Set Fixed Value' },
] as const;

interface AdjustmentRound1FormProps {
  data: AdjustmentRound1Action[];
  onChange: (data: AdjustmentRound1Action[]) => void;
  onSave: () => void;
}

export const AdjustmentRound1Form = ({ data, onChange, onSave }: AdjustmentRound1FormProps) => {
  const addAction = () => {
    const newAction: AdjustmentRound1Action = {
      id: crypto.randomUUID(),
      stepId: '',
      branch: 'lt',
      actionCode: 'keep',
    };
    onChange([...data, newAction]);
  };

  const updateAction = (index: number, field: keyof AdjustmentRound1Action, value: any) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeAction = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Adjustment Round 1 Configuration
          <Badge variant="outline">First Pass</Badge>
        </CardTitle>
        <CardDescription>
          Configure price adjustments based on threshold comparisons (less than / greater equal)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((action, index) => (
          <div key={action.id} className="p-4 border border-border rounded-lg space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Branch Type</Label>
                <Select
                  value={action.branch}
                  onValueChange={(value) => updateAction(index, 'branch', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lt">Less Than (&lt;)</SelectItem>
                    <SelectItem value="ge">Greater Equal (≥)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Threshold</Label>
                <Input
                  type="number"
                  value={action.threshold || ''}
                  onChange={(e) => updateAction(index, 'threshold', parseFloat(e.target.value) || undefined)}
                  placeholder="Optional threshold value"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Action</Label>
                <Select
                  value={action.actionCode}
                  onValueChange={(value) => updateAction(index, 'actionCode', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ACTION_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {(action.actionCode === 'decrease_percent' || action.actionCode === 'set_value') && (
                <div>
                  <Label>
                    {action.actionCode === 'decrease_percent' ? 'Percentage' : 'Value'}
                  </Label>
                  <Input
                    type="number"
                    value={action.value || ''}
                    onChange={(e) => updateAction(index, 'value', parseFloat(e.target.value) || undefined)}
                    placeholder={action.actionCode === 'decrease_percent' ? 'e.g., 10' : 'Fixed value'}
                  />
                </div>
              )}
            </div>
            
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeAction(index)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Remove
              </Button>
            </div>
          </div>
        ))}
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={addAction}>
            <Plus className="w-4 h-4 mr-2" />
            Add Action
          </Button>
          <Button onClick={onSave} className="bg-gradient-primary">
            Save Configuration
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};