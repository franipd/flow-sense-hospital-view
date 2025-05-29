import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface AnalyticsChartsProps {
  timeRange: string;
}

export const AnalyticsCharts = ({ timeRange }: AnalyticsChartsProps) => {
  const patientFlowData = [
    { time: '00:00', admissions: 12, discharges: 8, occupancy: 85 },
    { time: '04:00', admissions: 8, discharges: 5, occupancy: 87 },
    { time: '08:00', admissions: 25, discharges: 12, occupancy: 92 },
    { time: '12:00', admissions: 32, discharges: 18, occupancy: 95 },
    { time: '16:00', admissions: 28, discharges: 22, occupancy: 89 },
    { time: '20:00', admissions: 18, discharges: 15, occupancy: 86 },
  ];

  const departmentData = [
    { department: 'Emergency', utilization: 92, capacity: 15, current: 14 },
    { department: 'ICU', utilization: 88, capacity: 20, current: 18 },
    { department: 'General', utilization: 75, capacity: 60, current: 45 },
    { department: 'Surgery', utilization: 67, capacity: 12, current: 8 },
    { department: 'Imaging', utilization: 75, capacity: 8, current: 6 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-slate-900/40 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-cyan-400/20">
        <h3 className="text-2xl font-light text-white mb-4 tracking-wide">Patient Flow Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={patientFlowData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="time" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0f172a', 
                border: '1px solid #22d3ee',
                borderRadius: '8px',
                color: '#ffffff'
              }} 
            />
            <Line type="monotone" dataKey="occupancy" stroke="#22d3ee" strokeWidth={3} />
            <Line type="monotone" dataKey="admissions" stroke="#06b6d4" strokeWidth={2} />
            <Line type="monotone" dataKey="discharges" stroke="#f472b6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-slate-900/40 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-pink-400/20">
        <h3 className="text-2xl font-light text-white mb-4 tracking-wide">Department Utilization</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={departmentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="department" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0f172a', 
                border: '1px solid #f472b6',
                borderRadius: '8px',
                color: '#ffffff'
              }} 
            />
            <Bar dataKey="utilization" fill="#22d3ee" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
