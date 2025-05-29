
import React, { useState, useEffect, useCallback } from 'react';
import { PatientModal } from './PatientModal';
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
}

export const PatientsList = ({ 
  searchQuery = '', 
  departmentFilter = '',
  statusFilter = ''
}: PatientsListProps) => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const { role, loading: securityLoading } = useSecurity();

  const loadPatients = useCallback(async () => {
    // Don't load patients until security is loaded
    if (securityLoading) return;
    
    try {
      const data = await securePatientApi.getAll();
      // Type cast the contact_info from Json to our expected structure
      const typedPatients = data.map(patient => ({
        ...patient,
        contact_info: patient.contact_info as Patient['contact_info']
      }));
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
    loadPatients();
  }, [loadPatients]);

  const filteredPatients = usePatientFiltering({
    patients,
    searchQuery,
    departmentFilter,
    statusFilter
  });

  const hasFilters = searchQuery !== '' || departmentFilter !== 'All Departments' || statusFilter !== 'All Status';

  if (loading || securityLoading) {
    return (
      <div className="bg-black/40 backdrop-blur-sm rounded-xl shadow-2xl border border-white/10 p-8">
        <div className="text-center text-white">Loading patients...</div>
      </div>
    );
  }

  return (
    <>
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
                    onViewDetails={setSelectedPatient}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedPatient && (
        <PatientModal
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
        />
      )}
    </>
  );
};
