import { List } from '../models/list.model.js';

export const deleteAllLists = async (req, res) => {
    try {
        // 使用 deleteMany 刪除所有 List 文檔
        const result = await List.deleteMany({});  // 空條件，刪除所有文檔

        res.status(200).json({
            success: true,
            message: `${result.deletedCount} lists have been deleted.`,
        });
    } catch (error) {
        console.error('Error deleting all lists:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to delete lists.',
        });
    }
};

export const getImdbList = async (req, res) => {
  try {
    const imdbList = await List.findOne({ name: 'IMDB Top 100' }).sort({ imdb_rank: 1 });
    if (!imdbList) return res.status(404).json({ message: 'IMDB Top 100 list not found' });
    res.json(imdbList);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching IMDB Top 100 list', error });
  }
};

export const getRecommendList = async (req, res) => {
  try {
    const recommendList = await List.findOne({ name: 'Recommend' });
    if (!recommendList) return res.status(404).json({ message: 'GG Recommend list not found' });
    res.json(recommendList);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching GG Recommend list', error });
  }
};

export const getWatchlist = async (req, res) => {
  try {
    const watchList = await List.findOne({ name: 'Watch List' });
    if (!watchList) return res.status(404).json({ message: 'GG Watchlist not found' });
    res.json(watchList);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching GG Watchlist', error });
  }
};
