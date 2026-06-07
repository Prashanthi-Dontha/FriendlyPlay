import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  Gamepad2,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  User as UserIcon,
  Shield,
} from 'lucide-react';
import { Button } from '../ui/button';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      label: 'Games Lobby',
      path: '/dashboard', // Can route to specific grid section
      icon: <Gamepad2 className="h-5 w-5" />,
    },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950">
      {/* 1. Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col glass border-r border-slate-900/50">
        {/* Brand Logo */}
        <div className="flex h-16 items-center gap-2 px-6 border-b border-slate-900/50">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 shadow-lg shadow-indigo-600/30">
            <Gamepad2 className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            FriendlyPlay
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1.5 px-4 py-6">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-600/10 text-indigo-400 border-l-2 border-indigo-500 pl-3'
                    : 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-200'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-slate-900/50">
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-slate-900/30 border border-slate-900/50 mb-3">
            <img
              src={user?.avatarUrl}
              alt={user?.username}
              className="h-9 w-9 rounded-full bg-slate-800 ring-1 ring-indigo-500/20"
            />
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate text-slate-200">{user?.username}</p>
              <p className="text-xs truncate text-slate-500">{user?.email}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-slate-400 hover:text-rose-400 hover:bg-rose-500/5"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* 2. Main Content Wrapper */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="flex h-16 items-center justify-between px-6 border-b border-slate-900/50 md:hidden glass">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 shadow-md">
              <Gamepad2 className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              FriendlyPlay
            </span>
          </div>

          <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Toggle Menu">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </header>

        {/* 3. Sliding Mobile Sidebar Drawer (Sheet) */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden animate-fade-in">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
              onClick={toggleMobileMenu}
            />
            {/* Slideout Content */}
            <div className="absolute right-0 top-0 bottom-0 w-64 bg-slate-900 border-l border-slate-800 p-6 flex flex-col z-10 animate-slide-in-right">
              <div className="flex items-center justify-between mb-8">
                <span className="font-bold text-slate-200">Menu</span>
                <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Close Menu">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Navigation Items */}
              <nav className="flex-1 space-y-1.5">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.label}
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                        isActive
                          ? 'bg-indigo-600/10 text-indigo-400 border-l-2 border-indigo-500 pl-3'
                          : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              {/* User Avatar & Logout */}
              <div className="mt-auto border-t border-slate-800 pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={user?.avatarUrl}
                    alt={user?.username}
                    className="h-9 w-9 rounded-full bg-slate-800"
                  />
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-semibold truncate text-slate-300">{user?.username}</p>
                    <p className="text-xs truncate text-slate-500">{user?.email}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-slate-400 hover:text-rose-400 hover:bg-rose-500/5"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* 4. Page Content */}
        <main className="flex-1 overflow-y-auto px-6 py-8 md:px-8 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
          <div className="mx-auto max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
export default DashboardLayout;
