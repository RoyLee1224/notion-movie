import { useAuthStore } from '../../store/authUser';
import AuthScreen from './AuthScreen';
import HomeScreen from './HomeScreen';

const HomePage = () => {
  const { user } = useAuthStore();
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">{user ? <HomeScreen /> : <AuthScreen />}</div>
    </div>
  );
};

export default HomePage;
