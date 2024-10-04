import { fetchMoviesFromNotion } from '../services/notion.service.js';
import { fetchFromTMDB } from '../services/tmdb.service.js';
import { List } from '../models/list.model.js';

export const syncMoviesFromNotion = async (req, res) => {
    try {
        const notionMovies = await fetchMoviesFromNotion();
        const movies = [];

        for (const notionMovie of notionMovies) {
            const { title, rating_gg, rank_imdb } = notionMovie;

            // 使用 TMDB 搜索電影
            const tmdbResults = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(title)}&include_adult=false&language=en-US&page=1`);
            const matchedMovie = tmdbResults.results[0];  // 假設第一個結果是最相關的

            if (matchedMovie) {
                // 將 TMDB 和 Notion 的資料結合，創建電影項目
                const movie = {
                    name: title,  // Notion 的 title
                    id: matchedMovie.id,  // TMDB ID
                    poster_path: matchedMovie.poster_path,  
                    overview: matchedMovie.overview,
                    vote_average: matchedMovie.vote_average,
                    vote_count: matchedMovie.vote_count,
                    first_air_date: matchedMovie.release_date,
                    rating_gg,  // Notion 中的我的評分
                    rank_imdb  // Notion 中的 IMDB 排名
                };

                movies.push(movie);  // 將電影資料添加到 movies 清單中
            }
        }

        // 檢查 movies 是否已正確填充電影資料
        if (movies.length === 0) {
            return res.status(400).json({ success: false, message: "No movies to sync" });
        }

        // 創建新的清單並保存到 MongoDB
        const newList = new List({
            created_by: 'Admin',
            description: 'Synced from Notion and TMDB',
            favorite_count: 0,
            id: Math.floor(Math.random() * 1000000),
            iso_639_1: 'zh',
            item_count: movies.length,
            items: movies,
            name: 'Movies List from Notion'
        });

        await newList.save();

        res.status(200).json({ success: true, message: "Movies synced successfully from Notion and TMDB" });
    } catch (error) {
        console.error('Error syncing movies from Notion:', error);
        res.status(500).json({ success: false, message: 'Failed to sync movies from Notion' });
    }
};