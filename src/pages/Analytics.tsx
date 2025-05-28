
import React, { useState } from 'react';
import { HeroGeometric } from '../components/ui/shape-landing-hero';
import { AnalyticsCharts } from '../components/AnalyticsCharts';
import { PerformanceMetrics } from '../components/PerformanceMetrics';
import { PredictiveInsights } from '../components/PredictiveInsights';
import { TopNavigation } from '../components/TopNavigation';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { Footer } from '../components/Footer';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="min-h-screen relative font-sans">
      <AnimatedBackground />
      <TopNavigation />
      
      <HeroGeometric 
        badge="Healthcare Analytics"
        title1="Data-Driven"
        title2="Insights & Predictions"
      />
      
      <div className="relative z-10 -mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 font-light">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
              <select 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white font-light"
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
      
      <Footer />
    </div>
  );
};

export default Analytics;
