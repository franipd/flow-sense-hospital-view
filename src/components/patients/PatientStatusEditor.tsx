
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { securePatientApi } from '@/services/securePatientApi';
import { toast } from '@/components/ui/use-toast';
import type { Patient } from '@/types/database';

interface PatientStatusEditorProps {
  patient: Patient;
  onStatusUpdate: (updatedPatient: Patient) => void;
  onCancel: () => void;
}

export const PatientStatusEditor = ({ patient, onStatusUpdate, onCancel }: PatientStatusEditorProps) => {
  const [newStatus, setNewStatus] = useState(patient.current_status || '');
  const [isUpdating, setIsUpdating] = useState(false);

  const statusOptions = [
    'Critical',
    'Emergency',
    'Urgent',
    'In Treatment',
    'Under Treatment', 
    'Under Observation',
    'Stable',
    'Admitted',
    'Waiting',
    'Ready for Discharge',
    'Discharged',
    'Transferred'
  ];

  const handleUpdate = async () => {
    if (!newStatus) return;
    
    setIsUpdating(true);
    try {
      const updatedPatient = await securePatientApi.update(patient.id, {
        current_status: newStatus
      });
      
      onStatusUpdate(updatedPatient);
      toast({
        title: "Status Updated",
        description: `${patient.first_name} ${patient.last_name}'s status has been updated to ${newStatus}`,
      });
    } catch (error) {
      console.error('Error updating patient status:', error);
      toast({
        title: "Error",
        description: "Failed to update patient status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Select onValueChange={setNewStatus} value={newStatus}>
        <SelectTrigger className="w-48 bg-black/40 border-white/20 text-white">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent className="bg-black/90 border-white/20">
          {statusOptions.map((status) => (
            <SelectItem 
              key={status} 
              value={status}
              className="text-white hover:bg-white/10 focus:bg-white/10"
            >
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button 
        size="sm" 
        onClick={handleUpdate} 
        disabled={isUpdating || !newStatus}
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
