
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TopNavigation } from '@/components/TopNavigation';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { Footer } from '@/components/Footer';
import { SecureCSVImporter } from '@/components/SecureCSVImporter';
import { PatientsList } from '@/components/PatientsList';
import { PatientSearch } from '@/components/PatientSearch';
import { PatientModal } from '@/components/PatientModal';
import { RoleBasedAccess } from '@/components/RoleBasedAccess';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useSecurity } from '@/components/SecurityProvider';
import type { Patient } from '@/types/database';

const Patients = () => {
  const [showImporter, setShowImporter] = useState(false);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'add'>('view');
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [refreshKey, setRefreshKey] = useState(0);
  const { role, loading } = useSecurity();

  // Mock patient for the add modal - matches the Patient interface
  const mockNewPatient = {
    id: '',
    mrn: '',
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '',
    current_location: '',
    current_status: '',
    triage_priority: undefined,
    contact_info: {
      phone: '',
      address: {
        street: '',
        city: '',
        state: '',
        zip: ''
      },
      emergency_contact: {
        name: '',
        phone: '',
        relationship: ''
      }
    }
  } as Patient;

  const handleAddPatient = () => {
    setSelectedPatient(mockNewPatient);
    setModalMode('add');
    setShowPatientModal(true);
  };

  const handleViewPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setModalMode('view');
    setShowPatientModal(true);
  };

  const handleCloseModal = () => {
    setShowPatientModal(false);
    setSelectedPatient(null);
    setModalMode('view');
  };

  const handleSavePatient = (patient: Patient) => {
    // Refresh the patients list by incrementing the key
    setRefreshKey(prev => prev + 1);
    handleCloseModal();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen relative">
        <AnimatedBackground />
        <TopNavigation />
        
        <div className="relative z-10 pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-4">
                  Patient Management
                </h1>
                <p className="text-xl text-white/80 max-w-3xl mx-auto">
                  Manage patient records, view medical histories, and track care pathways
                </p>
                {role && (
                  <p className="text-sm text-white/60 mt-2">
                    Logged in as: {role} {role !== 'admin' && role !== 'receptionist' ? '(Department access only)' : ''}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <RoleBasedAccess allowedRoles={['admin', 'receptionist']}>
                  <Button
                    onClick={handleAddPatient}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  >
                    Add New Patient
                  </Button>
                </RoleBasedAccess>
                
                <RoleBasedAccess allowedRoles={['admin']}>
                  <Button
                    onClick={() => setShowImporter(!showImporter)}
                    variant="outline"
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  >
                    {showImporter ? 'Hide' : 'Import'} CSV Data
                  </Button>
                </RoleBasedAccess>
              </div>

              {showImporter && (
                <div className="mb-8">
                  <SecureCSVImporter />
                </div>
              )}

              <div className="space-y-6">
                <PatientSearch 
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  departmentFilter={departmentFilter}
                  onDepartmentChange={setDepartmentFilter}
                  statusFilter={statusFilter}
                  onStatusChange={setStatusFilter}
                />
                
                <PatientsList 
                  key={refreshKey}
                  searchQuery={searchQuery}
                  departmentFilter={departmentFilter}
                  statusFilter={statusFilter}
                  onViewPatient={handleViewPatient}
                />
              </div>
            </div>
          </div>
        </div>

        <Footer />
        
        {showPatientModal && selectedPatient && (
          <PatientModal 
            patient={selectedPatient}
            mode={modalMode}
            onClose={handleCloseModal}
            onSave={handleSavePatient}
          />
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Patients;
