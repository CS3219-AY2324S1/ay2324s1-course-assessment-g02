import { Auth } from '@supabase/auth-ui-react';
import { useState, useEffect } from 'react';
import Loading from '../Loading';

interface AuthProviderProps {
  children: (user) => JSX.Element;
  auth: boolean; // To decide if we are trying to get an authenticated user or not
}

const AuthProvider = (props: AuthProviderProps): JSX.Element => {
  const { user } = Auth.useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user || !props.auth) {
      setLoading(false);
    }
  }, [user, props.auth]);

  if (loading) {
    return <Loading />;
  }
  return props.children(user);
};

export default AuthProvider;
