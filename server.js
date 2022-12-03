import dotenv from "dotenv";
dotenv.config();
import express, { urlencoded } from "express";
import helmet from "helmet";
import cors from "cors";
import serviceRouter from "./src/routers/serviceRoute.js";
import userRouter from "./src/routers/userRoute.js";
import accountRouter from "./src/routers/accountRoute.js";
import dbConnect from "./src/config/dbConnect.js";
const app = express();
const PORT = process.env.PORT || 8000;

dbConnect();

//middleswares
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

app.use("/housing-net/v1/account", accountRouter);
app.use("/housing-net/v1/service", serviceRouter);
app.use("/housing-net/v1/user", userRouter);

app.listen(PORT, (error) => {
  console.log(`Server is ready at http://localhost:${PORT}`);
});
