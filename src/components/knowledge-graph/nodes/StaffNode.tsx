
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

interface StaffNodeProps {
  data: {
    name: string;
    role: string;
    department: string;
    activePatients?: number;
  };
  selected?: boolean;
}

export const StaffNode = memo(({ data, selected }: StaffNodeProps) => {
  const getRoleIcon = (role: string) => {
    if (role.toLowerCase().includes('doctor') || role.toLowerCase().includes('physician')) return '👨‍⚕️';
    if (role.toLowerCase().includes('nurse')) return '👩‍⚕️';
    if (role.toLowerCase().includes('tech')) return '👨‍💻';
    return '👤';
  };

  return (
    <div className={`bg-black/80 border-2 border-blue-400 rounded-lg p-3 min-w-[150px] ${
      selected ? 'ring-2 ring-cyan-400' : ''
    }`}>
      <Handle type="target" position={Position.Left} className="w-3 h-3" />
      <Handle type="source" position={Position.Right} className="w-3 h-3" />
      
      <div className="text-center">
        <div className="text-2xl mb-1">{getRoleIcon(data.role)}</div>
        <div className="text-white font-medium text-sm truncate">{data.name}</div>
        <div className="text-blue-300 text-xs">{data.role}</div>
        <div className="text-white/70 text-xs mt-1">{data.department}</div>
        {data.activePatients !== undefined && (
          <div className="text-xs mt-1 text-blue-200">
            {data.activePatients} patients
          </div>
        )}
      </div>
    </div>
  );
});

StaffNode.displayName = 'StaffNode';
