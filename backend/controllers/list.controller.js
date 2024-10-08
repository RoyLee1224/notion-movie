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
        const yearFilter = req.query.year ? parseInt(req.query.year) : null;

        let imdbList = await List.findOne({ name: 'IMDB Top' });

        if (yearFilter) {
            imdbList.items = imdbList.items.filter((movie) => {
                const releaseYear = new Date(movie.first_air_date).getFullYear();
                return releaseYear >= yearFilter;
            });
        }

        res.status(200).json(imdbList);
    } catch (error) {
        console.error('Error fetching IMDB Top list:', error);
        res.status(500).json({ message: 'Failed to fetch IMDB Top list' });
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
