
import React from 'react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { GradientButton } from '@/components/ui/gradient-button';
import { SignInModal } from '@/components/SignInModal';
import { SparklesCore } from '@/components/ui/sparkles';
import { Footer } from '@/components/Footer';

export const SimpleLandingPage = () => {
  return (
    <div className="min-h-screen relative font-sans bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Sparkles Background */}
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="tsparticleslandingpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={80}
          className="w-full h-full"
          particleColor="#60A5FA"
          speed={0.8}
        />
      </div>
      
      {/* Header with Login */}
      <nav className="relative z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <h2 className="text-xl font-bold text-white">
              FlowSense<span className="text-blue-400">*</span>
            </h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <Dialog>
              <DialogTrigger asChild>
                <GradientButton className="px-6 py-2 min-w-[100px]">
                  Log in
                </GradientButton>
              </DialogTrigger>
              <SignInModal />
            </Dialog>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[80vh]">
        <div className="text-center space-y-8 px-4">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white">
              FlowSense
            </h1>
            <div className="w-full max-w-2xl mx-auto">
              {/* Gradient lines effect */}
              <div className="relative">
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent h-[2px] w-3/4 blur-sm mx-auto" />
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px w-3/4 mx-auto" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-[5px] w-1/4 blur-sm mx-auto" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-px w-1/4 mx-auto" />
              </div>
            </div>
          </div>
          
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Crafting exceptional digital experience at your fingertips for the healthcare sector
          </p>
          
          <div className="pt-8">
            <Dialog>
              <DialogTrigger asChild>
                <GradientButton className="px-12 py-4 text-lg">
                  Get Started
                </GradientButton>
              </DialogTrigger>
              <SignInModal />
            </Dialog>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-20">
        <Footer />
      </div>
    </div>
  );
};
