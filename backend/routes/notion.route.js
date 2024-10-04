import express from 'express';
import { syncMoviesFromNotion } from '../controllers/notion.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';
import { protectAdmin } from '../middleware/protectAdmin.js';

const router = express.Router();

// 只有管理員才能觸發 Notion 資料庫同步
router.post('/sync', protectRoute, protectAdmin, syncMoviesFromNotion);

export default router;