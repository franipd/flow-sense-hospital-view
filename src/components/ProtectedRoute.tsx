
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { SignInModal } from '@/components/SignInModal';
import { Button } from '@/components/ui/button';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const ProtectedRoute = ({ children, fallback }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
          <div className="text-center space-y-6 p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <h2 className="text-2xl font-bold text-white">Authentication Required</h2>
            <p className="text-white/80">Please sign in to access this page.</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  Sign In
                </Button>
              </DialogTrigger>
              <SignInModal />
            </Dialog>
          </div>
        </div>
      )
    );
  }

  return <>{children}</>;
};
