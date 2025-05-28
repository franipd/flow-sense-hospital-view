
import React from 'react';

interface DepartmentStatusProps {
  expanded?: boolean;
}

export const DepartmentStatus = ({ expanded = false }: DepartmentStatusProps) => {
  const departments = [
    {
      name: 'Emergency Department',
      patients: 12,
      capacity: 15,
      waitTime: '18min',
      status: 'moderate',
      utilization: 80,
    },
    {
      name: 'ICU',
      patients: 18,
      capacity: 20,
      waitTime: '2min',
      status: 'high',
      utilization: 90,
    },
    {
      name: 'General Ward',
      patients: 45,
      capacity: 60,
      waitTime: '8min',
      status: 'normal',
      utilization: 75,
    },
    {
      name: 'Surgery',
      patients: 8,
      capacity: 12,
      waitTime: '5min',
      status: 'normal',
      utilization: 67,
    },
    {
      name: 'Imaging',
      patients: 6,
      capacity: 8,
      waitTime: '12min',
      status: 'moderate',
      utilization: 75,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'high':
        return 'bg-red-500';
      case 'moderate':
        return 'bg-yellow-500';
      case 'normal':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (expanded) {
    return (
      <div className="space-y-6">
        {departments.map((dept, index) => (
          <div
            key={index}
            className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(dept.status)}`}></div>
                <h3 className="text-lg font-semibold text-white">{dept.name}</h3>
              </div>
              <span className="text-sm text-gray-400">Wait: {dept.waitTime}</span>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-400">Current Patients</p>
                <p className="text-2xl font-bold text-white">{dept.patients}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Capacity</p>
                <p className="text-2xl font-bold text-white">{dept.capacity}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Utilization</p>
                <p className="text-2xl font-bold text-white">{dept.utilization}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-[#e5e5e5] rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Department Status</h2>
      <div className="space-y-4">
        {departments.slice(0, 3).map((dept, index) => (
          <div key={index} className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(dept.status)}`}></div>
              <div>
                <p className="font-medium text-gray-900">{dept.name}</p>
                <p className="text-sm text-gray-600">{dept.patients}/{dept.capacity} patients</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">{dept.utilization}%</p>
              <p className="text-xs text-gray-600">{dept.waitTime} wait</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
