import dotenv from "dotenv";
dotenv.config();
import express, { urlencoded } from "express";
import mongoDB from "./src/config/connection.js";
import { createUser } from "./src/model/users/userModel.js";

const app = express();
const PORT = process.env.PORT || 8000;

// Database connection
mongoDB();

//middleswares
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.post("/", async (req, res, next) => {
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

//   try {
//     const result = await fetchUser();

//     if (result.length) {
//       return res.json({
//         status: "success",
//         result,
//       });
//     }

//     res.json({ status: "error", message: "user not found" });
//   } catch (error) {
//     if (error) {
//       error.status = 500;
//       error.message = "Internal server error";
//     }
//     next(error);
//   }
// });

app.listen(PORT, (error) => {
  console.log(`Server is ready at http://localhost:${PORT}`);
});
