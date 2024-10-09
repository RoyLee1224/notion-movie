import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Menu, Search } from 'lucide-react';
import { useAuthStore } from '../store/authUser';
import { useContentStore } from '../store/content';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const { setContentType } = useContentStore();

  return (
    <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
      <div className="flex items-center gap-10 z-50">
        <Link to="/">
          <img
            src="/netflix-logo.png"
            alt="Netflix Logo"
            className="w-32 sm:w-40"
          />
        </Link>

        {/* desktop navbar items */}
        <div className="hidden sm:flex gap-10 items-center">
          <Link
            to="/"
            className="hover:underline hover:text-gray-300"
            onClick={() => setContentType('movie')}
          >
            Movies
          </Link>
          <Link
            to="/"
            className="hover:underline hover:text-gray-300"
            onClick={() => setContentType('tv')}
          >
            Series
          </Link>
          <Link to="/imdb" className="hover:underline hover:text-gray-300">
            IMDB Top 100
          </Link>
          <Link to="/recommend" className="hover:underline hover:text-gray-300">
            吉選電影
          </Link>
          <Link to="/watched" className="hover:underline hover:text-gray-300">
            觀影吉錄
          </Link>
          <Link to="/history" className="hover:underline hover:text-gray-300">
            Search History
          </Link>
        </div>
      </div>

      <div className="flex gap-2 items-center z-50">
        <Link to={'/search'}>
          <Search className="size-6 cursor-pointer" />
        </Link>
        <img
          src={user.image}
          alt="Avatar"
          className="h-8 rounded cursor-pointer"
        />
        <LogOut className="size-6 cursor-pointer" onClick={logout} />
        <div className="sm:hidden">
          <Menu className="size-6 cursor-pointer" onClick={toggleMobileMenu} />
        </div>
      </div>

      {/* mobile navbar items */}
      {isMobileMenuOpen && (
        <div className="w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800">
          <Link
            to={'/'}
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            Movies
          </Link>
          <Link
            to={'/'}
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            Tv Shows
          </Link>
          <Link
            to={'/imdb'}
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            IMDB top 100
          </Link>
          <Link
            to={'/recommend'}
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            吉選電影
          </Link>
          <Link
            to={'/watched'}
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            Watch List
          </Link>
          <Link
            to={'/history'}
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            Search History
          </Link>
        </div>
      )}
    </header>
  );
};
export default Navbar;
