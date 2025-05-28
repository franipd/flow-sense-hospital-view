
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const TopNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Patients', path: '/patients' },
    { label: 'Departments', path: '/departments' },
    { label: 'Analytics', path: '/analytics' },
    { label: 'Resources', path: '/resources' },
  ];

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-xl font-bold text-white">
            FlowSense<span className="text-blue-400">*</span>
          </h2>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`text-sm font-medium transition-colors hover:text-white ${
                location.pathname === item.path
                  ? 'text-white'
                  : 'text-white/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            Emergency
          </Button>
          <Button
            size="sm"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            Log in
          </Button>
        </div>
      </div>
    </nav>
  );
};
