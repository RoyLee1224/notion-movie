import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route.js"
import movieRoutes from "./routes/movie.route.js"
import tvRoutes from "./routes/tv.route.js"
import searchRoutes from "./routes/search.route.js"
import notionRoutes from "./routes/notion.route.js";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import { protectRoute } from "./middleware/protectRoute.js";

dotenv.config();

const app = express();

const PORT = ENV_VARS.PORT

app.use(express.json()); //allow parse req.body
app.use(cookieParser());

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/movie",protectRoute, movieRoutes)
app.use("/api/v1/tv", protectRoute,tvRoutes)
app.use("/api/v1/search", protectRoute,searchRoutes)
// app.use("/api/v1/list",listRoutes)

app.use("/api/v1/notion", protectRoute, notionRoutes);

app.listen(PORT, () => {
	console.log("Server started at http://localhost:"+PORT);
  connectDB();
});