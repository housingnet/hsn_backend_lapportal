import dotenv from "dotenv";
dotenv.config();
import express, { urlencoded } from "express";
import mongoDB from "./src/config/connection.js";
import { createUser, getUser } from "./src/model/users/userModel.js";

const app = express();
const PORT = process.env.PORT || 8000;

// Database connection
mongoDB();

//middleswares
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.post("/login", async (req, res) => {
  try {
    const result = await getUser(req.body.email);
    if (result._id && result.password == req.body.password) {
      return res.json({
        status: "success",
        message: "Login success!",
      });
    } else {
      return res.json({
        status: "success",
        message: "Login failed!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      message: "Internal server error",
    });
  }
});

app.post("/register", async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await createUser(req.body);

    user._id
      ? res.json({
          status: "success",
          message: "User has been created.",
        })
      : res.json({
          status: "error",
          message: "Unable to create account, please contact administrator.",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.status = 200;
      error.message = "Email already exist";
    }
    next(error);
  }
});

app.listen(PORT, (error) => {
  console.log(`Server is ready at http://localhost:${PORT}`);
});
