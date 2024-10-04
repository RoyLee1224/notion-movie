import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route.js"
import movieRoutes from "./routes/movie.route.js"
import tvRoutes from "./routes/tv.route.js"

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import { protectRoute } from "./middleware/protectRoute.js";

dotenv.config();

const app = express();

const PORT = ENV_VARS.PORT

app.use(express.json()); //allow parse req.body

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/movie",protectRoute, movieRoutes)
app.use("/api/v1/tv", protectRoute,tvRoutes)
// app.use("/api/v1/list",listRoutes)

app.listen(PORT, () => {
	console.log("Server started at http://localhost:"+PORT);
  connectDB();
});