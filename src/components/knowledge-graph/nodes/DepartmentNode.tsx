
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

interface DepartmentNodeProps {
  data: {
    name: string;
    patientCount?: number;
    staffCount?: number;
    utilization?: number;
  };
  selected?: boolean;
}

export const DepartmentNode = memo(({ data, selected }: DepartmentNodeProps) => {
  return (
    <div className={`bg-black/80 border-2 border-yellow-400 rounded-xl p-4 min-w-[180px] ${
      selected ? 'ring-2 ring-cyan-400' : ''
    }`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
      <Handle type="target" position={Position.Left} className="w-3 h-3" />
      <Handle type="source" position={Position.Right} className="w-3 h-3" />
      
      <div className="text-center">
        <div className="text-3xl mb-2">🏥</div>
        <div className="text-white font-bold text-sm">{data.name}</div>
        <div className="mt-2 space-y-1">
          {data.patientCount !== undefined && (
            <div className="text-yellow-300 text-xs">
              👥 {data.patientCount} patients
            </div>
          )}
          {data.staffCount !== undefined && (
            <div className="text-yellow-300 text-xs">
              👨‍⚕️ {data.staffCount} staff
            </div>
          )}
          {data.utilization !== undefined && (
            <div className="text-xs">
              <div className="flex items-center gap-1">
                <div className="flex-1 bg-white/20 rounded-full h-1">
                  <div 
                    className="bg-yellow-400 h-1 rounded-full"
                    style={{ width: `${data.utilization}%` }}
                  ></div>
                </div>
                <span className="text-yellow-200 text-xs">{data.utilization}%</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

DepartmentNode.displayName = 'DepartmentNode';
