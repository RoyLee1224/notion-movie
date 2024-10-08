import { Client } from '@notionhq/client';
import { ENV_VARS } from '../config/envVars.js';
import { response } from 'express';

const notion = new Client({ auth: ENV_VARS.NOTION_API_KEY });

// 測試是否能成功從 Notion 資料庫中讀取資料
// async function testNotionConnection() {
//   try {
//     const response = await notion.databases.query({
//       database_id: ENV_VARS.NOTION_DATABASE_ID, 
//     });

//     console.log('Successfully connected to Notion database.');
//     console.log('First page data:', response.results[0]);
//   } catch (error) {
//     console.error('Failed to connect to Notion database:', error.message);
//   }
// }

// 呼叫測試函數:node backend/services/notion.service.js
// testNotionConnection()


// 從 Notion 資料庫中獲取電影資料
export const fetchMoviesFromNotion = async () => {
    try {
        let movies = [];
        let hasMore = true;
        let startCursor = undefined;

        while (hasMore) {
            const response = await notion.databases.query({
                database_id: ENV_VARS.NOTION_DATABASE_ID,
                page_size: 100, 
                start_cursor: startCursor,
            });

            const fetchedMovies = response.results.map(page => ({
                title: page.properties.Title.title[0]?.text?.content || 'No Title',
                rating_gg: page.properties.Rating?.number ?? null,  
                rank_imdb: page.properties.imdb?.number ?? null,
                original_name: page.properties['original name']?.rich_text[0]?.plain_text || null,
            }));

            movies = [...movies, ...fetchedMovies];

            hasMore = response.has_more;
            startCursor = response.next_cursor;
        }
        return movies; 

    } catch (error) {
        console.error('Failed to fetch movies from Notion:', error.message);
        throw new Error('Failed to fetch movies from Notion');
    }
};