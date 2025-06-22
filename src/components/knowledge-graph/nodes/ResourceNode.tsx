
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

interface ResourceNodeProps {
  data: {
    name: string;
    type: string;
    status: string;
    utilization?: number;
  };
  selected?: boolean;
}

export const ResourceNode = memo(({ data, selected }: ResourceNodeProps) => {
  const getResourceIcon = (type: string) => {
    if (type.toLowerCase().includes('bed')) return '🛏️';
    if (type.toLowerCase().includes('equipment')) return '🏥';
    if (type.toLowerCase().includes('room')) return '🚪';
    return '📋';
  };

  const getStatusColor = (status: string) => {
    if (status === 'available') return 'border-green-400';
    if (status === 'in-use') return 'border-orange-400';
    if (status === 'maintenance') return 'border-red-400';
    return 'border-purple-400';
  };

  return (
    <div className={`bg-black/80 border-2 ${getStatusColor(data.status)} rounded-lg p-3 min-w-[140px] ${
      selected ? 'ring-2 ring-cyan-400' : ''
    }`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
      
      <div className="text-center">
        <div className="text-2xl mb-1">{getResourceIcon(data.type)}</div>
        <div className="text-white font-medium text-sm truncate">{data.name}</div>
        <div className="text-purple-300 text-xs">{data.type}</div>
        <div className={`text-xs mt-1 px-1 py-0.5 rounded ${
          data.status === 'available' ? 'bg-green-500/20 text-green-300' :
          data.status === 'in-use' ? 'bg-orange-500/20 text-orange-300' :
          data.status === 'maintenance' ? 'bg-red-500/20 text-red-300' :
          'bg-purple-500/20 text-purple-300'
        }`}>
          {data.status}
        </div>
        {data.utilization !== undefined && (
          <div className="text-xs mt-1 text-purple-200">
            {data.utilization}% used
          </div>
        )}
      </div>
    </div>
  );
});

ResourceNode.displayName = 'ResourceNode';
