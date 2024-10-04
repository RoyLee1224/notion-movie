import express from "express";
import { getMovieDetails, getMovieTrailers, getTrendingMovie } from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/trending", getTrendingMovie);
router.get("/:id/trailers", getMovieTrailers);
router.get("/:id/details", getMovieDetails);
// router.get("/:id/similar", getSimilarMovies);
// router.get("/:category", getMoviesByCategory);

// router.get("/:list",getMovies)

export default router;