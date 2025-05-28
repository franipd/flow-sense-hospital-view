
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GradientButton } from '@/components/ui/gradient-button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { SignInModal } from '@/components/SignInModal';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export const TopNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Patients', path: '/patients' },
    { label: 'Departments', path: '/departments' },
    { label: 'Analytics', path: '/analytics' },
    { label: 'Resources', path: '/resources' },
  ];

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      });
      
      navigate('/');
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast({
        title: "Error signing out",
        description: error.message || "An error occurred while signing out.",
        variant: "destructive",
      });
    }
  };

  const getUserInitials = (name: string) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  const getUserFullName = () => {
    return user?.user_metadata?.full_name || user?.email || 'User';
  };

  if (loading) {
    return (
      <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <h2 className="text-xl font-bold text-white">
              FlowSense<span className="text-blue-400">*</span>
            </h2>
          </div>
          <div className="w-20 h-8 bg-white/10 rounded animate-pulse"></div>
        </div>
      </nav>
    );
  }

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
          {user ? (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarFallback className="bg-white/20 text-white text-sm font-medium">
                      {getUserInitials(getUserFullName())}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{getUserFullName()}</p>
                </TooltipContent>
              </Tooltip>
              <GradientButton
                onClick={handleSignOut}
                variant="variant"
                className="px-6 py-2 min-w-[100px]"
              >
                Sign out
              </GradientButton>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                Contact
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <GradientButton className="px-6 py-2 min-w-[100px]">
                    Log in
                  </GradientButton>
                </DialogTrigger>
                <SignInModal />
              </Dialog>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
