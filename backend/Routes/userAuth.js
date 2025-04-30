const express = require("express");
const Auth = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
// User sign up model
const User = require("../Schema/userSchema");

//User signup api
Auth.post("/signup", async (req, res) => {
  try {
    const { Name, Email, Country, Password } = await req.body;
    //password length cheking
    if (Password.length < 6) {
      return res.status(400).json({
        type: "Password Length",
        message: "password length must be between 6 and 20",
      });
    }
    const SignUp = new User({
      Name,
      Email,
      Country,
      Password,
    });
    await SignUp.save()
      .then(() => {
        return res
          .json({
            type: "Success",
            message: "Registration Completed ",
          })
          .status(200);
      })
      .catch((err) => {
        return res.json({
          type: "Fail",
          message: "Registration Failed Email already Exists",
        });
      });
  } catch (error) {
    return res
      .json({
        type: "Server Error",
        message: "Something Wrong try again ",
      })
      .status(500);
  }
});

// User Login APi
Auth.post("/login", async (req, res) => {
  try {
    // User Input Destructuring
    const { Email, Password } = await req.body;
    const exists = await User.findOne({ Email });
    if (exists) {
      const IsValidPassword = await bcrypt.compare(Password, exists.Password);
      if (!IsValidPassword) {
        return res.status(400).json({
          type: "Fail",
          message: "Invalid Credentials",
        });
      }
      const UserId = exists._id.toString();
      const Token = jwt.sign({ id: UserId }, process.env.JWTSECRETKEY, {
        expiresIn: "1D",
        allowInsecureKeySizes: false,
        noTimestamp: true,
      });
      res.cookie("Auth_Token", Token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(Date.now() + 86400000),
        path: "/",
      });
    }
    return res
      .json({
        type: "success",
        message: "login Successfull",
        go: 1,
      })
      .status(200);
  } catch (err) {
    console.log(err);
    return res
      .json({
        type: "Server Error",
        message: "Something Wrong try again later ",
      })
      .status(500);
  }
});

Auth.get("/logout", async (req, res) => {
  try {
    return res
      .status(202)
      .clearCookie("Auth_Token", {
        httpOnly: true,
        expires: new Date(Date.now()),
        sameSite: "none",
        secure: true,
      })
      .json({
        errorMsg: "log out successfully",
      });
  } catch (error) {
    console.log(error);
  }
});

module.exports = Auth;
