import { Client } from '@notionhq/client';
import { ENV_VARS } from '../config/envVars.js';
import { List } from '../models/list.model.js';  // 引入 Mongoose 模型

const notion = new Client({ auth: ENV_VARS.NOTION_API_KEY });

// 測試是否能成功從 Notion 資料庫中讀取資料
// async function testNotionConnection() {
//   try {
//     const response = await notion.databases.query({
//       database_id: ENV_VARS.NOTION_DATABASE_ID, // 確保 .env 檔案中設置了正確的 NOTION_DATABASE_ID
//     });

//     console.log('Successfully connected to Notion database.');
//     console.log('First page data:', response.results[0]); // 打印第一筆資料以驗證
//   } catch (error) {
//     console.error('Failed to connect to Notion database:', error.message);
//   }
// }

// 呼叫測試函數:node backend/services/notion.service.js
// testNotionConnection()

// 從 Notion 資料庫同步資料並存入 MongoDB
export async function syncNotionMovies() {
  try {
    const response = await notion.databases.query({
      database_id: ENV_VARS.NOTION_DATABASE_ID,
    });

    // 將 Notion 頁面轉換為我們的 MongoDB 格式
    const movies = response.results.map(page => {
      return {
        id: parseInt(page.id.replaceAll('-', ''), 16),  // 將 Notion ID 轉換為整數作為唯一 ID
        name: page.properties.Title.title[0]?.text?.content || 'No Title',
        original_name: page.properties.Title.title[0]?.text?.content || 'No Title',
        overview: page.properties.Description?.rich_text[0]?.text?.content || 'No Description',
        poster_path: page.properties.Poster?.files[0]?.file?.url || '',
        media_type: page.properties.Type?.select?.name || 'movie',
        genre_ids: page.properties.Genres?.multi_select.map(g => parseInt(g.name)) || [],
        first_air_date: page.properties.ReleaseDate?.date?.start || 'Unknown',
        vote_average: page.properties.Rating?.number || 0,
        vote_count: page.properties.VoteCount?.number || 0,
        origin_country: page.properties.Country?.multi_select.map(c => c.name) || [],
        rating_gg: page.properties.RatingGG?.number || 0,  // Notion 中的 GG 評分
        rank_imdb: page.properties.IMDBRank?.number || 0,  // Notion 中的 IMDB 排名
      };
    });

    // 創建一個新的清單並儲存到 MongoDB
    const newList = new List({
      created_by: 'Admin',  // 可根據需要動態設置
      description: 'Synced from Notion',
      favorite_count: 0,
      id: Math.floor(Math.random() * 1000000),  // 隨機生成唯一 ID
      iso_639_1: 'zh',
      item_count: movies.length,
      items: movies,  // 儲存電影清單
      name: 'Movies List from Notion',
    });

    await newList.save();  // 儲存清單到 MongoDB
    console.log('Notion data synced and saved to MongoDB.');
  } catch (error) {
    console.error('Failed to sync Notion movies:', error.message);
  }
}
