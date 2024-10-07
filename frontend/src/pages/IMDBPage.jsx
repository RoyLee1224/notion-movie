import useGetIMDBContent from '../hooks/useGetIMDBContent';
import Navbar from '../components/NavBar';
import { Link } from 'react-router-dom';
import { Info, Play } from 'lucide-react';

const IMDBPage = () => {
  const { IMDBContent, loading } = useGetIMDBContent();

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
        <h1 className="text-4xl font-bold mb-8">IMDB Top 100</h1>

        {/* 手機顯示兩欄，較大屏幕則顯示更多欄 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {IMDBContent?.items.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 p-2 sm:p-3 rounded-lg shadow-md text-center flex flex-col justify-between h-full"
            >
              <div>
                {/* 手機縮小圖片高度，較大螢幕保持原本高度 */}
                <img
                  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                  alt={item.name}
                  className="rounded mb-2 h-60 sm:h-72 md:h-80 w-full object-contain"
                />
                <h2 className="text-base sm:text-lg font-bold truncate">
                  #{item.rank_imdb} {item.name}
                </h2>
                <p className="mt-1 sm:mt-2 text-sm sm:text-lg">
                  {item?.release_date?.split('-')[0] ||
                    item?.first_air_date.split('-')[0]}{' '}
                  | {item?.adult ? '18+' : 'PG-13'}
                </p>
              </div>

              {/* 手機隱藏 Info 按鈕 */}
              <div className="mt-1 sm:mt-2 flex flex-col md:flex-row justify-center gap-2">
                <Link
                  to={`/watch/${item.id}`}
                  className="bg-white text-black hover:bg-white/80 font-bold py-1 sm:py-2 px-3 sm:px-4 rounded flex items-center text-sm"
                >
                  <Play className="size-6 mr-2 fill-black" />
                  Play
                </Link>
                <Link
                  to={`/info/${item.id}`}
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

export default IMDBPage;
