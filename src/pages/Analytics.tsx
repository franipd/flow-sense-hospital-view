
import React, { useState } from 'react';
import { HeroGeometric } from '../components/ui/shape-landing-hero';
import { AnalyticsCharts } from '../components/AnalyticsCharts';
import { PerformanceMetrics } from '../components/PerformanceMetrics';
import { PredictiveInsights } from '../components/PredictiveInsights';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="min-h-screen bg-[#030303]">
      <HeroGeometric 
        badge="Healthcare Analytics"
        title1="Data-Driven"
        title2="Insights & Predictions"
      />
      
      <div className="relative z-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
              <select 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 bg-white"
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
              </select>
            </div>
            <PerformanceMetrics timeRange={timeRange} />
            <AnalyticsCharts timeRange={timeRange} />
            <PredictiveInsights />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
