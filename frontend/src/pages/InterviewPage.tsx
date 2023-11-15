import { useAuth } from '../components/Auth/AuthProvider';
import Loading from '../components/Loading';


const InterviewPage = () => {
  const { isLoading } = useAuth();
  return isLoading ? (
    <Loading />
  ) : (
    // <SessionProvider user={user}>
    <h1>A valid match has been found!</h1>
    // </SessionProvider>
  );
};

export default InterviewPage;
