import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { AdjustmentRound2Rule } from '@/types/pipeline';

interface AdjustmentRound2FormProps {
  data: AdjustmentRound2Rule[];
  onChange: (data: AdjustmentRound2Rule[]) => void;
  onSave: () => void;
}

export const AdjustmentRound2Form = ({ data, onChange, onSave }: AdjustmentRound2FormProps) => {
  const addRule = () => {
    const newRule: AdjustmentRound2Rule = {
      id: crypto.randomUUID(),
      stepId: '',
      categoryCode: '',
      fromPct: 0,
      toPct: 100,
      decreasePct: 0,
      sortLevel1: 1,
      sortLevel2: 1,
    };
    onChange([...data, newRule]);
  };

  const updateRule = (index: number, field: keyof AdjustmentRound2Rule, value: any) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeRule = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const moveRule = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= data.length) return;
    
    const updated = [...data];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    onChange(updated);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Adjustment Round 2 Configuration
          <Badge variant="outline">Priority Ordering</Badge>
        </CardTitle>
        <CardDescription>
          Define percentage-based adjustments with two-level sorting priority
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((rule, index) => (
          <div key={rule.id} className="p-4 border border-border rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="secondary">Rule #{index + 1}</Badge>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => moveRule(index, 'up')}
                  disabled={index === 0}
                >
                  <ArrowUp className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => moveRule(index, 'down')}
                  disabled={index === data.length - 1}
                >
                  <ArrowDown className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Category Code</Label>
                <Input
                  value={rule.categoryCode}
                  onChange={(e) => updateRule(index, 'categoryCode', e.target.value)}
                  placeholder="e.g., VT, VTTH"
                />
              </div>
              <div>
                <Label>From %</Label>
                <Input
                  type="number"
                  value={rule.fromPct}
                  onChange={(e) => updateRule(index, 'fromPct', parseFloat(e.target.value) || 0)}
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <Label>To %</Label>
                <Input
                  type="number"
                  value={rule.toPct}
                  onChange={(e) => updateRule(index, 'toPct', parseFloat(e.target.value) || 0)}
                  min="0"
                  max="100"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Decrease %</Label>
                <Input
                  type="number"
                  value={rule.decreasePct}
                  onChange={(e) => updateRule(index, 'decreasePct', parseFloat(e.target.value) || 0)}
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <Label>Sort Level 1</Label>
                <Input
                  type="number"
                  value={rule.sortLevel1}
                  onChange={(e) => updateRule(index, 'sortLevel1', parseInt(e.target.value) || 1)}
                  min="1"
                />
              </div>
              <div>
                <Label>Sort Level 2</Label>
                <Input
                  type="number"
                  value={rule.sortLevel2}
                  onChange={(e) => updateRule(index, 'sortLevel2', parseInt(e.target.value) || 1)}
                  min="1"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeRule(index)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Remove
              </Button>
            </div>
          </div>
        ))}
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={addRule}>
            <Plus className="w-4 h-4 mr-2" />
            Add Rule
          </Button>
          <Button onClick={onSave} className="bg-gradient-primary">
            Save Configuration
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};