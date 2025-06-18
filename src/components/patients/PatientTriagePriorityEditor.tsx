
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { securePatientApi } from '@/services/securePatientApi';
import { toast } from '@/components/ui/use-toast';
import type { Patient } from '@/types/database';

interface PatientTriagePriorityEditorProps {
  patient: Patient;
  onPriorityUpdate: (updatedPatient: Patient) => void;
  onCancel: () => void;
}

export const PatientTriagePriorityEditor = ({ patient, onPriorityUpdate, onCancel }: PatientTriagePriorityEditorProps) => {
  const [newPriority, setNewPriority] = useState(patient.triage_priority?.toString() || '');
  const [isUpdating, setIsUpdating] = useState(false);

  const priorityOptions = [
    { value: '1', label: 'LEVEL 1 - Resuscitation', description: 'Immediate' },
    { value: '2', label: 'LEVEL 2 - Emergency', description: '10 minutes' },
    { value: '3', label: 'LEVEL 3 - Urgent', description: '30 minutes' },
    { value: '4', label: 'LEVEL 4 - Semi-urgent', description: '60 minutes' },
    { value: '5', label: 'LEVEL 5 - Non-urgent', description: '120 minutes' }
  ];

  const handleUpdate = async () => {
    if (!newPriority) return;
    
    setIsUpdating(true);
    try {
      const updatedPatient = await securePatientApi.update(patient.id, {
        triage_priority: parseInt(newPriority)
      });
      
      onPriorityUpdate(updatedPatient);
      toast({
        title: "Triage Priority Updated",
        description: `${patient.first_name} ${patient.last_name}'s triage priority has been updated to Level ${newPriority}`,
      });
    } catch (error) {
      console.error('Error updating patient triage priority:', error);
      toast({
        title: "Error",
        description: "Failed to update triage priority. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Select onValueChange={setNewPriority} value={newPriority}>
        <SelectTrigger className="w-56 bg-black/40 border-white/20 text-white">
          <SelectValue placeholder="Select priority" />
        </SelectTrigger>
        <SelectContent className="bg-black/90 border-white/20">
          {priorityOptions.map((option) => (
            <SelectItem 
              key={option.value} 
              value={option.value}
              className="text-white hover:bg-white/10 focus:bg-white/10"
            >
              <div className="flex flex-col">
                <span className="font-medium">{option.label}</span>
                <span className="text-xs text-white/60">{option.description}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button 
        size="sm" 
        onClick={handleUpdate} 
        disabled={isUpdating || !newPriority}
        className="bg-cyan-500 hover:bg-cyan-600 text-white"
      >
        {isUpdating ? 'Updating...' : 'Update'}
      </Button>
      <Button 
        size="sm" 
        variant="outline" 
        onClick={onCancel}
        className="border-white/20 text-white hover:bg-white/10"
      >
        Cancel
      </Button>
    </div>
  );
};
