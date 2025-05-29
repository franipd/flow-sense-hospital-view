
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRealtimePatientEvents } from '@/hooks/useRealtimeData';

export const PhysicianDashboard = () => {
  const { events, loading } = useRealtimePatientEvents();

  const pendingConsultations = events.filter(event => 
    event.event_type === 'consultation_requested' || 
    event.event_type === 'waiting_physician'
  );

  const criticalPatients = events.filter(event => 
    event.event_data?.acuity === 'critical' || 
    event.event_data?.priority === 'high'
  );

  const diagnosticsPending = events.filter(event => 
    event.event_type === 'diagnostics_ordered' ||
    event.event_type === 'lab_pending'
  );

  if (loading) {
    return (
      <div className="bg-black/50 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
        <div className="text-white text-center">Loading physician dashboard...</div>
      </div>
    );
  }

  return (
    <div className="bg-black/50 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
      <h2 className="text-3xl font-light text-white tracking-wide mb-8 bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
        Emergency Department Physician Dashboard
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-red-500/10 via-pink-500/5 to-red-600/10 backdrop-blur-sm border border-white/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-light text-white/90">Critical Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extralight text-white">
              {criticalPatients.length}
            </div>
            <div className="text-sm text-red-300 mt-1">Immediate attention required</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/10 via-orange-500/5 to-yellow-600/10 backdrop-blur-sm border border-white/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-light text-white/90">Pending Consultations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extralight text-white">
              {pendingConsultations.length}
            </div>
            <div className="text-sm text-orange-300 mt-1">Awaiting physician review</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-blue-600/10 backdrop-blur-sm border border-white/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-light text-white/90">Diagnostics Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extralight text-white">
              {diagnosticsPending.length}
            </div>
            <div className="text-sm text-blue-300 mt-1">Lab/imaging results expected</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-cyan-500/10 backdrop-blur-sm border border-white/20">
          <CardHeader>
            <CardTitle className="text-xl font-light text-white">Patient Queue (Priority Order)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {[...criticalPatients, ...pendingConsultations].slice(0, 10).map((event) => (
                <div key={event.id} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <div className="flex-1">
                    <div className="text-white font-medium text-sm">
                      {event.patients?.first_name} {event.patients?.last_name}
                    </div>
                    <div className="text-white/60 text-xs">
                      {event.event_type} • {event.department}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      className={
                        event.event_data?.acuity === 'critical' 
                          ? 'bg-red-500/20 text-red-300' 
                          : 'bg-yellow-500/20 text-yellow-300'
                      }
                    >
                      {event.event_data?.acuity || 'standard'}
                    </Badge>
                    <span className="text-white/60 text-xs">
                      {new Date(event.event_timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-pink-500/10 backdrop-blur-sm border border-white/20">
          <CardHeader>
            <CardTitle className="text-xl font-light text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {events.slice(0, 8).map((event) => (
                <div key={event.id} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <div>
                    <div className="text-white font-medium text-sm">
                      {event.patients?.first_name} {event.patients?.last_name}
                    </div>
                    <div className="text-white/60 text-xs">
                      {event.event_type}
                    </div>
                  </div>
                  <div className="text-white/60 text-xs">
                    {new Date(event.event_timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
