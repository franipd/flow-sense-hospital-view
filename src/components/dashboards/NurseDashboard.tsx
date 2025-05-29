
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRealtimePatientEvents } from '@/hooks/useRealtimeData';

export const NurseDashboard = () => {
  const { events, loading } = useRealtimePatientEvents();

  const activePatients = events.filter(event => 
    event.event_type !== 'discharge'
  ).reduce((acc, event) => {
    if (event.patient_id) {
      acc[event.patient_id] = event;
    }
    return acc;
  }, {} as Record<string, any>);

  const patientsByPriority = Object.values(activePatients).reduce((acc, event) => {
    const priority = event.event_data?.priority || 'medium';
    acc[priority] = (acc[priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const recentAdmissions = events
    .filter(event => event.event_type === 'admission')
    .slice(0, 10);

  if (loading) {
    return (
      <div className="bg-black/50 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
        <div className="text-white text-center">Loading nursing dashboard...</div>
      </div>
    );
  }

  return (
    <div className="bg-black/50 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
      <h2 className="text-3xl font-light text-white tracking-wide mb-8 bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
        Charge Nurse Dashboard
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-cyan-500/10 backdrop-blur-sm border border-white/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-light text-white/90">Active Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extralight text-white">
              {Object.keys(activePatients).length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500/10 via-pink-500/5 to-red-600/10 backdrop-blur-sm border border-white/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-light text-white/90">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extralight text-white">
              {patientsByPriority.high || 0}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/10 via-orange-500/5 to-yellow-600/10 backdrop-blur-sm border border-white/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-light text-white/90">Medium Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extralight text-white">
              {patientsByPriority.medium || 0}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 via-cyan-500/5 to-green-600/10 backdrop-blur-sm border border-white/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-light text-white/90">Low Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extralight text-white">
              {patientsByPriority.low || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-cyan-500/10 backdrop-blur-sm border border-white/20">
          <CardHeader>
            <CardTitle className="text-xl font-light text-white">Recent Admissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {recentAdmissions.map((admission) => (
                <div key={admission.id} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <div>
                    <div className="text-white font-medium text-sm">
                      {admission.patients?.first_name} {admission.patients?.last_name}
                    </div>
                    <div className="text-white/60 text-xs">
                      {admission.department} • MRN: {admission.patients?.mrn}
                    </div>
                  </div>
                  <div className="text-white/60 text-xs">
                    {new Date(admission.event_timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-pink-500/10 backdrop-blur-sm border border-white/20">
          <CardHeader>
            <CardTitle className="text-xl font-light text-white">Patient Flow Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <span className="text-white/80">Awaiting Triage</span>
                <Badge className="bg-yellow-500/20 text-yellow-300">
                  {events.filter(e => e.event_type === 'waiting_triage').length}
                </Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <span className="text-white/80">In Treatment</span>
                <Badge className="bg-blue-500/20 text-blue-300">
                  {events.filter(e => e.event_type === 'treatment').length}
                </Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <span className="text-white/80">Ready for Discharge</span>
                <Badge className="bg-green-500/20 text-green-300">
                  {events.filter(e => e.event_type === 'ready_discharge').length}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
