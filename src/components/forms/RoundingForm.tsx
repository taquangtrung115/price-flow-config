import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Calculator } from 'lucide-react';
import { RoundingStep } from '@/types/pipeline';

const ROUNDING_METHODS = [
  { value: 'round', label: 'Round (Standard)' },
  { value: 'floor', label: 'Floor (Round Down)' },
  { value: 'ceil', label: 'Ceil (Round Up)' },
] as const;

interface RoundingFormProps {
  data: RoundingStep[];
  onChange: (data: RoundingStep[]) => void;
  onSave: () => void;
}

export const RoundingForm = ({ data, onChange, onSave }: RoundingFormProps) => {
  const addRounding = () => {
    const newRounding: RoundingStep = {
      id: crypto.randomUUID(),
      stepId: '',
      vatRate: 10,
      roundingMethod: 'round',
    };
    onChange([...data, newRounding]);
  };

  const updateRounding = (index: number, field: keyof RoundingStep, value: any) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeRounding = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-blue-500" />
          Rounding Configuration
          <Badge variant="outline">Final Price</Badge>
        </CardTitle>
        <CardDescription>
          Configure VAT rates, rounding methods, and floor thresholds for final price calculation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((rounding, index) => (
          <div key={rounding.id} className="p-4 border border-border rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="secondary">Rounding Step #{index + 1}</Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>VAT Rate (%)</Label>
                <Input
                  type="number"
                  value={rounding.vatRate}
                  onChange={(e) => updateRounding(index, 'vatRate', parseFloat(e.target.value) || 0)}
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>
              <div>
                <Label>Rounding Method</Label>
                <Select
                  value={rounding.roundingMethod}
                  onValueChange={(value) => updateRounding(index, 'roundingMethod', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ROUNDING_METHODS.map((method) => (
                      <SelectItem key={method.value} value={method.value}>
                        {method.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {rounding.roundingMethod === 'floor' && (
              <div>
                <Label>Floor Threshold</Label>
                <Input
                  type="number"
                  value={rounding.floorThreshold || ''}
                  onChange={(e) => updateRounding(index, 'floorThreshold', parseFloat(e.target.value) || undefined)}
                  placeholder="Threshold for switching to floor method"
                />
              </div>
            )}
            
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeRounding(index)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Remove
              </Button>
            </div>
          </div>
        ))}
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={addRounding}>
            <Plus className="w-4 h-4 mr-2" />
            Add Rounding Step
          </Button>
          <Button onClick={onSave} className="bg-gradient-primary">
            Save Configuration
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};