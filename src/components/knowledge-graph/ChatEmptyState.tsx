import React, { useState } from 'react';
import { Bot, Shield, Database } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { CanvasRevealEffect } from '@/components/ui/canvas-effect';
export const ChatEmptyState = () => {
  const [hovered, setHovered] = useState(false);
  return <div className="text-center text-white/60 py-8 relative overflow-hidden" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <AnimatePresence>
        {hovered && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="absolute inset-0 h-full w-full">
            <CanvasRevealEffect animationSpeed={5} containerClassName="bg-transparent opacity-30" colors={[[59, 130, 246], [147, 51, 234]]} opacities={[0.1, 0.2, 0.4, 0.6, 0.8, 1.0]} dotSize={2} />
          </motion.div>}
      </AnimatePresence>

      <div className="relative z-10">
        <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
        
        <div className="mb-4">
          <h1 className="flex select-none justify-center text-center text-2xl font-extrabold leading-none tracking-tight md:text-3xl">
            <span data-content="Lyzr " className="before:animate-gradient-background-1 relative before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:w-full before:px-1 before:content-[attr(data-content)]">
              <span className="animate-gradient-foreground-1 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text px-1 text-transparent">Flowsense</span>
            </span>
            <span data-content="AI " className="before:animate-gradient-background-2 relative before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:w-full before:px-1 before:content-[attr(data-content)]">
              <span className="animate-gradient-foreground-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text px-1 text-transparent">Care</span>
            </span>
            <span data-content="Assistant" className="before:animate-gradient-background-3 relative before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:w-full before:px-1 before:content-[attr(data-content)]">
              <span className="animate-gradient-foreground-3 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text px-1 text-transparent">Intelligence</span>
            </span>
          </h1>
        </div>

        <p className="text-sm mt-2">Ask questions about your healthcare data and patient status</p>
        
        <div className="mt-4 space-y-3">
          <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <div className="flex items-center gap-2 text-blue-400 mb-2">
              <Database className="w-4 h-4" />
              <span className="text-xs font-medium">Live Healthcare Data</span>
            </div>
            <p className="text-xs text-blue-300">
              Connected to your Supabase patient database with real-time insights on triage priorities, department status, and resource allocation.
            </p>
          </div>
          
          <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="flex items-center gap-2 text-green-400 mb-2">
              <Shield className="w-4 h-4" />
              <span className="text-xs font-medium">Enhanced Reliability</span>
            </div>
            <p className="text-xs text-green-300">
              Secure server-side processing with automatic retry, fallback responses, and contextual healthcare insights.
            </p>
          </div>
        </div>
        
        <div className="mt-4 p-2 bg-white/5 rounded-lg">
          <p className="text-xs text-white/70 mb-2">Try asking:</p>
          <div className="text-xs text-white/60 space-y-1">
            <div>• "What's the current patient status?"</div>
            <div>• "Show me high-priority cases"</div>
            <div>• "Department capacity overview"</div>
            <div>• "Resource allocation recommendations"</div>
          </div>
        </div>
      </div>
    </div>;
};