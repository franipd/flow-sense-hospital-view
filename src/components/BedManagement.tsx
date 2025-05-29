
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { GradientButton } from '@/components/ui/gradient-button';

export const BedManagement = () => {
  const [selectedBed, setSelectedBed] = useState<number | null>(null);

  const bedData = [
    { id: 1, status: 'occupied', patient: 'John Doe', severity: 'high', department: 'ICU' },
    { id: 2, status: 'occupied', patient: 'Jane Smith', severity: 'medium', department: 'ICU' },
    { id: 3, status: 'occupied', patient: 'Bob Johnson', severity: 'low', department: 'ICU' },
    { id: 4, status: 'occupied', patient: 'Alice Brown', severity: 'high', department: 'ICU' },
    { id: 5, status: 'occupied', patient: 'Charlie Wilson', severity: 'medium', department: 'ICU' },
    { id: 6, status: 'occupied', patient: 'Diana Miller', severity: 'low', department: 'ICU' },
    { id: 7, status: 'occupied', patient: 'Eve Davis', severity: 'high', department: 'ICU' },
    { id: 8, status: 'occupied', patient: 'Frank Garcia', severity: 'medium', department: 'ICU' },
    { id: 9, status: 'occupied', patient: 'Grace Martinez', severity: 'low', department: 'ICU' },
    { id: 10, status: 'occupied', patient: 'Henry Anderson', severity: 'high', department: 'ICU' },
    { id: 11, status: 'occupied', patient: 'Ivy Taylor', severity: 'medium', department: 'ICU' },
    { id: 12, status: 'occupied', patient: 'Jack Thomas', severity: 'low', department: 'ICU' },
    { id: 13, status: 'occupied', patient: 'Kelly Jackson', severity: 'high', department: 'ICU' },
    { id: 14, status: 'occupied', patient: 'Liam White', severity: 'medium', department: 'ICU' },
    { id: 15, status: 'available', patient: null, severity: null, department: 'ICU' },
    { id: 16, status: 'occupied', patient: 'Mia Harris', severity: 'low', department: 'ICU' },
    { id: 17, status: 'occupied', patient: 'Noah Martin', severity: 'high', department: 'ICU' },
    { id: 18, status: 'occupied', patient: 'Olivia Thompson', severity: 'medium', department: 'ICU' },
    { id: 19, status: 'occupied', patient: 'Paul Garcia', severity: 'low', department: 'ICU' },
    { id: 20, status: 'maintenance', patient: null, severity: null, department: 'ICU' },
  ];

  const getBedStatusGradient = (status: string, severity?: string | null) => {
    if (status === 'available') {
      return 'bg-gradient-to-br from-cyan-400 via-cyan-300 to-blue-400 shadow-lg shadow-cyan-400/30';
    }
    if (status === 'maintenance') {
      return 'bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 shadow-lg shadow-gray-400/20';
    }
    
    // Occupied beds with gradient based on severity
    switch (severity) {
      case 'high':
        return 'bg-gradient-to-br from-pink-500 via-pink-400 to-purple-500 shadow-lg shadow-pink-400/30';
      case 'medium':
        return 'bg-gradient-to-br from-pink-400 via-pink-300 to-pink-500 shadow-lg shadow-pink-400/25';
      case 'low':
        return 'bg-gradient-to-br from-pink-300 via-pink-200 to-pink-400 shadow-lg shadow-pink-300/20';
      default:
        return 'bg-gradient-to-br from-pink-400 via-pink-300 to-pink-500 shadow-lg shadow-pink-400/25';
    }
  };

  const getBedTextColor = (status: string) => {
    if (status === 'available') return 'text-white font-bold';
    if (status === 'maintenance') return 'text-white font-medium';
    return 'text-white font-bold';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-gradient-to-r from-cyan-400 to-blue-400 text-white';
      case 'occupied':
        return 'bg-gradient-to-r from-pink-400 to-purple-400 text-white';
      case 'maintenance':
        return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getSeverityColor = (severity: string | null) => {
    switch (severity) {
      case 'high':
        return 'bg-gradient-to-r from-red-400 to-pink-400 text-white';
      case 'medium':
        return 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white';
      case 'low':
        return 'bg-gradient-to-r from-green-400 to-cyan-400 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const occupancyRate = (bedData.filter(bed => bed.status === 'occupied').length / bedData.length) * 100;
  const availableBeds = bedData.filter(bed => bed.status === 'available').length;
  const maintenanceBeds = bedData.filter(bed => bed.status === 'maintenance').length;

  return (
    <div className="bg-black/50 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-3xl font-light text-white tracking-wide bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
          ICU Bed Management
        </h3>
        <GradientButton variant="default" className="px-6 py-3 text-base">
          Add Patient
        </GradientButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Card className="bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-cyan-500/10 backdrop-blur-sm border border-white/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-light text-white/90">Occupancy Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl font-extralight text-white">{Math.round(occupancyRate)}%</span>
              <Badge className={getStatusColor('occupied')}>
                {bedData.filter(bed => bed.status === 'occupied').length}/{bedData.length}
              </Badge>
            </div>
            <Progress value={occupancyRate} className="h-3" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-pink-500/10 backdrop-blur-sm border border-white/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-light text-white/90">Available Beds</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-extralight text-white">{availableBeds}</span>
              <Badge className={getStatusColor('available')}>Ready</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gray-500/10 via-gray-400/5 to-gray-600/10 backdrop-blur-sm border border-white/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-light text-white/90">Maintenance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-extralight text-white">{maintenanceBeds}</span>
              <Badge className={getStatusColor('maintenance')}>Under Repair</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <h4 className="text-xl font-light text-white/90 mb-6 tracking-wide">Bed Layout</h4>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-4">
          {bedData.map((bed) => (
            <div
              key={bed.id}
              onClick={() => setSelectedBed(bed.id)}
              className={`
                relative w-16 h-16 rounded-xl flex items-center justify-center cursor-pointer
                transition-all duration-300 hover:scale-110 hover:rotate-2
                ${getBedStatusGradient(bed.status, bed.severity)}
                ${selectedBed === bed.id ? 'ring-4 ring-white/50 scale-110' : ''}
                before:absolute before:inset-0 before:rounded-xl before:p-[1px]
                before:bg-gradient-to-r before:from-white/30 before:via-white/10 before:to-white/30
                before:mask-[linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]
                before:mask-composite-[exclude] before:pointer-events-none
              `}
            >
              <span className={`text-lg font-bold tracking-wide ${getBedTextColor(bed.status)}`}>
                {bed.id}
              </span>
            </div>
          ))}
        </div>
      </div>

      {selectedBed && (
        <Card className="bg-gradient-to-br from-pink-500/15 via-purple-500/8 to-cyan-500/12 backdrop-blur-sm border border-white/30">
          <CardHeader>
            <CardTitle className="text-xl font-light text-white tracking-wide">
              Bed {selectedBed} Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const bed = bedData.find(b => b.id === selectedBed);
              if (!bed) return null;
              
              return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm font-light text-white/70 uppercase tracking-wider mb-2">Status</p>
                    <Badge className={getStatusColor(bed.status)}>
                      {bed.status.charAt(0).toUpperCase() + bed.status.slice(1)}
                    </Badge>
                  </div>
                  
                  {bed.patient && (
                    <>
                      <div>
                        <p className="text-sm font-light text-white/70 uppercase tracking-wider mb-2">Patient</p>
                        <p className="text-white font-medium tracking-wide">{bed.patient}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-light text-white/70 uppercase tracking-wider mb-2">Severity</p>
                        <Badge className={getSeverityColor(bed.severity)}>
                          {bed.severity?.charAt(0).toUpperCase() + bed.severity?.slice(1)}
                        </Badge>
                      </div>
                    </>
                  )}
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}

      <div className="flex justify-center gap-6 mt-8">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-br from-cyan-400 to-blue-400 shadow-sm"></div>
          <span className="text-sm font-light text-white/80 tracking-wide">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-br from-pink-400 to-purple-400 shadow-sm"></div>
          <span className="text-sm font-light text-white/80 tracking-wide">Occupied</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-br from-gray-400 to-gray-500 shadow-sm"></div>
          <span className="text-sm font-light text-white/80 tracking-wide">Maintenance</span>
        </div>
      </div>
    </div>
  );
};
