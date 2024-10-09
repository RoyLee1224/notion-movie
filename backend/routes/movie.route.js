import express from "express";
import { getMovieDetails, getMovieTrailers, getMoviesByCategory, getSimilarMovies, getTrendingMovie, getWatchedMovies, toggleWatchedMovie, } from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/trending", getTrendingMovie);
router.get("/watched",getWatchedMovies)
router.get("/:id/trailers", getMovieTrailers);
router.get("/:id/details", getMovieDetails);
router.get("/:id/similar", getSimilarMovies);
router.post("/:id/toggle", toggleWatchedMovie);

router.get("/:category", getMoviesByCategory);

export default router;