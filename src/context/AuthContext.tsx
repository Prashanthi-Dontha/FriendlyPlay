import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types/auth';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'friendlyplay_user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize and check local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
      // remove this else condition while login authentication cames into picture
      else {

        // Set default guest session to bypass login authentication functionality
        const defaultGuest: User = {
          id: "guest-player",
          username: "GuestGamer",
          email: "guest@friendlyplay.com",
          avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=GuestGamer",
          createdAt: new Date().toISOString(),
        };
        setUser(defaultGuest);
      }
    } catch (e) {
      console.error("Failed to parse user session", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (username: string, email: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Basic Validation
    if (!username.trim() || !email.trim()) {
      setError('Username and email are required.');
      setIsLoading(false);
      return false;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      setIsLoading(false);
      return false;
    }

    const mockUser: User = {
      id: Math.random().toString(36).substring(2, 11),
      username: username.trim(),
      email: email.trim().toLowerCase(),
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(username.trim())}`,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mockUser));
    setUser(mockUser);
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    // Reset to guest instead of null to maintain bypass state
    const defaultGuest: User = {
      id: "guest-player",
      username: "GuestGamer",
      email: "guest@friendlyplay.com",
      avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=GuestGamer",
      createdAt: new Date().toISOString(),
    };
    // set user to null when doing authentication
    setUser(defaultGuest);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
