import dotenv from "dotenv";
dotenv.config();
import express, { urlencoded } from "express";
import sql from "mssql";

const app = express();
const PORT = process.env.PORT || 8000;

//middleswares
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.post("/add-user", async (req, res) => {
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
        encrypt: true,
      },
    });

    pool
      .connect()
      .then(() => {
        //simple query
        pool
          .request()
          .query(
            `INSERT INTO Persons (Email, FirstName, LastName, Address, MobileNumber) VALUES ('${req.body.email}', '${req.body.firstName}', '${req.body.lastName}', '${req.body.address}', '${req.body.mobileNumber}')`,
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
        encrypt: true,
      },
    });

    pool
      .connect()
      .then(() => {
        //simple query
        pool
          .request()
          .query(
            `SELECT * FROM Persons WHERE email='${req.body.email}'`,
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
