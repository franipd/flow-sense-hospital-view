
import React, { useState } from 'react';
import { PatientStatusEditor } from './PatientStatusEditor';
import type { Patient } from '@/types/database';

interface PatientTableRowProps {
  patient: Patient;
  onViewDetails: (patient: Patient) => void;
  onPatientUpdate?: (patient: Patient) => void;
}

export const PatientTableRow = ({ patient, onViewDetails, onPatientUpdate }: PatientTableRowProps) => {
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(patient);

  const getPriorityColor = (priority?: number) => {
    if (!priority) return 'bg-gray-500/20 text-gray-300 border-gray-400/30';
    
    if (priority === 1) {
      return 'bg-pink-500/20 text-pink-300 border-pink-400/30';
    } else if (priority === 2) {
      return 'bg-orange-500/20 text-orange-300 border-orange-400/30';
    } else if (priority === 3) {
      return 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30';
    } else {
      return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
    }
  };

  const getStatusColor = (status?: string) => {
    if (!status) return 'bg-gray-500';
    
    switch (status.toLowerCase()) {
      case 'critical':
      case 'in treatment':
        return 'bg-pink-500';
      case 'under treatment':
      case 'under observation':
        return 'bg-orange-500';
      case 'stable':
      case 'admitted':
        return 'bg-cyan-400';
      case 'waiting':
        return 'bg-blue-500';
      case 'ready for discharge':
        return 'bg-green-500';
      case 'discharged':
      case 'transferred':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatAdmissionTime = (datetime?: string) => {
    if (!datetime) return 'N/A';
    
    const admissionDate = new Date(datetime);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - admissionDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - admissionDate.getTime()) / (1000 * 60));
      return `${diffInMinutes}min ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const handleStatusUpdate = (updatedPatient: Patient) => {
    setCurrentPatient(updatedPatient);
    setIsEditingStatus(false);
    if (onPatientUpdate) {
      onPatientUpdate(updatedPatient);
    }
  };

  return (
    <tr className="hover:bg-white/5 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white font-light">
              {currentPatient.first_name.charAt(0)}
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-light text-white tracking-wide">
              {currentPatient.first_name} {currentPatient.last_name}
            </div>
            <div className="text-sm font-light text-white/60 tracking-wide">
              {currentPatient.mrn}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-white tracking-wide">
        {currentPatient.current_location || currentPatient.assigned_bed || 'N/A'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {isEditingStatus ? (
          <PatientStatusEditor
            patient={currentPatient}
            onStatusUpdate={handleStatusUpdate}
            onCancel={() => setIsEditingStatus(false)}
          />
        ) : (
          <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(currentPatient.current_status)} mr-2`}></div>
            <span 
              className="text-sm font-light text-white tracking-wide cursor-pointer hover:text-cyan-300 transition-colors"
              onClick={() => setIsEditingStatus(true)}
              title="Click to edit status"
            >
              {currentPatient.current_status || 'Unknown'}
            </span>
          </div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-light rounded-full border ${getPriorityColor(currentPatient.triage_priority)}`}>
          {currentPatient.triage_priority ? `LEVEL ${currentPatient.triage_priority}` : 'N/A'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-white/60 tracking-wide">
        {formatAdmissionTime(currentPatient.admission_datetime)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-light">
        <button
          onClick={() => onViewDetails(currentPatient)}
          className="text-cyan-300 hover:text-cyan-200 transition-colors tracking-wide"
        >
          View Details
        </button>
      </td>
    </tr>
  );
};
