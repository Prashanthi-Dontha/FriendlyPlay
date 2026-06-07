import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Gamepad2, Mail, User, AlertCircle } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, isAuthenticated, error, clearError, isLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Clear errors on mount / edit
  useEffect(() => {
    clearError();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(username, email);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 overflow-hidden">
      {/* Dynamic colorful blobs in the background */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-purple-500/10 blur-[120px] pointer-events-none"></div>

      <div className="relative w-full max-w-md animate-scale-in">
        {/* Brand Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 shadow-xl shadow-indigo-600/30 mb-3 hover:scale-110 transition-transform duration-200">
            <Gamepad2 className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            FriendlyPlay
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            A production boilerplate for multiplayer lobby games
          </p>
        </div>

        <Card isGlass={true} className="border-slate-900/50 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-100">Welcome Back</CardTitle>
            <CardDescription className="text-slate-400">
              Sign in with your details to access the game rooms
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {/* Error Callout */}
              {error && (
                <div className="flex items-center gap-2 rounded-lg bg-rose-500/10 border border-rose-500/20 p-3 text-xs text-rose-400 animate-fade-in">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Username Input */}
              <div className="space-y-1.5">
                <label htmlFor="username" className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="e.g. gameMaster99"
                    className="pl-10 bg-slate-950/50 border-slate-900 text-slate-200"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      if (error) clearError();
                    }}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10 bg-slate-950/50 border-slate-900 text-slate-200"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) clearError();
                    }}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex-col gap-3">
              <Button
                type="submit"
                variant="premium"
                className="w-full py-5 rounded-lg text-sm uppercase tracking-wider font-semibold"
                isLoading={isLoading}
              >
                Enter Playground
              </Button>
              <div className="text-center">
                <span className="text-xs text-slate-500">
                  Secure demo session. No password required.
                </span>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};
export default LoginPage;
