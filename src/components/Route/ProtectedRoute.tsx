import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950">
        <div className="relative flex items-center justify-center">
          {/* Pulsing glow behind */}
          <div className="absolute h-16 w-16 animate-ping rounded-full bg-indigo-500/20 duration-1000"></div>
          {/* Main animated spinner */}
          <div className="h-12 w-12 rounded-full border-4 border-slate-800 border-t-indigo-500 animate-spin"></div>
        </div>
        <p className="mt-4 text-sm font-medium text-slate-400 animate-pulse tracking-wide uppercase">
          Verifying Session...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
export default ProtectedRoute;
