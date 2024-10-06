import { useAuthStore } from '../../store/authUser';
import AuthScreen from './authScreen';
import HomeScreen from './HomeScreen';

const HomePage = () => {
  const { user } = useAuthStore();
  return (
    <div className="hero-bg h-screen">
      {user ? <HomeScreen /> : <AuthScreen />}
    </div>
  );
};

export default HomePage;
