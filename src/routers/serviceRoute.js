import express from "express";
import sql from "mssql";

const Router = express.Router();

Router.post("/add", async (req, res) => {
  try {
    const result =
      await sql.query`INSERT INTO Services (Title, Description, Owner_Email) VALUES (${req.body.title}, ${req.body.description}, ${req.body.owner_email})`;
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

Router.post("/get", async (req, res) => {
  const { email } = req.body;
  try {
    const result =
      await sql.query`SELECT * FROM Services WHERE owner_email=${email}`;
    console.log(result);
    if (result.recordset.length !== 0) {
      res.json({
        status: "success",
        message: result.recordset,
      });
    } else {
      res.json({
        status: "success",
        message: [],
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

Router.post("/update", async (req, res) => {
  try {
    const result =
      await sql.query`UPDATE Services SET Title = ${req.body.title}, Description = ${req.body.description} WHERE ID = ${req.body.id}`;
    if (result.rowsAffected == 1) {
      return res.json({
        status: "success",
        message: result.recordset,
      });
    } else {
      return res.json({
        status: "error",
        message: [],
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
