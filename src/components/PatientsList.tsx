import React, { useState, useEffect } from 'react';
import { PatientModal } from './PatientModal';
import { patientApi } from '@/services/supabaseApi';
import type { Patient } from '@/types/database';

export const PatientsList = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const data = await patientApi.getAll();
        // Type cast the contact_info from Json to our expected structure
        const typedPatients = data.map(patient => ({
          ...patient,
          contact_info: patient.contact_info as Patient['contact_info']
        }));
        setPatients(typedPatients);
      } catch (error) {
        console.error('Error loading patients:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPatients();
  }, []);

  const getPriorityColor = (priority?: number) => {
    if (!priority) return 'bg-gray-500/20 text-gray-300 border-gray-400/30';
    
    if (priority >= 3) {
      return 'bg-pink-500/20 text-pink-300 border-pink-400/30';
    } else if (priority === 2) {
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

  if (loading) {
    return (
      <div className="bg-black/40 backdrop-blur-sm rounded-xl shadow-2xl border border-white/10 p-8">
        <div className="text-center text-white">Loading patients...</div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-black/40 backdrop-blur-sm rounded-xl shadow-2xl border border-white/10 overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <h2 className="text-2xl font-light text-white tracking-wide">Active Patients</h2>
          <p className="text-sm font-light text-white/60 mt-1 tracking-wide">Real-time patient status monitoring</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-black/20">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-light text-white/60 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-light text-white/60 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-light text-white/60 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-light text-white/60 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-light text-white/60 uppercase tracking-wider">
                  Admitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-light text-white/60 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-black/10 divide-y divide-white/10">
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white font-light">
                          {patient.first_name.charAt(0)}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-light text-white tracking-wide">
                          {patient.first_name} {patient.last_name}
                        </div>
                        <div className="text-sm font-light text-white/60 tracking-wide">
                          {patient.mrn}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-white tracking-wide">
                    {patient.current_location || patient.assigned_bed || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(patient.current_status)} mr-2`}></div>
                      <span className="text-sm font-light text-white tracking-wide">
                        {patient.current_status || 'Unknown'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-light rounded-full border ${getPriorityColor(patient.triage_priority)}`}>
                      {patient.triage_priority ? `LEVEL ${patient.triage_priority}` : 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-white/60 tracking-wide">
                    {formatAdmissionTime(patient.admission_datetime)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-light">
                    <button
                      onClick={() => setSelectedPatient(patient)}
                      className="text-cyan-300 hover:text-cyan-200 transition-colors tracking-wide"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
              {patients.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-white/60">
                    No patients found. Import some patient data to get started.
                  </td>
                </tr>
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
