import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoDB from "./src/config/connection";

const app = express();
const PORT = process.env.PORT || 8000;

// Database connection
mongoDB();

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(PORT, (error) => {
  console.log(`Server is ready at http://localhost:${PORT}`);
});
