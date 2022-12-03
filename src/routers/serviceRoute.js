import express from "express";
import sql from "mssql";

const Router = express.Router();

// Router.post("/add-service", async (req, res) => {
//   try {
//     const pool = new sql.ConnectionPool({
//       authentication: {
//         options: {
//           userName: process.env.DATABASE_USERNAME,
//           password: process.env.DATABASE_PASSWORD,
//         },
//         type: "default",
//       },
//       database: process.env.DATABASE_NAME,
//       server: process.env.DATABASE_SERVER,
//       options: {
//         encrypt: process.env.NODE_ENV == "production" ? true : false,
//         trustServerCertificate:
//           process.env.NODE_ENV == "production" ? false : true,
//       },
//     });

//     pool
//       .connect()
//       .then(() => {
//         //simple query
//         pool
//           .request()
//           .query(
//             `INSERT INTO Services (Title, Description, Owner_Email) VALUES ('${req.body.title}', '${req.body.description}', '${req.body.owner_email}')`,
//             (err, result) => {
//               sql.close();
//               console.log(err);
//               console.log(result);
//               if (err) {
//                 return res.json({
//                   status: "error",
//                   message: err.message,
//                 });
//               }
//               return res.json({
//                 status: "success",
//               });
//             }
//           );
//       })
//       .catch((error) => {
//         return res.json({
//           status: "error",
//           message: error.message,
//         });
//       });
//   } catch (error) {
//     console.log(error);
//     return res.json({
//       status: "error",
//       message: error.message,
//     });
//   }
// });

Router.post("/add-service", async (req, res) => {
  try {
    const result =
      await sql.query`INSERT INTO Services (Title, Description, Owner_Email) VALUES ('${req.body.title}', '${req.body.description}', '${req.body.owner_email}')`;
    if (result.rowsAffected == 1) {
      res.json({
        status: "success",
        message: "Service has been added!",
      });
    } else {
      res.json({
        status: "error",
        message: "Service has not been added!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      message: error.message,
    });
  }
});

export default Router;
