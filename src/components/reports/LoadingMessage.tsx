
import React from 'react';

export const LoadingMessage = () => {
  return (
    <div className="flex justify-start">
      <div className="max-w-[90%] bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-2xl rounded-bl-lg p-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
          <div>
            <span className="text-sm text-white/80 font-medium">Generating comprehensive healthcare report...</span>
            <div className="mt-1 text-xs text-white/60">
              Analyzing data • Processing insights • Preparing recommendations
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
