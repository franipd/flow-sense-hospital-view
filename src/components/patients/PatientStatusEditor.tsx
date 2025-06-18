
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

  const handleUpdate = async () => {
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
        <SelectTrigger className="w-40 bg-black/40 border-white/20 text-white">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Critical">Critical</SelectItem>
          <SelectItem value="In Treatment">In Treatment</SelectItem>
          <SelectItem value="Under Treatment">Under Treatment</SelectItem>
          <SelectItem value="Under Observation">Under Observation</SelectItem>
          <SelectItem value="Stable">Stable</SelectItem>
          <SelectItem value="Admitted">Admitted</SelectItem>
          <SelectItem value="Waiting">Waiting</SelectItem>
          <SelectItem value="Ready for Discharge">Ready for Discharge</SelectItem>
          <SelectItem value="Discharged">Discharged</SelectItem>
          <SelectItem value="Transferred">Transferred</SelectItem>
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
