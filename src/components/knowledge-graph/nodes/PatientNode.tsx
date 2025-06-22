
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

interface PatientNodeProps {
  data: {
    name: string;
    mrn: string;
    status: string;
    priority?: number;
  };
  selected?: boolean;
}

export const PatientNode = memo(({ data, selected }: PatientNodeProps) => {
  const getPriorityColor = (priority?: number) => {
    if (!priority) return 'border-green-400';
    if (priority >= 4) return 'border-red-400';
    if (priority >= 3) return 'border-yellow-400';
    return 'border-green-400';
  };

  return (
    <div className={`bg-black/80 border-2 ${getPriorityColor(data.priority)} rounded-lg p-3 min-w-[150px] ${
      selected ? 'ring-2 ring-cyan-400' : ''
    }`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
      
      <div className="text-center">
        <div className="text-2xl mb-1">👤</div>
        <div className="text-white font-medium text-sm truncate">{data.name}</div>
        <div className="text-green-300 text-xs font-mono">{data.mrn}</div>
        <div className="text-white/70 text-xs mt-1">{data.status}</div>
        {data.priority && (
          <div className="text-xs mt-1">
            <span className={`px-1 py-0.5 rounded text-black font-medium ${
              data.priority >= 4 ? 'bg-red-400' : 
              data.priority >= 3 ? 'bg-yellow-400' : 'bg-green-400'
            }`}>
              P{data.priority}
            </span>
          </div>
        )}
      </div>
    </div>
  );
});

PatientNode.displayName = 'PatientNode';
