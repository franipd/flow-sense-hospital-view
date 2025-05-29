
import { useMemo } from 'react';
import { useSecurity } from '@/components/SecurityProvider';
import type { Patient } from '@/types/database';

interface UsePatientFilteringProps {
  patients: Patient[];
  searchQuery: string;
  departmentFilter: string;
  statusFilter: string;
}

export const usePatientFiltering = ({
  patients,
  searchQuery,
  departmentFilter,
  statusFilter
}: UsePatientFilteringProps) => {
  const { role, department } = useSecurity();

  const filteredPatients = useMemo(() => {
    return patients.filter(patient => {
      // Basic search filter
      const matchesSearch = searchQuery === '' || 
        patient.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.mrn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (patient.current_location || '').toLowerCase().includes(searchQuery.toLowerCase());

      // Department filter
      const matchesDepartment = departmentFilter === '' || departmentFilter === 'All Departments' ||
        (patient.current_location || '').toLowerCase().includes(departmentFilter.toLowerCase());

      // Status filter
      const matchesStatus = statusFilter === '' || statusFilter === 'All Status' ||
        (patient.current_status || '').toLowerCase().includes(statusFilter.toLowerCase());

      // Security-based filtering
      const hasSecurityAccess = (() => {
        if (role === 'admin' || role === 'receptionist') return true;
        if (role === 'doctor' || role === 'nurse' || role === 'technician') {
          return !department || !patient.current_location || patient.current_location === department;
        }
        return false;
      })();

      return matchesSearch && matchesDepartment && matchesStatus && hasSecurityAccess;
    });
  }, [patients, searchQuery, departmentFilter, statusFilter, role, department]);

  return filteredPatients;
};
