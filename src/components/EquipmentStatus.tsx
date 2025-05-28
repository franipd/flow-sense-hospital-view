
import React from 'react';

export const EquipmentStatus = () => {
  const equipment = [
    {
      category: 'Imaging Equipment',
      items: [
        { name: 'MRI Scanner 1', status: 'operational', utilization: 85, location: 'Imaging Dept A' },
        { name: 'MRI Scanner 2', status: 'maintenance', utilization: 0, location: 'Imaging Dept B' },
        { name: 'CT Scanner 1', status: 'operational', utilization: 92, location: 'Imaging Dept A' },
        { name: 'CT Scanner 2', status: 'operational', utilization: 78, location: 'Imaging Dept B' },
        { name: 'X-Ray Machine 1', status: 'operational', utilization: 65, location: 'Emergency' },
        { name: 'X-Ray Machine 2', status: 'operational', utilization: 70, location: 'General Ward' },
      ],
    },
    {
      category: 'Life Support Equipment',
      items: [
        { name: 'Ventilator 1', status: 'in-use', utilization: 100, location: 'ICU Room 1' },
        { name: 'Ventilator 2', status: 'in-use', utilization: 100, location: 'ICU Room 3' },
        { name: 'Ventilator 3', status: 'available', utilization: 0, location: 'ICU Storage' },
        { name: 'Ventilator 4', status: 'available', utilization: 0, location: 'ICU Storage' },
        { name: 'Defibrillator 1', status: 'available', utilization: 0, location: 'Emergency' },
        { name: 'Defibrillator 2', status: 'available', utilization: 0, location: 'ICU' },
      ],
    },
    {
      category: 'Surgical Equipment',
      items: [
        { name: 'OR Table 1', status: 'in-use', utilization: 100, location: 'Surgery Room 1' },
        { name: 'OR Table 2', status: 'available', utilization: 0, location: 'Surgery Room 2' },
        { name: 'Anesthesia Machine 1', status: 'in-use', utilization: 100, location: 'Surgery Room 1' },
        { name: 'Anesthesia Machine 2', status: 'available', utilization: 0, location: 'Surgery Room 2' },
        { name: 'Surgical Lights 1', status: 'operational', utilization: 80, location: 'Surgery Room 1' },
        { name: 'Surgical Lights 2', status: 'operational', utilization: 60, location: 'Surgery Room 2' },
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-use':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'available':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'out-of-order':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return 'from-red-400 to-red-600';
    if (utilization >= 70) return 'from-yellow-400 to-yellow-600';
    if (utilization > 0) return 'from-green-400 to-green-600';
    return 'from-gray-400 to-gray-600';
  };

  return (
    <div className="space-y-6">
      {equipment.map((category, categoryIndex) => (
        <div
          key={categoryIndex}
          className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {category.items.map((item, itemIndex) => (
              <div key={itemIndex} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(item.status)}`}>
                    {item.status.toUpperCase().replace('-', ' ')}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{item.location}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Utilization</span>
                    <span className="font-medium">{item.utilization}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${getUtilizationColor(item.utilization)} transition-all duration-300`}
                      style={{ width: `${item.utilization}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
