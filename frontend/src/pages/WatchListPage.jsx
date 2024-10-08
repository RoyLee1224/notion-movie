import { useState } from 'react';
import useGetContent from '../hooks/useGetContent';
import Navbar from '../components/NavBar';
import { Link } from 'react-router-dom';
import { Info, Play } from 'lucide-react';

import { GENRE_MAP } from '../utils/constants';

const WatchListPage = () => {
  const { content, loading } = useGetContent('watched');
  const [selectedGenre, setSelectedGenre] = useState(null);

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

  const filteredMovies = selectedGenre
    ? content.items.filter((item) => item.genres.includes(selectedGenre))
    : content.items;

  return (
    <div className="text-white bg-black min-h-screen">
      <Navbar />
      <div className="p-4">
        <h1 className="text-4xl font-bold mb-8">Watch List</h1>

        {/* Genre Filter */}
        <div className="mb-4 flex gap-2 flex-wrap">
          {Object.entries(GENRE_MAP).map(([genreId, genreName]) => (
            <button
              key={genreId}
              onClick={() =>
                setSelectedGenre(
                  selectedGenre === parseInt(genreId) ? null : parseInt(genreId)
                )
              }
              className={`px-4 py-2 rounded ${
                selectedGenre === parseInt(genreId)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-500 text-gray-200'
              }`}
            >
              {genreName}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredMovies.map((item) => (
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
                  {item.name}
                </h2>
                <p className="mt-1 sm:mt-2 text-sm sm:text-lg">
                  {item?.release_date?.split('-')[0] ||
                    item?.first_air_date.split('-')[0]}{' '}
                  | {item.rating_gg} ★
                </p>
                {/* Genre tags */}
                <div className="mt-2 flex flex-wrap justify-center gap-1">
                  {item.genres.map((genreId) => (
                    <span
                      key={genreId}
                      className="bg-gray-600 text-white px-2 py-1 rounded text-xs"
                    >
                      {GENRE_MAP[genreId] || 'Unknown Genre'}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-1 sm:mt-2 flex flex-col md:flex-row justify-center gap-2">
                <Link
                  to={`/watch/${item.id}`}
                  className="bg-white text-black hover:bg-white/80 font-bold py-1 sm:py-2 px-3 sm:px-4 rounded flex items-center text-sm"
                >
                  <Play className="size-6 mr-2 fill-black" />
                  Play
                </Link>
                <Link
                  to={`/watch/${item.id}`}
                  className="bg-gray-500 text-white hover:bg-white/80 font-bold py-1 sm:py-2 px-3 sm:px-4 rounded flex items-center text-sm hidden md:flex"
                >
                  <Info className="size-6 mr-2" />
                  Info
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchListPage;
