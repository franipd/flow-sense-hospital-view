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
  }];
  const handleTabClick = (path: string) => {
    navigate(path);
  };
  return;
};