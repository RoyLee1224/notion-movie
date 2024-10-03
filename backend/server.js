import express from "express";

const app = express();

app.get("/api/v1/signup",(req,res)=> {
  res.send("Signup route")
})
app.get("/api/v1/login",(req,res)=> {
  res.send("Login route")
})
app.get("/api/v1/logout",(req,res)=> {
  res.send("Logout route")
})

app.listen(4000, () => {
	console.log("Server started at http://localhost:4000:");
});