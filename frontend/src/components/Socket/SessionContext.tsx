import { createContext, useEffect, useContext } from 'react';
import { socket } from '../../services/socket.js';
import useUserSession from '../../hooks/useUserSession';
import NotFound from '../NotFound.js';
import Loading from '../Loading.js';

interface Session {
  sessionId: string;
  userId: string;
  isConnected: boolean;
  email: string;
  questionId: number;
}

interface SessionContextProps {
  session: Session;
  setSession: React.Dispatch<React.SetStateAction<Session>>;
}

const SessionContext = createContext<SessionContextProps | undefined>(
  undefined
);

interface SessionProviderProps {
  children: React.ReactNode;
  user;
}

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
  user
}) => {
  const data = useUserSession(user.id);
  const { isError, isLoading, session, setSession } = data;

  useEffect(() => {
    // Listen for session information from the server
    socket.on('connect', () => {
      setSession((prevState) => ({
        ...prevState,
        userId: user.userId,
        isConnected: true,
        email: user.email
      }));
    });

    socket.on('session', (data) => {
      setSession((prevState) => ({
        ...prevState,
        questionId: data.questionId
      }));
    });

    // Listen for disconnection
    socket.on('disconnect', () => {
      setSession({
        sessionId: '',
        userId: '',
        isConnected: false,
        email: '',
        questionId: 0
      });
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, [user, setSession]);

  useEffect(() => {
    if (!isLoading && session.sessionId) {
      socket.auth = {
        userId: user.id,
        email: user.email,
        sessionId: session.sessionId
      };
      socket.connect();
    }

    // Disconnect the socket when the component unmounts or sessionId becomes invalid
    return () => {
      if (!session.sessionId) {
        socket.disconnect();
      }
    };
  }, [session.sessionId, isLoading, user.id, user.email]);

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {isLoading ? <Loading /> : isError ? <NotFound /> : children}
    </SessionContext.Provider>
  );
};
