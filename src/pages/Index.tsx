
import React from 'react';
import { HeroGeometric } from '../components/ui/shape-landing-hero';
import { StatsOverview } from '../components/StatsOverview';
import { DepartmentStatus } from '../components/DepartmentStatus';
import { QuickActions } from '../components/QuickActions';
import { TopNavigation } from '../components/TopNavigation';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { Footer } from '../components/Footer';
import { SimpleLandingPage } from '../components/SimpleLandingPage';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show simple landing page for unauthenticated users
  if (!user) {
    return <SimpleLandingPage />;
  }

  // Show dashboard for authenticated users
  return (
    <div className="min-h-screen relative font-sans">
      <AnimatedBackground />
      <TopNavigation />
      
      <HeroGeometric 
        badge="Hospital Analytics"
        title1="Patient Flow"
        title2="Monitoring System"
      />
      
      <div className="relative z-10 -mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 font-light">
            <StatsOverview />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DepartmentStatus />
              <QuickActions />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
