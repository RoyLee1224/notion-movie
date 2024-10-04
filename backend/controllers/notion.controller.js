import { fetchMoviesFromNotion } from '../services/notion.service.js';
import { fetchFromTMDB } from '../services/tmdb.service.js';
import { List } from '../models/list.model.js';

export const syncMoviesFromNotion = async (req, res) => {
    try {
        // 從 Notion DB 獲取電影資料
        const notionMovies = await fetchMoviesFromNotion();

        const imdbTop100 = [];
        const ggRecommend = [];
        const ggWatched = [];

				// console.log('Notion Movies:', notionMovies);  // 檢查 Notion 的電影資料

        for (const notionMovie of notionMovies) {
            const { title, rating_gg, rank_imdb } = notionMovie;
						// 用 TMDB 搜索電影
            let tmdbResults;
            try {
                tmdbResults = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`);
                
								// console.log(`TMDB Results for ${title}:`);
                // 檢查是否有結果返回
                if (tmdbResults.results.length === 0) {
                    console.log(`No match found for movie: ${title}`);
                    continue;  // 跳過這部電影
                }
            } catch (error) {
                console.error(`Error fetching TMDB data for movie: ${title}`, error.message);
                continue;  // 繼續處理下一部電影
            }

            const matchedMovie = tmdbResults.results[0];  // 假設第一個結果是最相關的
						
						if (!matchedMovie) {
								console.log(`No match found for ${title} in TMDB. Proceeding with Notion data.`);
								matchedMovie = { id: null, poster_path: null, overview: null, vote_average: null, vote_count: null, release_date: null };  // 允許沒有 TMDB 結果的電影
						}

						// 繼續建立電影資料，使用 Notion 的資料
						const movie = {
								name: title,
								id: matchedMovie.id,
								poster_path: matchedMovie.poster_path,
								overview: matchedMovie.overview,
								vote_average: matchedMovie.vote_average,
								vote_count: matchedMovie.vote_count,
								first_air_date: matchedMovie.release_date,
								rating_gg: !isNaN(rating_gg) ? rating_gg : 0,  // 如果 rating_gg 是空，設為 0
								rank_imdb: !isNaN(rank_imdb) ? rank_imdb : 0   // 如果 rank_imdb 是空，設為 0
						};

						// 確保所有電影（無論有無 TMDB 資料）都被處理
						if (rank_imdb > 0 && rank_imdb <= 100) {
								imdbTop100.push(movie);  // 排名前 100 的電影
						}

						if (rating_gg > 8) {
								ggRecommend.push(movie);  // GG 評分大於 8 的電影
						}

						if (rating_gg !== 0) {
								ggWatched.push(movie);  // GG 評分不為 0 的電影
						}

        }

        // 創建 IMDB Top 100 清單並保存到 MongoDB
        if (imdbTop100.length > 0) {
            const imdbList = new List({
                created_by: 'Admin',
                description: 'IMDB Top 100',
                favorite_count: 0,
                id: Math.floor(Math.random() * 1000000),
                iso_639_1: 'zh',
                item_count: imdbTop100.length,
                items: imdbTop100,
                name: 'IMDB Top 100'
            });
            await imdbList.save();
        }

        // 創建 GG Recommend 清單並保存到 MongoDB
        if (ggRecommend.length > 0) {
            const recommendList = new List({
                created_by: 'Admin',
                description: '吉recommend - GG 評分大於 8',
                favorite_count: 0,
                id: Math.floor(Math.random() * 1000000),
                iso_639_1: 'zh',
                item_count: ggRecommend.length,
                items: ggRecommend,
                name: '吉recommend'
            });
            await recommendList.save();
        }

        // 創建 GG 觀影紀錄清單並保存到 MongoDB
        if (ggWatched.length > 0) {
            const watchedList = new List({
                created_by: 'Admin',
                description: '吉觀影紀錄 - GG 評分不為 0 的電影',
                favorite_count: 0,
                id: Math.floor(Math.random() * 1000000),
                iso_639_1: 'zh',
                item_count: ggWatched.length,
                items: ggWatched,
                name: '吉觀影紀錄'
            });
            await watchedList.save();
        }

        res.status(200).json({ success: true, message: "Movies synced successfully from Notion and TMDB into three lists" });
    } catch (error) {
        console.error('Error syncing movies from Notion:', error);
        res.status(500).json({ success: false, message: 'Failed to sync movies from Notion' });
    }
};
