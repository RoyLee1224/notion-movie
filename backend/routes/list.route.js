import express from 'express';
import { deleteAllLists, getImdbList, getRecommendList, getWatchlist } from '../controllers/list.controller.js';
const router = express.Router();

router.delete('/', deleteAllLists);

router.get('/imdb',getImdbList)
router.get('/recommend',getRecommendList)
router.get('/watched',getWatchlist)

export default router;