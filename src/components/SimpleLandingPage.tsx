import React from 'react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { GradientButton } from '@/components/ui/gradient-button';
import { SignInModal } from '@/components/SignInModal';
import { SparklesCore } from '@/components/ui/sparkles';
import { Footer } from '@/components/Footer';
export const SimpleLandingPage = () => {
  return <div className="min-h-screen relative font-sans bg-black">
      {/* Header with Login */}
      <nav className="relative z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            
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
        <div className="text-center px-4">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-center text-white relative z-20 font-mono tracking-tight">
            FlowSense
          </h1>
          
          <div className="w-[40rem] h-40 relative mx-auto">
            {/* Gradients */}
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

            {/* Core component */}
            <SparklesCore background="transparent" minSize={0.4} maxSize={1} particleDensity={1200} className="w-full h-full" particleColor="#FFFFFF" />

            {/* Radial Gradient to prevent sharp edges */}
            <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
          </div>
          
          
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-20">
        <Footer />
      </div>
    </div>;
};