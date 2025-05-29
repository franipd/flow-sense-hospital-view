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
        return 'bg-cyan-400/20 text-cyan-300 border-cyan-400/30';
      case 'in-use':
        return 'bg-blue-400/20 text-blue-300 border-blue-400/30';
      case 'available':
        return 'bg-gray-400/20 text-gray-300 border-gray-400/30';
      case 'maintenance':
        return 'bg-yellow-400/20 text-yellow-300 border-yellow-400/30';
      case 'out-of-order':
        return 'bg-pink-400/20 text-pink-300 border-pink-400/30';
      default:
        return 'bg-gray-400/20 text-gray-300 border-gray-400/30';
    }
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return 'from-pink-400 to-pink-500';
    if (utilization >= 70) return 'from-yellow-400 to-yellow-500';
    if (utilization > 0) return 'from-cyan-400 to-cyan-500';
    return 'from-gray-400 to-gray-500';
  };

  return (
    <div className="space-y-6">
      {equipment.map((category, categoryIndex) => (
        <div
          key={categoryIndex}
          className="bg-slate-900/40 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-pink-400/20"
        >
          <h3 className="text-2xl font-light text-white mb-4 tracking-wide">{category.category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {category.items.map((item, itemIndex) => (
              <div key={itemIndex} className="border border-white/10 rounded-lg p-4 bg-white/5">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-light text-white text-lg tracking-wide">{item.name}</h4>
                  <span className={`px-2 py-1 text-xs font-light rounded-full border ${getStatusColor(item.status)}`}>
                    {item.status.toUpperCase().replace('-', ' ')}
                  </span>
                </div>
                <p className="text-sm font-light text-white/60 mb-3 tracking-wide">{item.location}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-light text-white/60 tracking-wide">Utilization</span>
                    <span className="font-light text-white tracking-wide">{item.utilization}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
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
