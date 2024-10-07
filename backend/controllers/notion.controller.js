import { fetchMoviesFromNotion } from '../services/notion.service.js';
import { fetchFromTMDB } from '../services/tmdb.service.js';
import { List } from '../models/list.model.js';

export const syncMoviesFromNotion = async (req, res) => {
    try {
        const notionMovies = await fetchMoviesFromNotion();

        const imdbTop100 = [];
        const ggRecommend = [];
        const ggWatched = [];

				// console.log('Notion Movies:', notionMovies);

        for (const notionMovie of notionMovies) {
            const { title, rating_gg, rank_imdb, original_name } = notionMovie;
            
            const searchQuery = original_name || title;

            let tmdbResults;
            try {
                tmdbResults = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`);
                
								// console.log(`TMDB Results for ${title}:`);
                if (tmdbResults.results.length === 0) {
                    console.log(`No match found for movie: ${searchQuery}`);
                    continue;  
                }
            } catch (error) {
                console.error(`Error fetching TMDB data for movie: ${searchQuery}`, error.message);
                continue;  
            }

            const matchedMovie = tmdbResults.results[0];  // 假設第一個結果是最相關的
						
						if (!matchedMovie) {
								console.log(`No match found for ${searchQuery} in TMDB. Proceeding with Notion data.`);
								matchedMovie = { id: null, poster_path: null, overview: null, vote_average: null, vote_count: null, release_date: null }; 
						}

						const movie = {
								name: title,
                                original_name: original_name || null,
								id: matchedMovie.id,
								poster_path: matchedMovie.poster_path,
								overview: matchedMovie.overview,
								vote_average: matchedMovie.vote_average,
								vote_count: matchedMovie.vote_count,
								first_air_date: matchedMovie.release_date,
								rating_gg: !isNaN(rating_gg) ? rating_gg : 0,  
								rank_imdb: !isNaN(rank_imdb) ? rank_imdb : 0 
						};

						if (rank_imdb > 0 && rank_imdb <= 100) {
								imdbTop100.push(movie);
						}

						if (rating_gg > 8) {
								ggRecommend.push(movie);
						}

						if (rating_gg !== null) {
								ggWatched.push(movie); 
						}

        }

        if (imdbTop100.length > 0) {
            imdbTop100.sort((a, b) => a.rank_imdb - b.rank_imdb);
            const imdbList = new List({
                name: 'IMDB Top 100',
                created_by: 'Admin',
                description: 'IMDB Top 100',
                favorite_count: 0,
                id: Math.floor(Math.random() * 1000000),
                iso_639_1: 'zh',
                item_count: imdbTop100.length,
                items: imdbTop100,
            });
            await imdbList.save();
        }

        if (ggRecommend.length > 0) {
            ggRecommend.sort((a, b) => b.rating_gg - a.rating_gg);
            const recommendList = new List({
                name: 'Recommend',
                created_by: 'Admin',
                description: 'Recommend - 評分大於 8',
                favorite_count: 0,
                id: Math.floor(Math.random() * 1000000),
                iso_639_1: 'zh',
                item_count: ggRecommend.length,
                items: ggRecommend,
            });
            await recommendList.save();
        }

        if (ggWatched.length > 0) {
            ggWatched.sort((a, b) => b.rating_gg - a.rating_gg);
            const watchedList = new List({
                name: 'Watch List',
                created_by: 'Admin',
                description: 'Watch List - 評分不為 0 的電影',
                favorite_count: 0,
                id: Math.floor(Math.random() * 1000000),
                iso_639_1: 'zh',
                item_count: ggWatched.length,
                items: ggWatched,
            });
            await watchedList.save();
        }

        res.status(200).json({ success: true, message: "Movies synced successfully from Notion and TMDB into three lists" });
    } catch (error) {
        console.error('Error syncing movies from Notion:', error);
        res.status(500).json({ success: false, message: 'Failed to sync movies from Notion' });
    }
};