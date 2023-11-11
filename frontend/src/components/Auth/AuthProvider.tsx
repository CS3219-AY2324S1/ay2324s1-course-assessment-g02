import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect
} from 'react';
import { Auth } from '@supabase/auth-ui-react';

interface AuthContextType {
  user;
  session;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { user, session } = Auth.useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(!user);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, session, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
