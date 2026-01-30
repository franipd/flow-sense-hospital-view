import React from 'react';
import { TopNavigation } from '@/components/TopNavigation';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { Footer } from '@/components/Footer';
import { LyzrAIChat } from '@/components/knowledge-graph/LyzrAIChat';
const AIChat = () => {
  return <div className="min-h-screen bg-black relative">
      <AnimatedBackground />
      <TopNavigation />
      
      <div className="relative z-10 pt-20 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-light text-white mb-4 tracking-wide">AI Assistant</h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              AI-powered healthcare assistant to help you analyze patient data, 
              department metrics, and operational insights in real-time.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="h-[600px]">
              <LyzrAIChat />
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <h3 className="text-white font-semibold mb-2">Patient Analysis</h3>
              <p className="text-white/70 text-sm">
                Get insights on patient flow, triage priorities, and care recommendations.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <h3 className="text-white font-semibold mb-2">Resource Optimization</h3>
              <p className="text-white/70 text-sm">
                Analyze bed availability, staff allocation, and equipment utilization.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <h3 className="text-white font-semibold mb-2">Predictive Insights</h3>
              <p className="text-white/70 text-sm">
                Forecast trends and receive proactive recommendations for better outcomes.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>;
};
export default AIChat;