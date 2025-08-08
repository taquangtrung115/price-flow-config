import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2 } from 'lucide-react';
import { FilterCategory } from '@/types/pipeline';

const CATEGORY_OPTIONS = [
  { value: 'VT', label: 'Vật tư (VT)' },
  { value: 'VTTH', label: 'Vật tư thay thế (VTTH)' },
  { value: 'HC', label: 'Hóa chất (HC)' },
  { value: 'HCC', label: 'Hóa chất chuyên dụng (HCC)' },
] as const;

interface FilterCategoriesFormProps {
  data: FilterCategory[];
  onChange: (data: FilterCategory[]) => void;
  onSave: () => void;
}

export const FilterCategoriesForm = ({ data, onChange, onSave }: FilterCategoriesFormProps) => {
  const addCategory = () => {
    const newCategory: FilterCategory = {
      id: crypto.randomUUID(),
      stepId: '',
      categoryCode: 'VT',
      nextSequence: 1,
    };
    onChange([...data, newCategory]);
  };

  const updateCategory = (index: number, field: keyof FilterCategory, value: any) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeCategory = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Filter by Category Configuration
          <Badge variant="outline">Material Classification</Badge>
        </CardTitle>
        <CardDescription>
          Define how different material categories are routed through the pipeline
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((category, index) => (
          <div key={category.id} className="flex items-center gap-4 p-4 border border-border rounded-lg">
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`category-${index}`}>Category Code</Label>
                <Select
                  value={category.categoryCode}
                  onValueChange={(value) => updateCategory(index, 'categoryCode', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORY_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor={`sequence-${index}`}>Next Sequence</Label>
                <Input
                  id={`sequence-${index}`}
                  type="number"
                  value={category.nextSequence}
                  onChange={(e) => updateCategory(index, 'nextSequence', parseInt(e.target.value) || 1)}
                  min="1"
                />
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeCategory(index)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={addCategory}>
            <Plus className="w-4 h-4 mr-2" />
            Add Category Filter
          </Button>
          <Button onClick={onSave} className="bg-gradient-primary">
            Save Configuration
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};