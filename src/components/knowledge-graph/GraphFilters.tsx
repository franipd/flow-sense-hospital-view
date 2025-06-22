
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface GraphFiltersProps {
  filters: {
    entityTypes: string[];
    department: string;
    timeRange: string;
  };
  onFiltersChange: (filters: any) => void;
}

export const GraphFilters = ({ filters, onFiltersChange }: GraphFiltersProps) => {
  const entityTypeOptions = [
    { id: 'patients', label: 'Patients', icon: '👥', color: 'text-green-400' },
    { id: 'staff', label: 'Staff', icon: '👨‍⚕️', color: 'text-blue-400' },
    { id: 'departments', label: 'Departments', icon: '🏥', color: 'text-yellow-400' },
    { id: 'resources', label: 'Resources', icon: '🛏️', color: 'text-purple-400' },
  ];

  const departmentOptions = [
    'All Departments',
    'Emergency',
    'ICU',
    'Surgery',
    'Cardiology',
    'Radiology',
    'Laboratory',
    'Pharmacy'
  ];

  const timeRangeOptions = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: 'all', label: 'All Time' }
  ];

  const handleEntityTypeChange = (entityType: string, checked: boolean) => {
    const newEntityTypes = checked 
      ? [...filters.entityTypes, entityType]
      : filters.entityTypes.filter(type => type !== entityType);
    
    onFiltersChange({
      ...filters,
      entityTypes: newEntityTypes
    });
  };

  return (
    <Card className="bg-black/40 border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          🔍 Graph Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="text-white font-medium mb-3">Entity Types</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {entityTypeOptions.map((option) => (
              <label key={option.id} className="flex items-center space-x-2 cursor-pointer">
                <Checkbox
                  checked={filters.entityTypes.includes(option.id)}
                  onCheckedChange={(checked) => handleEntityTypeChange(option.id, checked as boolean)}
                  className="border-white/20"
                />
                <span className={`text-sm ${option.color}`}>
                  {option.icon} {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-white font-medium mb-2 block">Department</label>
            <Select
              value={filters.department}
              onValueChange={(value) => onFiltersChange({ ...filters, department: value })}
            >
              <SelectTrigger className="bg-black/40 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black/95 border-white/20">
                {departmentOptions.map((dept) => (
                  <SelectItem key={dept} value={dept} className="text-white hover:bg-white/10">
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-white font-medium mb-2 block">Time Range</label>
            <Select
              value={filters.timeRange}
              onValueChange={(value) => onFiltersChange({ ...filters, timeRange: value })}
            >
              <SelectTrigger className="bg-black/40 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black/95 border-white/20">
                {timeRangeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-white hover:bg-white/10">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
