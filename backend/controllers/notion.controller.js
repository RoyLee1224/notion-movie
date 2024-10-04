import { fetchMoviesFromNotion } from '../services/notion.service.js';
import { fetchFromTMDB } from '../services/tmdb.service.js';
import { List } from '../models/list.model.js';

export const syncMoviesFromNotion = async (req, res) => {
    try {
        // 從 Notion 獲取電影資料
        const notionMovies = await fetchMoviesFromNotion();

        // 用來保存不同清單的電影
        const imdbTop100 = [];
        const ggRecommend = [];
        const ggWatched = [];

				console.log('Notion Movies:', notionMovies);  // 檢查 Notion 的電影資料

        for (const notionMovie of notionMovies) {
            const { title, rating_gg, rank_imdb } = notionMovie;

						// 使用 TMDB 搜索電影
            let tmdbResults;
            try {
                tmdbResults = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(title)}&include_adult=false&language=en-US&page=1`);
                
								console.log(`TMDB Results for ${title}:`, tmdbResults);
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

            if (matchedMovie) {
                // 將 TMDB 和 Notion 的資料結合，創建電影項目
                const movie = {
                    name: title,  // Notion 的 title
                    id: matchedMovie.id,  // TMDB ID
                    poster_path: matchedMovie.poster_path,  // TMDB 海報
                    overview: matchedMovie.overview,  // TMDB 簡介
                    vote_average: matchedMovie.vote_average,  // TMDB 評分
                    vote_count: matchedMovie.vote_count,  // TMDB 評價次數
                    first_air_date: matchedMovie.release_date,  // TMDB 首映日期
                    rating_gg,  // Notion 中的 GG 評分
                    rank_imdb  // Notion 中的 IMDB 排名
                };

                // 分配到相應的清單
                if (rank_imdb > 0 && rank_imdb <= 100) {
                    imdbTop100.push(movie);  // 排名前 100 的電影
                }
                
                if (rating_gg > 8) {
                    ggRecommend.push(movie);  // GG 評分大於 8 的電影
                }

                if (rating_gg > 0) {
                    ggWatched.push(movie);  // GG 評分不為 0 的電影
                }
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
