import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    original_name: { type: String },
    id: { type: Number, required: true },  
    poster_path: { type: String },  
    overview: { type: String },    
    first_air_date: { type: String },  
    rating_gg: { type: Number, default: 0 },  // Notion 中的 GG 評分
    rank_imdb: { type: Number, default: 0 },  // Notion 中的 IMDB 排名
    genres: [{ type: Number }],
});

const listSchema = new mongoose.Schema({
  // created_by: { type: String, required: true },
  description: { type: String, default: '' },
  id: { type: Number, required: true, unique: true },  // 確保清單 ID 唯一
  // iso_639_1: { type: String, default: 'zh' },
  item_count: { type: Number, default: 0 },
  items: [itemSchema],  // 嵌套的影片項目
  name: { type: String, required: true },
}, { timestamps: true });

export const List = mongoose.model('List', listSchema);
