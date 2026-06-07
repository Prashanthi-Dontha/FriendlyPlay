export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, email: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}
