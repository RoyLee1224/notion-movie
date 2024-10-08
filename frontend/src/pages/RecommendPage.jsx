import useGetContent from '../hooks/useGetContent'; // 使用推薦內容的 hook
import Navbar from '../components/NavBar';
import { Link } from 'react-router-dom';
import { Info, Play } from 'lucide-react';

const RecommendPage = () => {
  const { content, loading } = useGetContent('recommend');

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
        <h1 className="text-4xl font-bold mb-8">吉選電影</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 ">
          {content?.items.map((item) => (
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
                  to={`/info/${item.id}`}
                  className="bg-gray-500 text-white hover:bg-white/80 font-bold py-1 sm:py-2 px-3 sm:px-4 rounded items-center text-sm hidden md:flex"
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

export default RecommendPage;
