import dotenv from "dotenv";
dotenv.config();
import express, { urlencoded } from "express";
import helmet from "helmet";
import cors from "cors";
import sql from "mssql";
import serviceRouter from "./src/routers/serviceRoute.js";
const app = express();
const PORT = process.env.PORT || 8000;

//middleswares
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

app.use("/housing-net/v1/service", serviceRouter);

// add user to database
app.post("/user", async (req, res) => {
  try {
    const pool = new sql.ConnectionPool({
      authentication: {
        options: {
          userName: process.env.DATABASE_USERNAME,
          password: process.env.DATABASE_PASSWORD,
        },
        type: "default",
      },
      database: process.env.DATABASE_NAME,
      server: process.env.DATABASE_SERVER,
      options: {
        encrypt: process.env.NODE_ENV == "production" ? true : false,
        trustServerCertificate:
          process.env.NODE_ENV == "production" ? false : true,
      },
    });

    pool
      .connect()
      .then(() => {
        //simple query
        pool
          .request()
          .query(
            `INSERT INTO Users (Email, FirstName, LastName, Address, MobileNumber) VALUES ('${req.body.email}', '${req.body.firstName}', '${req.body.lastName}', '${req.body.address}', '${req.body.mobileNumber}')`,
            (err, result) => {
              sql.close();
              return res.json({
                status: "success",
              });
            }
          );
      })
      .catch((error) => {
        return res.json({
          status: "error",
          message: error.message,
        });
      });
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      message: error.message,
    });
  }
});

//get single user
app.post("/get-user", async (req, res) => {
  try {
    const pool = new sql.ConnectionPool({
      authentication: {
        options: {
          userName: process.env.DATABASE_USERNAME,
          password: process.env.DATABASE_PASSWORD,
        },
        type: "default",
      },
      database: process.env.DATABASE_NAME,
      server: process.env.DATABASE_SERVER,
      options: {
        encrypt: process.env.NODE_ENV == "production" ? true : false,
        trustServerCertificate:
          process.env.NODE_ENV == "production" ? false : true,
      },
    });

    pool
      .connect()
      .then(() => {
        //simple query
        pool
          .request()
          .query(
            `SELECT * FROM Users WHERE email='${req.body.email}'`,
            (err, result) => {
              sql.close();
              return res.json({
                status: "success",
                message: result.recordset,
              });
            }
          );
      })
      .catch((error) => {
        return res.json({
          status: "error",
          message: error.message,
        });
      });
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      message: error.message,
    });
  }
});

//update user
app.post("/update-user", async (req, res) => {
  try {
    const pool = new sql.ConnectionPool({
      authentication: {
        options: {
          userName: process.env.DATABASE_USERNAME,
          password: process.env.DATABASE_PASSWORD,
        },
        type: "default",
      },
      database: process.env.DATABASE_NAME,
      server: process.env.DATABASE_SERVER,
      options: {
        encrypt: process.env.NODE_ENV == "production" ? true : false,
        trustServerCertificate:
          process.env.NODE_ENV == "production" ? false : true,
      },
    });

    pool
      .connect()
      .then(() => {
        //simple query
        pool
          .request()
          .query(
            `UPDATE Users SET FirstName = '${req.body.firstName}', LastName = '${req.body.lastName}', Address = '${req.body.address}', MobileNumber = '${req.body.mobileNumber}' WHERE Email = '${req.body.email}'`,
            (err, result) => {
              sql.close();
              return res.json({
                status: "success",
                message: result.recordset,
              });
            }
          );
      })
      .catch((error) => {
        return res.json({
          status: "error",
          message: error.message,
        });
      });
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      message: error.message,
    });
  }
});

app.listen(PORT, (error) => {
  console.log(`Server is ready at http://localhost:${PORT}`);
});
