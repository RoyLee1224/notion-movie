import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  backdrop_path: { type: String },
  id: { type: Number, required: true },
  name: { type: String, required: true },
  original_name: { type: String },
  overview: { type: String },
  poster_path: { type: String },
  media_type: { type: String, enum: ['tv', 'movie'], required: true },
  genre_ids: [{ type: Number }],
  first_air_date: { type: String },
  vote_average: { type: Number },
  vote_count: { type: Number },
  origin_country: [{ type: String }],
  rating_gg:{ type: Number },
  rank_imdb:{ type: Number }
});

const listSchema = new mongoose.Schema({
  created_by: { type: String, required: true },
  description: { type: String, default: '' },
  favorite_count: { type: Number, default: 0 },
  id: { type: Number, required: true, unique: true },  // 確保清單 ID 唯一
  iso_639_1: { type: String, default: 'zh' },
  item_count: { type: Number, default: 0 },
  items: [itemSchema],  // 嵌套的影片項目
  name: { type: String, required: true },
}, { timestamps: true });

export const List = mongoose.model('List', listSchema);
