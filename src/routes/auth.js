const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

//signup Api
authRouter.post("/signup", async (req, res) => {
  try {
    //Validate of data...

    validateSignUpData(req.body);

    const { firstName, lastName, email, password } = req.body;

    //Encrypt the Password

    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);

    // creating a new instane of the user model
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    await user.save();
    res.send("user added sucessfully!");
  } catch (err) {
    res.status(400).send("Error Saving the user:" + err.message);
  }
});

//login Api
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Crendatials..");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send(user);
    } else {
      throw new Error("Invalid Crendatials..");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

//logout Api
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.send("Logout Successful!!!!!");
});

module.exports = authRouter;
