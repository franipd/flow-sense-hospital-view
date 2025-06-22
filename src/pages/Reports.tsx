
import React from 'react';
import { TopNavigation } from '@/components/TopNavigation';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { Footer } from '@/components/Footer';
import { LyzrReportsChat } from '@/components/reports/LyzrReportsChat';

const Reports = () => {
  return (
    <div className="min-h-screen bg-black relative">
      <AnimatedBackground />
      <TopNavigation />
      
      <div className="relative z-10 pt-20 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Healthcare Reports & Intelligence
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Generate comprehensive healthcare reports and analytics with automatic email delivery 
              for critical insights and urgent care recommendations.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="h-[600px]">
              <LyzrReportsChat />
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <h3 className="text-white font-semibold mb-2">Automated Reporting</h3>
              <p className="text-white/70 text-sm">
                Critical insights and urgent recommendations are automatically emailed to franipd2025@gmail.com.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <h3 className="text-white font-semibold mb-2">Department Analytics</h3>
              <p className="text-white/70 text-sm">
                Generate detailed reports on department performance, patient flow, and resource utilization.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <h3 className="text-white font-semibold mb-2">Real-time Intelligence</h3>
              <p className="text-white/70 text-sm">
                Access up-to-date healthcare data analysis and predictive insights for better decision making.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Reports;
