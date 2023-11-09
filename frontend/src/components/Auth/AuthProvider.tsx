import React, { createContext, useContext, ReactNode } from 'react';
import { Auth } from '@supabase/auth-ui-react';

interface AuthContextType {
  user;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within a AuthProvider');
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { user } = Auth.useUser();

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
