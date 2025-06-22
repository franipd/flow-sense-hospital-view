
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { TrendingUp, Users, MapPin, AlertTriangle } from 'lucide-react';
import { ReportStats } from './utils/reportParser';

interface ReportChartsProps {
  stats: ReportStats;
}

export const ReportCharts = ({ stats }: ReportChartsProps) => {
  const statusData = Object.entries(stats.byStatus).map(([status, count]) => ({
    name: status,
    value: count,
    percentage: Math.round((count / stats.totalPatients) * 100)
  }));

  const departmentData = Object.entries(stats.byDepartment).map(([dept, count]) => ({
    name: dept.length > 15 ? dept.substring(0, 15) + '...' : dept,
    count,
    percentage: Math.round((count / stats.totalPatients) * 100)
  }));

  const priorityData = Object.entries(stats.byPriority).map(([priority, count]) => ({
    name: priority,
    value: count,
    percentage: Math.round((count / stats.totalPatients) * 100)
  }));

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  const StatCard = ({ icon: Icon, title, value, subtitle, color }: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    value: string | number;
    subtitle?: string;
    color: string;
  }) => (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="text-white/60 text-sm font-medium">{title}</h4>
          <div className="text-2xl font-bold text-white">{value}</div>
          {subtitle && <p className="text-white/40 text-xs mt-1">{subtitle}</p>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          title="Total Patients"
          value={stats.totalPatients}
          color="bg-blue-500/20"
        />
        <StatCard
          icon={MapPin}
          title="Departments"
          value={Object.keys(stats.byDepartment).length}
          subtitle="Active locations"
          color="bg-green-500/20"
        />
        <StatCard
          icon={AlertTriangle}
          title="High Priority"
          value={stats.byPriority['High'] || stats.byPriority['Urgent'] || 0}
          subtitle="Requires attention"
          color="bg-red-500/20"
        />
        <StatCard
          icon={TrendingUp}
          title="Average Age"
          value={stats.avgAge ? `${stats.avgAge} yrs` : 'N/A'}
          color="bg-purple-500/20"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        {statusData.length > 0 && (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              Patient Status Distribution
            </h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Department Distribution */}
        {departmentData.length > 0 && (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              Department Distribution
            </h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 12 }}
                    axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                  />
                  <YAxis 
                    tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 12 }}
                    axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                  />
                  <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
