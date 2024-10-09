import axios from 'axios';
import { useState, useEffect } from 'react';
import useGetContent from '../hooks/useGetContent';
import Navbar from '../components/NavBar';
import { Link } from 'react-router-dom';
import { Play, CheckCircle, Eye } from 'lucide-react';

const IMDBPage = () => {
  const [filterByYear, setFilterByYear] = useState(false);
  const { content, loading } = useGetContent(
    `imdb${filterByYear ? '?year=1990' : ''}`
  );

  const [watchedMovies, setWatchedMovies] = useState(new Set());

  useEffect(() => {
    const fetchWatchedMovies = async () => {
      try {
        const response = await axios.get(`/api/v1/movie/watched`);
        setWatchedMovies(new Set(response.data.content));
      } catch (error) {
        console.error('Error fetching watched movies', error);
      }
    };
    fetchWatchedMovies();
  }, []);

  const handleToggleWatched = async (movieId) => {
    try {
      await axios.post(`/api/v1/movie/${movieId}/toggle`);
      setWatchedMovies((prev) => {
        const updated = new Set(prev);
        updated.has(movieId) ? updated.delete(movieId) : updated.add(movieId);
        return updated;
      });
    } catch (error) {
      console.error('Error toggling watched status', error);
    }
  };

  const watchedCount =
    content?.items.filter((item) => watchedMovies.has(item.id)).length || 0;
  const totalCount = content?.items.length || 0;
  const completionPercentage =
    totalCount > 0 ? Math.round((watchedCount / totalCount) * 100) : 0;

  if (loading) {
    return (
      <div className="h-screen text-white relative">
        <Navbar />
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="text-white bg-black min-h-screen">
      <Navbar />
      <div className="p-4">
        <div className="relative w-full bg-gray-700 h-6 rounded-lg overflow-hidden mb-4">
          <div
            className="bg-red-600 h-full"
            style={{
              width: `${completionPercentage}%`,
              transition: 'width 1s ease-in-out',
            }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
            Watched: {completionPercentage}%
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-8">
          IMDB Top 100 {filterByYear && '(1990 and later)'}
        </h1>
        <button
          className="bg-white text-black hover:bg-white/80 py-2 px-4 rounded mb-6"
          onClick={() => setFilterByYear(!filterByYear)}
        >
          {filterByYear ? 'Show All' : 'Filter by 1990'}
        </button>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {content?.items.map((item, index) => (
            <div
              key={item.id}
              className="bg-gray-800 p-2 sm:p-3 rounded-lg shadow-md text-center flex flex-col justify-between h-full"
            >
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                  alt={item.name}
                  className="rounded mb-2 h-60 sm:h-72 md:h-80 w-full object-contain"
                />
                <h2 className="text-base sm:text-lg font-bold truncate">
                  #{index + 1} {item.name}
                </h2>
                <p className="mt-1 sm:mt-2 text-sm sm:text-lg">
                  {item?.release_date?.split('-')[0] ||
                    item?.first_air_date.split('-')[0]}{' '}
                  | {item?.adult ? '18+' : 'PG-13'}
                </p>
              </div>

              <div className="mt-1 sm:mt-2 flex flex-col md:flex-row justify-center gap-2">
                <Link
                  to={`/watch/${item.id}`}
                  className="bg-white text-black hover:bg-white/80 font-bold py-1 sm:py-2 px-3 sm:px-4 rounded flex items-center text-sm"
                >
                  <Play className="size-6 mr-2 fill-black" />
                  Play
                </Link>
                <button
                  onClick={() => handleToggleWatched(item.id)}
                  className={`${
                    watchedMovies.has(item.id) ? 'bg-green-500' : 'bg-gray-500'
                  } text-white font-bold py-1 sm:py-2 px-3 sm:px-4 rounded items-center text-sm hidden md:flex`}
                >
                  {watchedMovies.has(item.id) ? (
                    <CheckCircle className="mr-2" />
                  ) : (
                    <Eye className="mr-2" />
                  )}
                  {watchedMovies.has(item.id) ? 'Watched' : 'Mark as Watched'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IMDBPage;
