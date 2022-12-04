import express from "express";
import sql from "mssql";
import { comparePassword, hashPassword } from "../helpers/bcrypt.js";

const Router = express.Router();

Router.post("/register", async (req, res) => {
  try {
    // get value from body
    const { email, password, role } = req.body;

    // hashing the password
    const hashedPassword = hashPassword(password);

    // making request to DB
    const result =
      await sql.query`INSERT INTO Users (Email, Password, Role) VALUES (${email}, ${hashedPassword}, ${role})`;

    //check if data has been inserted
    if (result.rowsAffected == 1) {
      res.json({
        status: "success",
        message: "Registration success",
      });
    }

    // data is not inserted, db problem
    else {
      res.json({
        status: "error",
        message: "Something went wrong, please try again!",
      });
    }
  } catch (error) {
    console.log(error);

    // check if user already exist, passing different message to user
    if (error.message.includes("Violation of PRIMARY KEY")) {
      return res.json({
        status: "error",
        message: "Please try using different email",
      });
    }

    // default error message if error exist
    return res.json({
      status: "error",
      message: error.message,
    });
  }
});

Router.post("/login", async (req, res) => {
  try {
    // get value from body
    const { email, password } = req.body;

    //check if user exist
    const result = await sql.query`SELECT * FROM Users WHERE email=${email}`;
    if (result.recordset.length > 0) {
      //Compare password
      const hashedPassword = result.recordset[0].Password;
      const passwordMatched = comparePassword(password, hashedPassword);
      if (passwordMatched) {
        return res.json({
          status: "success",
          message: "Login successful",
        });
      }
    }

    // If login failed
    return res.json({
      status: "error",
      message: "Invalid credential",
    });
  } catch (error) {
    console.log(error);

    // check if user already exist, passing different message to user
    if (error.message.includes("Violation of PRIMARY KEY")) {
      return res.json({
        status: "error",
        message: "Please try using different email",
      });
    }

    // default error message if error exist
    return res.json({
      status: "error",
      message: error.message,
    });
  }
});

export default Router;
