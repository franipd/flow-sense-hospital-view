
import React from 'react';
import { TopNavigation } from '@/components/TopNavigation';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { Footer } from '@/components/Footer';
import { LyzrReportsChat } from '@/components/reports/LyzrReportsChat';

const Reports = () => {
  return (
    <div className="min-h-screen bg-black relative flex flex-col">
      <AnimatedBackground />
      <TopNavigation />
      
      <div className="relative z-10 flex-1 flex flex-col pt-20 pb-8 px-6">
        <div className="max-w-7xl mx-auto flex-1 flex flex-col">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Healthcare Reports & Intelligence
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Generate comprehensive healthcare reports and analytics with automatic email delivery 
              for critical insights and urgent care recommendations.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto flex-1 flex flex-col mb-12">
            <div className="flex-1 min-h-[600px]">
              <LyzrReportsChat />
            </div>
          </div>
          
          {/* Key Features - Single location */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            
            
            
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Reports;
