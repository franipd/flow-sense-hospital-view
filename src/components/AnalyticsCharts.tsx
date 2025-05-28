
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
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Flow Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={patientFlowData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="occupancy" stroke="#8884d8" strokeWidth={2} />
            <Line type="monotone" dataKey="admissions" stroke="#82ca9d" strokeWidth={2} />
            <Line type="monotone" dataKey="discharges" stroke="#ffc658" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Utilization</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={departmentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="utilization" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
