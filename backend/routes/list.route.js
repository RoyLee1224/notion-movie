import express from 'express';
import { deleteAllLists } from '../controllers/list.controller.js';
const router = express.Router();

// 刪除所有 Lists
router.delete('/', deleteAllLists);

export default router;