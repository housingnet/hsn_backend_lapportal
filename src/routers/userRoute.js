import express from "express";
import sql from "mssql";

const Router = express.Router();

// add user to database
Router.post("/add", async (req, res) => {
  try {
    const result =
      await sql.query`INSERT INTO Users (Email, FirstName, LastName, Address, MobileNumber) VALUES (${req.body.email}, ${req.body.firstName}, ${req.body.lastName}, ${req.body.address}, ${req.body.mobileNumber})`;
    if (result.rowsAffected == 1) {
      res.json({
        status: "success",
        message: "User has been added!",
      });
    } else {
      res.json({
        status: "error",
        message: "Something went wrong, please try again!",
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
    const result = await sql.query`SELECT * FROM Users WHERE email=${email}`;
    console.log(result);
    if (result) {
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

//update user
Router.post("/update", async (req, res) => {
  try {
    const result =
      await sql.query`UPDATE Users SET FirstName = ${req.body.firstName}, LastName = ${req.body.lastName}, Address = ${req.body.address}, MobileNumber = ${req.body.mobileNumber} WHERE Email = ${req.body.email}`;
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
