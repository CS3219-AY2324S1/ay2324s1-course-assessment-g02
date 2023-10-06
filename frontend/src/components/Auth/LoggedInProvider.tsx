import { Auth } from '@supabase/auth-ui-react';

interface AuthProviderProps {
  children: (user) => JSX.Element;
}

const LoggedInProvider = (props: AuthProviderProps): JSX.Element => {
  const { user } = Auth.useUser();

  return props.children(user);
};

export default LoggedInProvider;
