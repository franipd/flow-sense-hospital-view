
import React from 'react';

interface PatientsListHeaderProps {
  patientCount: number;
  role?: string;
}

export const PatientsListHeader = ({ patientCount, role }: PatientsListHeaderProps) => {
  return (
    <div className="px-6 py-4 border-b border-white/10">
      <h2 className="text-2xl font-light text-white tracking-wide">Active Patients</h2>
      <p className="text-sm font-light text-white/60 mt-1 tracking-wide">
        Real-time patient status monitoring ({patientCount} patients)
        {role && role !== 'admin' && role !== 'receptionist' && (
          <span className="ml-2 text-yellow-300">• Department access only</span>
        )}
      </p>
    </div>
  );
};
