
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { securePatientApi } from '@/services/securePatientApi';
import { useSecurity } from '@/components/SecurityProvider';
import { toast } from '@/components/ui/use-toast';
import { usePatientFiltering } from '@/hooks/usePatientFiltering';
import { PatientsListHeader } from './patients/PatientsListHeader';
import { PatientTableHeader } from './patients/PatientTableHeader';
import { PatientTableRow } from './patients/PatientTableRow';
import { PatientTableEmpty } from './patients/PatientTableEmpty';
import type { Patient } from '@/types/database';

interface PatientsListProps {
  searchQuery?: string;
  departmentFilter?: string;
  statusFilter?: string;
  onViewPatient?: (patient: Patient) => void;
}

export const PatientsList = ({ 
  searchQuery = '', 
  departmentFilter = '',
  statusFilter = '',
  onViewPatient
}: PatientsListProps) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const { role, loading: securityLoading } = useSecurity();
  const loadedRef = useRef(false);

  const loadPatients = useCallback(async () => {
    console.log('loadPatients called', { securityLoading, loaded: loadedRef.current });
    
    // Don't load patients until security is loaded
    if (securityLoading) {
      console.log('Security still loading, skipping patient load');
      return;
    }
    
    // Prevent multiple loads
    if (loadedRef.current) {
      console.log('Patients already loaded, skipping');
      setLoading(false);
      return;
    }

    loadedRef.current = true;
    setLoading(true);
    
    try {
      console.log('Fetching patients...');
      const data = await securePatientApi.getAll();
      const typedPatients = data.map(patient => ({
        ...patient,
        contact_info: patient.contact_info as Patient['contact_info']
      }));
      console.log('Patients loaded:', typedPatients.length);
      setPatients(typedPatients);
    } catch (error) {
      console.error('Error loading patients:', error);
      toast({
        title: "Access Error",
        description: "Unable to load patients. Please check your permissions or contact an administrator.",
        variant: "destructive",
      });
      setPatients([]);
    } finally {
      setLoading(false);
    }
  }, [securityLoading]);

  useEffect(() => {
    console.log('PatientsList effect triggered', { securityLoading, loaded: loadedRef.current });
    loadPatients();
  }, [loadPatients]);

  // Reset loaded state when security loading changes
  useEffect(() => {
    if (securityLoading) {
      loadedRef.current = false;
    }
  }, [securityLoading]);

  const handlePatientUpdate = (updatedPatient: Patient) => {
    setPatients(prevPatients => 
      prevPatients.map(patient => 
        patient.id === updatedPatient.id ? updatedPatient : patient
      )
    );
  };

  const filteredPatients = usePatientFiltering({
    patients,
    searchQuery,
    departmentFilter,
    statusFilter
  });

  const hasFilters = searchQuery !== '' || departmentFilter !== 'All Departments' || statusFilter !== 'All Status';

  console.log('PatientsList render:', { loading, securityLoading, patientsCount: patients.length });

  if (loading || securityLoading) {
    return (
      <div className="bg-black/40 backdrop-blur-sm rounded-xl shadow-2xl border border-white/10 p-8">
        <div className="text-center text-white">Loading patients...</div>
      </div>
    );
  }

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-xl shadow-2xl border border-white/10 overflow-hidden">
      <PatientsListHeader 
        patientCount={filteredPatients.length} 
        role={role} 
      />
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10">
          <PatientTableHeader />
          <tbody className="bg-black/10 divide-y divide-white/10">
            {filteredPatients.length === 0 ? (
              <PatientTableEmpty 
                hasPatients={patients.length > 0} 
                hasFilters={hasFilters}
              />
            ) : (
              filteredPatients.map((patient) => (
                <PatientTableRow
                  key={patient.id}
                  patient={patient}
                  onViewDetails={onViewPatient || (() => {})}
                  onPatientUpdate={handlePatientUpdate}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
