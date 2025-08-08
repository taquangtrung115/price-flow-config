import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, AlertTriangle } from 'lucide-react';
import { ValidationConfig } from '@/types/pipeline';

interface ValidationFormProps {
  data: ValidationConfig[];
  onChange: (data: ValidationConfig[]) => void;
  onSave: () => void;
}

export const ValidationForm = ({ data, onChange, onSave }: ValidationFormProps) => {
  const addValidation = () => {
    const newValidation: ValidationConfig = {
      id: crypto.randomUUID(),
      stepId: '',
      warningEnabled: true,
    };
    onChange([...data, newValidation]);
  };

  const updateValidation = (index: number, field: keyof ValidationConfig, value: any) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeValidation = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          Validation Configuration
          <Badge variant="outline">MIN/NY Thresholds</Badge>
        </CardTitle>
        <CardDescription>
          Set minimum and maximum thresholds with warning alerts for price validation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((validation, index) => (
          <div key={validation.id} className="p-4 border border-border rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="secondary">Validation #{index + 1}</Badge>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={validation.warningEnabled}
                  onCheckedChange={(checked) => updateValidation(index, 'warningEnabled', checked)}
                />
                <Label className="text-sm">Enable Warnings</Label>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Minimum Field</Label>
                <Input
                  type="number"
                  value={validation.minField || ''}
                  onChange={(e) => updateValidation(index, 'minField', parseFloat(e.target.value) || undefined)}
                  placeholder="Optional minimum value"
                />
              </div>
              <div>
                <Label>Maximum Field</Label>
                <Input
                  type="number"
                  value={validation.maxField || ''}
                  onChange={(e) => updateValidation(index, 'maxField', parseFloat(e.target.value) || undefined)}
                  placeholder="Optional maximum value"
                />
              </div>
            </div>
            
            <div>
              <Label>Error Message</Label>
              <Textarea
                value={validation.errorMessage || ''}
                onChange={(e) => updateValidation(index, 'errorMessage', e.target.value)}
                placeholder="Custom error message for validation failures"
                rows={2}
              />
            </div>
            
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeValidation(index)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Remove
              </Button>
            </div>
          </div>
        ))}
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={addValidation}>
            <Plus className="w-4 h-4 mr-2" />
            Add Validation
          </Button>
          <Button onClick={onSave} className="bg-gradient-primary">
            Save Configuration
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};