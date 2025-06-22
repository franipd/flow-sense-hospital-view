
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface NodeDetailsProps {
  node: any;
  onClose: () => void;
}

export const NodeDetails = ({ node, onClose }: NodeDetailsProps) => {
  if (!node) {
    return (
      <Card className="bg-black/40 border-white/20 h-fit">
        <CardContent className="p-6 text-center">
          <div className="text-white/60">
            <div className="text-4xl mb-4">🔍</div>
            <p>Select a node to view details</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'patient': return '👤';
      case 'staff': return '👨‍⚕️';
      case 'department': return '🏥';
      case 'resource': return '🛏️';
      default: return '📋';
    }
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'patient': return 'bg-green-500/20 text-green-300';
      case 'staff': return 'bg-blue-500/20 text-blue-300';
      case 'department': return 'bg-yellow-500/20 text-yellow-300';
      case 'resource': return 'bg-purple-500/20 text-purple-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const renderNodeContent = () => {
    const data = node.data;
    
    switch (node.type) {
      case 'patient':
        return (
          <div className="space-y-3">
            <div>
              <label className="text-white/60 text-sm">Name</label>
              <p className="text-white">{data.name}</p>
            </div>
            <div>
              <label className="text-white/60 text-sm">MRN</label>
              <p className="text-white font-mono">{data.mrn}</p>
            </div>
            <div>
              <label className="text-white/60 text-sm">Status</label>
              <Badge className={`${getNodeColor('patient')} border-0`}>
                {data.status}
              </Badge>
            </div>
            <div>
              <label className="text-white/60 text-sm">Current Location</label>
              <p className="text-white">{data.location || 'Not assigned'}</p>
            </div>
            <div>
              <label className="text-white/60 text-sm">Connections</label>
              <p className="text-white/80 text-sm">{data.connections || 0} relationships</p>
            </div>
          </div>
        );
      
      case 'staff':
        return (
          <div className="space-y-3">
            <div>
              <label className="text-white/60 text-sm">Name</label>
              <p className="text-white">{data.name}</p>
            </div>
            <div>
              <label className="text-white/60 text-sm">Role</label>
              <Badge className={`${getNodeColor('staff')} border-0`}>
                {data.role}
              </Badge>
            </div>
            <div>
              <label className="text-white/60 text-sm">Department</label>
              <p className="text-white">{data.department}</p>
            </div>
            <div>
              <label className="text-white/60 text-sm">Active Patients</label>
              <p className="text-white/80 text-sm">{data.activePatients || 0} patients</p>
            </div>
          </div>
        );
      
      case 'department':
        return (
          <div className="space-y-3">
            <div>
              <label className="text-white/60 text-sm">Department</label>
              <p className="text-white">{data.name}</p>
            </div>
            <div>
              <label className="text-white/60 text-sm">Current Patients</label>
              <p className="text-white">{data.patientCount || 0}</p>
            </div>
            <div>
              <label className="text-white/60 text-sm">Staff Count</label>
              <p className="text-white">{data.staffCount || 0}</p>
            </div>
            <div>
              <label className="text-white/60 text-sm">Utilization</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-cyan-400 h-2 rounded-full"
                    style={{ width: `${data.utilization || 0}%` }}
                  ></div>
                </div>
                <span className="text-white text-sm">{data.utilization || 0}%</span>
              </div>
            </div>
          </div>
        );
      
      case 'resource':
        return (
          <div className="space-y-3">
            <div>
              <label className="text-white/60 text-sm">Resource</label>
              <p className="text-white">{data.name}</p>
            </div>
            <div>
              <label className="text-white/60 text-sm">Type</label>
              <Badge className={`${getNodeColor('resource')} border-0`}>
                {data.type}
              </Badge>
            </div>
            <div>
              <label className="text-white/60 text-sm">Status</label>
              <Badge className={data.status === 'available' ? 'bg-green-500/20 text-green-300 border-0' : 'bg-red-500/20 text-red-300 border-0'}>
                {data.status}
              </Badge>
            </div>
            <div>
              <label className="text-white/60 text-sm">Utilization</label>
              <p className="text-white">{data.utilization || 0}%</p>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="space-y-3">
            <div>
              <label className="text-white/60 text-sm">ID</label>
              <p className="text-white font-mono">{node.id}</p>
            </div>
            <div>
              <label className="text-white/60 text-sm">Type</label>
              <p className="text-white">{node.type}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <Card className="bg-black/40 border-white/20 h-fit">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-white flex items-center gap-2">
          <span className="text-2xl">{getNodeIcon(node.type)}</span>
          Node Details
        </CardTitle>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClose}
          className="text-white/60 hover:text-white hover:bg-white/10"
        >
          <X size={16} />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Badge className={`${getNodeColor(node.type)} border-0 text-xs`}>
            {node.type.toUpperCase()}
          </Badge>
        </div>
        {renderNodeContent()}
      </CardContent>
    </Card>
  );
};
