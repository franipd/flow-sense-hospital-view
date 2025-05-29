import React, { useState } from 'react';
import { PatientModal } from './PatientModal';

export const PatientsList = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);

  const patients = [
    {
      id: 'P001',
      name: 'John Smith',
      room: 'Room 201',
      status: 'Critical',
      admittedTime: '2h ago',
      priority: 'high',
    },
    {
      id: 'P002',
      name: 'Maria Garcia',
      room: 'Room 203',
      status: 'Stable',
      admittedTime: '6h ago',
      priority: 'medium',
    },
    {
      id: 'P003',
      name: 'Robert Johnson',
      room: 'Room 205',
      status: 'Under Treatment',
      admittedTime: '1d ago',
      priority: 'low',
    },
    {
      id: 'P004',
      name: 'Emily Davis',
      room: 'ED Bay 3',
      status: 'Waiting',
      admittedTime: '30min ago',
      priority: 'medium',
    },
    {
      id: 'P005',
      name: 'Michael Brown',
      room: 'ICU 101',
      status: 'Critical',
      admittedTime: '4h ago',
      priority: 'high',
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-pink-500/20 text-pink-300 border-pink-400/30';
      case 'medium':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30';
      case 'low':
        return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-400/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Critical':
        return 'bg-pink-500';
      case 'Under Treatment':
        return 'bg-orange-500';
      case 'Stable':
        return 'bg-cyan-400';
      case 'Waiting':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

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
                          {patient.name.charAt(0)}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-light text-white tracking-wide">{patient.name}</div>
                        <div className="text-sm font-light text-white/60 tracking-wide">{patient.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-white tracking-wide">
                    {patient.room}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(patient.status)} mr-2`}></div>
                      <span className="text-sm font-light text-white tracking-wide">{patient.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-light rounded-full border ${getPriorityColor(patient.priority)}`}>
                      {patient.priority.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-white/60 tracking-wide">
                    {patient.admittedTime}
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
