import { List } from '../models/list.model.js';

// getList

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
