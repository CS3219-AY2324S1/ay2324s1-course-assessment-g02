import { Auth } from '@supabase/auth-ui-react';
import Loading from '../Loading';

interface AuthProviderProps {
  children: (user) => JSX.Element;
}

const AuthProvider = (props: AuthProviderProps): JSX.Element => {
  const { user } = Auth.useUser();

  if (!user) return <Loading />;

  return props.children(user);
};

export default AuthProvider;
