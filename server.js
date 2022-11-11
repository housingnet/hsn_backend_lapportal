import dotenv from "dotenv";
dotenv.config();
import express from "express";

const app = express();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("test");
});

app.listen(PORT, (error) => {
  console.log(`Server is ready at http://localhost:${PORT}`);
});
