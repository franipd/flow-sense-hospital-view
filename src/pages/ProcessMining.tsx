
import React, { useState } from 'react';
import { HeroGeometric } from '../components/ui/shape-landing-hero';
import { AdminDashboard } from '../components/dashboards/AdminDashboard';
import { NurseDashboard } from '../components/dashboards/NurseDashboard';
import { PhysicianDashboard } from '../components/dashboards/PhysicianDashboard';
import { CSVImporter } from '../components/CSVImporter';
import { TopNavigation } from '../components/TopNavigation';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { Footer } from '../components/Footer';
import { GradientButton } from '../components/ui/gradient-button';

const ProcessMining = () => {
  const [activePersona, setActivePersona] = useState('admin');
  const [showImporter, setShowImporter] = useState(false);

  const personaOptions = [
    { id: 'admin', label: 'Administrator', icon: '👑' },
    { id: 'nurse', label: 'Charge Nurse', icon: '👩‍⚕️' },
    { id: 'physician', label: 'Physician', icon: '👨‍⚕️' },
    { id: 'analyst', label: 'Analyst', icon: '📊' },
    { id: 'coordinator', label: 'Coordinator', icon: '🏥' },
  ];

  const renderDashboard = () => {
    switch (activePersona) {
      case 'admin':
        return <AdminDashboard />;
      case 'nurse':
        return <NurseDashboard />;
      case 'physician':
        return <PhysicianDashboard />;
      case 'analyst':
        return <div className="bg-black/50 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20 text-white text-center">Analyst Dashboard - Coming Soon</div>;
      case 'coordinator':
        return <div className="bg-black/50 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20 text-white text-center">Coordinator Dashboard - Coming Soon</div>;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen relative font-sans">
      <AnimatedBackground />
      <TopNavigation />
      
      <HeroGeometric 
        badge="Process Mining"
        title1="Healthcare"
        title2="Process Analytics"
      />
      
      <div className="relative z-10 -mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 font-light">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/10">
              <div className="flex flex-wrap gap-2 mb-4">
                {personaOptions.map((option) => (
                  <GradientButton
                    key={option.id}
                    onClick={() => setActivePersona(option.id)}
                    variant={activePersona === option.id ? "default" : "variant"}
                    className={`flex items-center gap-2 px-4 py-2 text-sm transition-all duration-200 ${
                      activePersona === option.id ? '' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <span>{option.icon}</span>
                    <span className="font-light">{option.label}</span>
                  </GradientButton>
                ))}
                <GradientButton
                  onClick={() => setShowImporter(!showImporter)}
                  variant="variant"
                  className="flex items-center gap-2 px-4 py-2 text-sm opacity-70 hover:opacity-100"
                >
                  <span>📁</span>
                  <span className="font-light">Import Data</span>
                </GradientButton>
              </div>
            </div>

            {showImporter && (
              <div className="mb-6">
                <CSVImporter />
              </div>
            )}

            {renderDashboard()}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProcessMining;
