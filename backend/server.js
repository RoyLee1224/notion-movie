import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route.js"
import { ENV_VARS } from "./config/envVars.js";

dotenv.config();

const app = express();
const PORT = ENV_VARS.PORT

app.use("/api/v1/auth",authRoutes)

app.listen(PORT, () => {
	console.log("Server started at http://localhost:"+PORT);
});