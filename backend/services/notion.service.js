// fetchFromNotionDB


export async function syncNotionMovies() {
  const notionMovies = await getNotionMovies();
  await MovieModel.insertMany(notionMovies, { ordered: false });
}

// 比對時使用本地資料庫
export async function compareMovies() {
  const localMovies = await MovieModel.find({});
  const matchedMovies = [];

  for (let movie of localMovies) {
    const tmdbMovie = await searchMovieInTMDB(movie.title);
    if (tmdbMovie) {
      matchedMovies.push({
        localTitle: movie.title,
        tmdbTitle: tmdbMovie.title,
      });
    }
  }

  return matchedMovies;
}