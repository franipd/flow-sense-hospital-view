
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useId, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export const SignInModal = () => {
  const id = useId();
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.name,
            }
          }
        });

        if (error) throw error;

        if (data.user) {
          toast({
            title: "Account created successfully!",
            description: "You can now sign in with your credentials.",
          });
          setIsSignUp(false);
          setFormData({ name: '', email: '', password: '' });
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        if (data.user) {
          toast({
            title: "Signed in successfully!",
            description: `Welcome back, ${data.user.email}`,
          });
          // The dialog will close automatically when auth state changes
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast({
        title: "Authentication failed",
        description: error.message || "An error occurred during authentication.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogContent>
      <div className="flex flex-col items-center gap-2">
        <div
          className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
          aria-hidden="true"
        >
          <svg
            className="stroke-zinc-800 dark:stroke-zinc-100"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <circle cx="16" cy="16" r="12" fill="none" strokeWidth="8" />
          </svg>
        </div>
        <DialogHeader>
          <DialogTitle className="sm:text-center">
            {isSignUp ? 'Create Account' : 'Sign in to FlowSense'}
          </DialogTitle>
          <DialogDescription className="sm:text-center">
            {isSignUp 
              ? 'Create your account to get started.' 
              : 'Enter your credentials to access your dashboard.'
            }
          </DialogDescription>
        </DialogHeader>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-4">
          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor={`${id}-name`}>Full name</Label>
              <Input 
                id={`${id}-name`} 
                placeholder="Enter your full name" 
                type="text" 
                required 
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor={`${id}-email`}>Email</Label>
            <Input 
              id={`${id}-email`} 
              placeholder="Enter your email" 
              type="email" 
              required 
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${id}-password`}>Password</Label>
            <Input
              id={`${id}-password`}
              placeholder="Enter your password"
              type="password"
              required
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
            />
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Loading...' : (isSignUp ? 'Create Account' : 'Sign in')}
        </Button>
      </form>

      <div className="text-center">
        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-sm text-muted-foreground hover:text-foreground underline"
        >
          {isSignUp 
            ? 'Already have an account? Sign in' 
            : "Don't have an account? Sign up"
          }
        </button>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        By {isSignUp ? 'creating an account' : 'signing in'} you agree to our{" "}
        <a className="underline hover:no-underline" href="#">
          Terms of Service
        </a>
        .
      </p>
    </DialogContent>
  );
};
