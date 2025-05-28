
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const NavigationTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: '/', label: 'Overview', icon: '📊', path: '/' },
    { id: '/patients', label: 'Patients', icon: '👥', path: '/patients' },
    { id: '/departments', label: 'Departments', icon: '🏥', path: '/departments' },
    { id: '/analytics', label: 'Analytics', icon: '📈', path: '/analytics' },
    { id: '/resources', label: 'Resources', icon: '🛏️', path: '/resources' },
  ];

  const handleTabClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2 shadow-lg border border-white/20">
      <div className="flex space-x-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.path)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              location.pathname === tab.path
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
