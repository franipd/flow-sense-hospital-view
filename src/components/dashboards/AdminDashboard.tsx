
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRealtimePatientEvents, useRealtimeResources } from '@/hooks/useRealtimeData';

export const AdminDashboard = () => {
  const { events, loading: eventsLoading } = useRealtimePatientEvents();
  const { resources, loading: resourcesLoading } = useRealtimeResources();

  const totalCapacity = resources.reduce((sum, r) => sum + (r.capacity || 0), 0);
  const currentUtilization = resources.reduce((sum, r) => sum + (r.current_utilization || 0), 0);
  const utilizationRate = totalCapacity > 0 ? (currentUtilization / totalCapacity) * 100 : 0;

  const recentEvents = events.slice(0, 10);
  const departmentCounts = events.reduce((acc, event) => {
    acc[event.department] = (acc[event.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (eventsLoading || resourcesLoading) {
    return (
      <div className="bg-black/50 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
        <div className="text-white text-center">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="bg-black/50 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
      <h2 className="text-3xl font-light text-white tracking-wide mb-8 bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
        Hospital Administrator Dashboard
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-cyan-500/10 backdrop-blur-sm border border-white/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-light text-white/90">Overall Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extralight text-white mb-2">
              {Math.round(utilizationRate)}%
            </div>
            <div className="text-sm text-white/60">
              {currentUtilization} / {totalCapacity} capacity
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-pink-500/10 backdrop-blur-sm border border-white/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-light text-white/90">Active Events Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extralight text-white mb-2">
              {events.length}
            </div>
            <div className="text-sm text-white/60">Patient interactions</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-cyan-500/10 backdrop-blur-sm border border-white/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-light text-white/90">Department Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(departmentCounts).slice(0, 3).map(([dept, count]) => (
                <div key={dept} className="flex justify-between items-center">
                  <span className="text-white/80 text-sm">{dept}</span>
                  <Badge variant="secondary" className="bg-white/10 text-white/80">
                    {count}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-cyan-500/10 backdrop-blur-sm border border-white/20">
          <CardHeader>
            <CardTitle className="text-xl font-light text-white">Recent Patient Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {recentEvents.map((event) => (
                <div key={event.id} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <div>
                    <div className="text-white font-medium text-sm">
                      {event.patients?.first_name} {event.patients?.last_name}
                    </div>
                    <div className="text-white/60 text-xs">
                      {event.event_type} • {event.department}
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

        <Card className="bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-pink-500/10 backdrop-blur-sm border border-white/20">
          <CardHeader>
            <CardTitle className="text-xl font-light text-white">Resource Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {resources.slice(0, 8).map((resource) => (
                <div key={resource.id} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <div>
                    <div className="text-white font-medium text-sm">{resource.resource_name}</div>
                    <div className="text-white/60 text-xs">{resource.department}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={resource.status === 'available' ? 'default' : 'secondary'}
                      className={
                        resource.status === 'available' 
                          ? 'bg-green-500/20 text-green-300' 
                          : 'bg-orange-500/20 text-orange-300'
                      }
                    >
                      {resource.status}
                    </Badge>
                    <span className="text-white/60 text-xs">
                      {resource.current_utilization}/{resource.capacity}
                    </span>
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
