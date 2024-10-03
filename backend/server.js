import express from "express";

const app = express();

app.get("/",(req,res)=> {
  res.send("Server is ready now")
})

app.listen(4000, () => {
	console.log("Server started at http://localhost:4000:");
});