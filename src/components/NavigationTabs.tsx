
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const NavigationTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const tabs = [{
    id: '/',
    label: 'Overview',
    icon: '📊',
    path: '/'
  }, {
    id: '/patients',
    label: 'Patients',
    icon: '👥',
    path: '/patients'
  }, {
    id: '/departments',
    label: 'Departments',
    icon: '🏥',
    path: '/departments'
  }, {
    id: '/analytics',
    label: 'Analytics',
    icon: '📈',
    path: '/analytics'
  }, {
    id: '/resources',
    label: 'Resources',
    icon: '🛏️',
    path: '/resources'
  }, {
    id: '/process-mining',
    label: 'Process Mining',
    icon: '⚡',
    path: '/process-mining'
  }, {
    id: '/ai-chat',
    label: 'AI Assistant',
    icon: '🤖',
    path: '/ai-chat'
  }, {
    id: '/reports',
    label: 'Reports',
    icon: '📋',
    path: '/reports'
  }];
  
  const handleTabClick = (path: string) => {
    navigate(path);
  };
  
  return (
    <div className="flex space-x-1 bg-slate-900/40 backdrop-blur-sm rounded-xl p-1 border border-cyan-400/20">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.path)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            location.pathname === tab.path
              ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-400/30'
              : 'text-white/70 hover:text-white hover:bg-white/5'
          }`}
        >
          <span>{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};
