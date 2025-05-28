
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
    },
    {
      name: 'ICU',
      patients: 18,
      capacity: 20,
      waitTime: '2min',
      status: 'high',
    },
    {
      name: 'General Ward',
      patients: 45,
      capacity: 60,
      waitTime: '8min',
      status: 'normal',
    },
    {
      name: 'Surgery',
      patients: 8,
      capacity: 12,
      waitTime: '5min',
      status: 'normal',
    },
    {
      name: 'Imaging',
      patients: 6,
      capacity: 8,
      waitTime: '12min',
      status: 'moderate',
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

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return 'from-red-400 to-red-600';
    if (utilization >= 75) return 'from-yellow-400 to-yellow-600';
    return 'from-green-400 to-green-600';
  };

  if (expanded) {
    return (
      <div className="space-y-6">
        {departments.map((dept, index) => {
          const utilization = Math.round((dept.patients / dept.capacity) * 100);
          return (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(dept.status)}`}></div>
                  <h3 className="text-lg font-semibold text-gray-900">{dept.name}</h3>
                </div>
                <span className="text-sm text-gray-500">Wait: {dept.waitTime}</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Current Patients</p>
                  <p className="text-2xl font-bold text-gray-900">{dept.patients}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Capacity</p>
                  <p className="text-2xl font-bold text-gray-900">{dept.capacity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Utilization</p>
                  <p className="text-2xl font-bold text-gray-900">{utilization}%</p>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full bg-gradient-to-r ${getUtilizationColor(utilization)} transition-all duration-300`}
                  style={{ width: `${utilization}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Department Status</h2>
      <div className="space-y-4">
        {departments.slice(0, 3).map((dept, index) => {
          const utilization = Math.round((dept.patients / dept.capacity) * 100);
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(dept.status)}`}></div>
                <div>
                  <p className="font-medium text-gray-900">{dept.name}</p>
                  <p className="text-sm text-gray-500">{dept.patients}/{dept.capacity} patients</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{utilization}%</p>
                <p className="text-xs text-gray-500">{dept.waitTime} wait</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
